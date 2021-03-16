(function () { 
	var obj =  function (env, pkg) {
        const fs = require('fs'),
            me = this;

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
			} else {
				fs.readdir(env.sharedFolder + '/' + postData.data.result, (err, list) => {
					callback({status:'success', result: (err) ? [] : list.filter(
						(rec) => { return (rec[0] === '.') ? false: true})});
				});
			}
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();
