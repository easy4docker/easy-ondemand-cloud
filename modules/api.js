(function () { 
	var obj =  function (env, pkg) {
        const 	me = this,
				fs = require('fs'),
				cp = new pkg.crowdProcess()

		me.call = (postData, callback) => {
			switch(postData.cmd) {
				case 'requestOnDemand' :
					callback('requestOnDemand');
					bresk;
				case 'getOnDemandResults' :
				case 'getResultFiles' :
					me[postData.cmd](postData, (data) => {
						callback(data);
					});
					break;
				default:
					callback(postData);
			}
		};
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
