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
					me[postData.cmd]((data) => {
						callback(data);
					});
					break;
				default:
					callback(postData);
			}
		};
		me.getOnDemandResults = (callback) => {
			fs.readdir(env.sharedFolder, (err, list) => {
				callback({status:'success', result: (err) ? [] : list});
			});
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();
