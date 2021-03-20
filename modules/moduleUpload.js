const { cpuUsage } = require('process');

(function() {
    var obj = function(env, pkg, req, res) {
        var me = this,
            fs = require('fs'),
            exec = require('child_process').exec,
            CP = new pkg.crowdProcess();

        me.afterUpload = () => {
            const uploadID = (req.body.uploadID) ? req.body.uploadID : new Date().getTime();
            let files = (!req.files) ? [] : req.files, 
                flist = [],
                cmd = 'find /tmp/uploaded/* -mmin +3 -delete ';

            for (var i = 0; i < files.length; i++) {
                const fname = files[i].destination + '/F_' + uploadID + '_' + 
                        files[i].originalname.replae('F_' + uploadID + '_', '');
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