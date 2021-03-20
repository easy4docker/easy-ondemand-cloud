const { cpuUsage } = require('process');

(function() {
    var obj = function(env, pkg, req, res) {
        var me = this,
            fs = require('fs'),
            exec = require('child_process').exec,
            CP = new pkg.crowdProcess();
        /*
        me.afterUpload = () => {
            const uploadID = (req.body.uploadID) ? req.body.uploadID : new Date().getTime();
            {"status":"success1","uploadID":1616258000940,"files":[{"fieldname":"data[selectedFile]","originalname":"DocQaletDocker2","encoding":"7bit","mimetype":"application/octet-stream","destination":"/tmp/uploaded","filename":"e4211d57ad6baaad5455ec510e688a02","path":"/tmp/uploaded/e4211d57ad6baaad5455ec510e688a02","size":7578},{"fieldname":"fileBB","originalname":"readme.txt","encoding":"7bit","mimetype":"plain/text","destination":"/tmp/uploaded","filename":"9016c36d9b0b268e6b49ad161d6cd079","path":"/tmp/uploaded/9016c36d9b0b268e6b49ad161d6cd079","size":11}]}
            let files = (!req.files) ? [] : req.files, 
                cmd = '';
            for (var i = 0; i < files; i++) {
                cmd += ((cmd) ? ' && ' : '') + ' mv ' + files[i].path + ' ' + files[i].destination + '/F_' + uploadID + '_' + files[i].originalname
            }
            exec(cmd, {maxBuffer: 224 * 2048}, (err, stdout, stderr) => {
                res.send({status: 'success1', uploadID: uploadID, files : (!req.files) ? [] : req.files});
            })
        }
*/
        me.afterUpload = () => {
            const uploadID = (req.body.uploadID) ? req.body.uploadID : new Date().getTime();
            let files = (!req.files) ? [] : req.files, 
                flist = [],
                cmd = '';
            for (var i = 0; i < files.length; i++) {
                const fname = files[i].destination + '/F_' + uploadID + '_' + files[i].originalname;
                flist.push(fname);
                cmd += ((cmd) ? ' && ' : '') + 'mv ' + files[i].path + ' ' + fname;
            }
            if (cmd) {
                exec(cmd, {maxBuffer: 224 * 2048}, (err, stdout, stderr) => {
                    res.send({status: 'success', uploadID: uploadID, files : flist});
                })
            } else {
                res.send({status: 'failure', message : 'nothing uploaded!'});
            }

        }
    }
    module.exports = obj;
})()
