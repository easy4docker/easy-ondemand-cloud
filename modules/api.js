(function () { 
	var obj =  function (env, pkg) {
        const fs = require('fs'),
            me = this;

		me.call = (postData, callback) => {
			switch(postData.cmd) {
				case 'requestOnDemand' :
					callback('requestOnDemand');
					bresk;
				case 'onDemandRequests' :
					me[postData.cmd]((data) => {
						res.send(data);
					});
					bresk;
				default:
					callback(postData);
			}
		};
		me.onDemandRequests = (callback) => {
			callback('onDemandRequests1');
		}
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();
