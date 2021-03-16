(function () { 
	var obj =  function (env, pkg) {
        const fs = require('fs'),
            me = this,
			MYSQL = require(env.root + '/vendor/mysql/node_modules/mysql');

		me.call = (postData, callback) => {
			callback(postData);
		};
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();
