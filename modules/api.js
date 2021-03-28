(function () { 
	var obj =  function (env, pkg) {
        const 	me = this,
				fs = require('fs'),
				cp = new pkg.crowdProcess(),
				exec = require('child_process').exec;

		me.call = (postData, callback) => {
			switch(postData.cmd) {
				case 'removeResult' :
				case "getPenddingRequests" :
				case 'onDemandRequest' :	
				case 'getOnDemandResults' :
				case 'getResultFiles' :
				case 'getFileContent':
					me[postData.cmd](postData, (data) => {
						callback(data);
					});
					break;
				default:
					callback(postData);
			}
		};

		me.getDir = (d, cbk) => {
			fs.readdir(d, (err, dlist) => {
				const list = (!err) ? dlist : [];
				cbk(list.filter((rec) => { return (rec[0] === '.') ? false: true}));
			});
		}
		me.getPenddingRequests = (postData, callback) => {
			const _f= {};
			_f['pendding'] = (cbk) => {
				me.getDir(env.dataFolder + '/_pendding', cbk);
			}
			_f['offRoad'] = (cbk) => {
				me.getDir(env.dataFolder + '/offRoad', cbk);
			}
			_f['results'] = (cbk) => {
				me.getDir(env.sharedFolder, cbk);
			}
			cp.serial(_f, (dt) => {
				callback({status:'success', 
					requests: {
						pendding : cp.data.pendding,
						offRoad  : cp.data.offRoad,
						results  : cp.data.results
					}
				});
			}, 30000)
		}

		me.removeResult = (postData, callback) => {
			const comStr = 'rm -fr ' + env.sharedFolder + '/' + postData.data.result;

			exec(comStr,  {maxBuffer: 224 * 2048}, function(err, stdout, stderr) {
				callback((!err) ? {status:'success'} : {status:'failure', message:err.mrssage});
			});
		}
		me.onDemandRequest= (postData, callback) => {
			const requestId = new Date().getTime(); 
			const data = {
				code		:'addOndemand',
				param 		: postData.data,
				requestId	: requestId,
				uploadId	: postData.uploadId
			}
			if (postData.uploadId) {
				data.uploadId = postData.uploadId;
			}
			if (!postData.data || ['onDemand', 'offRoad'].indexOf(postData.data.serviceType) === -1) {
				callback({status:'failure', message: 'wrong service type!'});
			} else {
				let cmd = 'mkdir -p ' + env.dataFolder + '/_pendding && ';
				cmd += 'mkdir -p ' + env.dataFolder + '/' + postData.data.serviceType;
				exec(cmd,  {maxBuffer: 224 * 2048}, (err, stdout, stderr) => {
					fs.writeFile(env.dataFolder + '/_pendding/' + postData.data.serviceType + '_' + requestId + '.json', JSON.stringify(data), (err, result) => {
						fs.writeFile(env.dataFolder + '/' + postData.data.serviceType + '/request_' + requestId + '.json', 
							JSON.stringify(data), (err, result) => {
							callback({status:'success'});
						})
					});
				});
			}
		}

		me.getOnDemandResults = (postData, callback) => {
			if (!postData) {
				callback({status:'failure', message : 'Missing postData'});
			} else {
				fs.readdir(env.sharedFolder, (err, list) => {
					callback({status:'success', result: (err) ? [] : list.filter(
						(rec) => { return (rec[0] === '.') ? false: true})});
				});
			}
		}
		me.getFileContent = (postData, callback) => {
			const dt = postData.data;
			const fn = env.sharedFolder + '/' + dt.ondemand + '/' + dt.ftype + '/' + dt.file;
			fs.readFile(fn, 'utf-8', (err, content) => {
				callback({status:'success', content : content});
			});
		}

		me.getResultFiles = (postData, callback) => {
			if (!postData || !postData.data || !postData.data.result) {
				callback({status:'failure', message : 'Missing postData.data.result'});
				return true;
			}
			const _f = {};
			_f['input'] = (cbk) => {
				fs.readdir(env.sharedFolder + '/' + postData.data.result +  '/input', (err, list) => {
					cbk((err) ? [] : list.filter(
						(rec) => { return (rec[0] === '.') ? false: true}));
				});
			}
			_f['output'] = (cbk) => {
				fs.readdir(env.sharedFolder + '/' + postData.data.result + '/output', (err, list) => {
					cbk((err) ? [] : list.filter(
						(rec) => { return (rec[0] === '.') ? false: true}));
				});
			}
			cp.serial(_f, (result) => {
				callback({status:'success', files :{
					input  : cp.data.input,
					output : cp.data.output
				}});
			}, 3000)
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();
