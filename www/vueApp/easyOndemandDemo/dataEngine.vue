<template>
</template>

<script>
module.exports = {
    props: [],
    data: function() {
        return {
            root :  this.$parent.root,
            caller : null
        }
    },
    created() {
        var me = this;
    },
    methods :{
        appPost(data, callback, isSpinner) {
            const me = this;
            let postData = {}, postFormData = {};
            
            for(let key in data) {
                if(typeof(data[key]) === 'object') {
                    if (data[key] && (data[key].constructor === File || data[key].constructor === Blob)) {
                        postFormData[key] = data[key];
                    } else {
                        for (let subKey in data[key]) {
                            if (data[key][subKey] && (data[key][subKey].constructor === File || data[key][subKey].constructor === Blob)) {
                                postFormData[key + '['+ subKey + ']'] = data[key][subKey];;
                            } else {
                                postData[key + '['+ subKey + ']'] = data[key][subKey];
                            }
                        }
                    }
                }
                else {
                    postData[key] = data[key];
                }
            }
            if (isSpinner) me.$parent.triggerSpinner = true;
            if (Object.keys(postFormData).length) {
                me.ajaxPostForm(postFormData, function(resultPostForm) {
                    postData.uploadID = resultPostForm.uploadID;
                    me.ajaxPostData(postData, callback, isSpinner)
                }, false);
            } else {
                me.ajaxPostData(postData, callback, isSpinner);
            }
            return true;
        },
        ajaxPostData(postData, callback, isSpinner) {
            const me = this;
            $.ajax({
                type: 'POST',
                url: '/api/',
                data: postData,
                success: function(result) {
                    if (isSpinner) me.$parent.triggerSpinner = false;   
                    callback(result);
                    console.log('--A1-->');
                    console.log(postData);
                },
                error: function (jqXHR, textStatus, errorThrown) { 
                    console.log('--B--');
                    if (isSpinner) me.$parent.triggerSpinner = false;
                    callback({statu : 'failure', message : 'failure request.', result : jqXHR.responseText});
                },
                dataType: 'JSON'
            });
        },
        ajaxPostForm(postFormData, callback, isSpinner) {
            const me = this;
            var formData = new FormData();
            for(let key in postFormData) {
                formData.append(key, postFormData[key]);
            }
           
            var blob = new Blob(['Lorem ipsum'], { type: 'plain/text' });
            formData.append('fileBB', blob,'readme.txt');

            postFormData = {};

            $.ajax({
                type: 'POST',
                url: '/upload/',
                cache: false,
                processData: false,
                method: 'POST',
                data: formData,
                contentType: false,
                success: function(result) {
                    if (isSpinner) me.$parent.triggerSpinner = false;
                    callback(result);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (isSpinner) me.$parent.triggerSpinner = false;
                    callback({statu : 'failure', message : 'failure request.', result : jqXHR.responseText});
                }
            });
        }
    }
}
</script>
 
<style>
</style>
