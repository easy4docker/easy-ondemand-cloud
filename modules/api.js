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
					callback('onDemandRequests');
					bresk;
				default:
					callback(postData);
			}
			
		};
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();
