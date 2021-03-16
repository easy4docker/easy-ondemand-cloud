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
					bresk;
				default:
					callback(postData);
			}
		};
		me.getOnDemandResults = (callback) => {
			callback({status:'success', result:['onDemandRequests1', 'onDemandRequests2']});
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();
