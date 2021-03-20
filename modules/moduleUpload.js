const { cpuUsage } = require('process');

(function() {
    var obj = function(env, pkg, req, res) {
        var me = this,
            fs = require('fs'),
            exec = require('child_process').exec,
            CP = new pkg.crowdProcess();

        me.afterUpload = () => {
            const uploadID = (req.body.uploadID) ? req.body.uploadID : new Date().getTime();
            /*
            {"status":"success","uploadID":1616253409355,"files":[{"fieldname":"data[selectedFile]","originalname":"DocQaletDocker2","encoding":"7bit","mimetype":"application/octet-stream","destination":"/tmp/uploaded","filename":"7129b97fd5d5a62b00128c62174a91f8","path":"/tmp/uploaded/7129b97fd5d5a62b00128c62174a91f8","size":7578},{"fieldname":"fileBB","originalname":"readme.txt","encoding":"7bit","mimetype":"plain/text","destination":"/tmp/uploaded","filename":"d93243ee1371bcf319fe3fe9af05c04d","path":"/tmp/uploaded/d93243ee1371bcf319fe3fe9af05c04d","size":11}]}
            */
            res.send({status: 'success1', uploadID: uploadID, files : (!req.files) ? [] : req.files});
        }
    }
    module.exports = obj;
})()
