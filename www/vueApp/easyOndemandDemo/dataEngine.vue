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
            if (isSpinner) me.$parent.triggerSpinner = true;
            $.ajax({
                type: 'POST',
                url: '/api/',
                data: {},
                success: function(result) {
                    console.log('--A--');
                    if (isSpinner) me.$parent.triggerSpinner = false;
                    callback(result);
                },
                error: function (jqXHR, textStatus, errorThrown) { 
                    console.log('--B--');
                    if (isSpinner) me.$parent.triggerSpinner = false;
                    callback({statu : 'failure', message : 'failure request.', result : jqXHR.responseText});
                },
                dataType: 'JSON'
            });
        }
    }
}
</script>
 
<style>
</style>
