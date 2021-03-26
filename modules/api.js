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
		me.getPenddingRequests = (postData, callback) => {
			fs.readdir(env.dataFolder + '/_pendding', (err, list) => {
				callback({status:'success', list:(!err) ? list : []});
			});
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
			if (!postData.data || !postData.data.serviceType) {
				callback({status:'failure', message: 'wrong service type!'});
			} else {
				let cmd = 'mkdir -p ' + env.dataFolder + '/_pendding && echo "' + new Date().getTime() + '" > ' + env.dataFolder + '/_pendding/_' + postData.data.serviceType + requestId + ' && ';
				cmd += 'mkdir -p ' + env.dataFolder + '/' + postData.data.serviceType;
				exec(cmd,  {maxBuffer: 224 * 2048}, (err, stdout, stderr) => {
					fs.writeFile(env.dataFolder + '/' + postData.data.serviceType + '/request_' + requestId + '.json', 
						JSON.stringify(data), (err, result) => {
						callback({status:'success'});
					})
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
