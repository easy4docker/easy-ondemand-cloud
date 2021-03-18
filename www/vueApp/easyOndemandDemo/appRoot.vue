<template>
    <div class="container-fluid m-0 mt-2 mb-3" >
        <div class="row">
            <div class="col-1 p-0"></div>
            <div class="col-10 p-0 card text-center shadow border rounded">
                <app-header></app-header>
            </div>
            <div class="col-1 p-0"></div>
        </div>
        <div class="row">
            <div class="col-1 p-0"></div>
            <div class="col-10 p-0 card text-center shadow border rounded">
                <ondemand-results ref="ondemandResults" v-if="module === 'ondemandResults'"></ondemand-results>
                <request-ondemand ref="requestOndemand" v-if="module === 'requestOndemand'"></request-ondemand>
                <body-documents ref="bodyDocuments" v-if="module === 'documents'"></body-documents>
            </div>
            <div class="col-1 p-0"></div>
        </div>
        <data-engine ref="dataEngine"></data-engine>
        <pop-up-modal ref="popUpModal"></pop-up-modal>
        <alert-comp ref="alertComp"></alert-comp>
        <spinner></spinner>     
    </div>
</template>
 
<script>
module.exports = {
    data: function() {
        return {
            root : this,
            triggerSpinner : false,
            module : 'ondemandResults'
        }
    },    
    watch : {
        // -- Router related code
        module :  function (newValue, oldValue) {
            history.pushState('', '', '/app/' + newValue);
        } 
    },
    mounted () {
        var me = this;
        me.module = (!/^\/app\//.test(location.pathname)) ? 'list' : (location.pathname.replace(/\/app\//, ''));
        setTimeout(function() {
        },200);
    },
    methods :{
        dataEngine(caller) {
            if (caller) this.$refs.dataEngine.caller = caller;
            return this.$refs.dataEngine
        }
    },
    components: VUEApp.loadComponents({
        LOAD    : {
            'ondemandResults'   : '/vueApp/easyOndemandDemo/body/ondemandResults.vue',
            'requestOndemand'   : '/vueApp/easyOndemandDemo/body/requestOndemand.vue',
            'bodyDocuments'   : '/vueApp/easyOndemandDemo/body/documents.vue'   
        }, 
        TPL :{
            'appHeader' : '/vueApp/easyOndemandDemo/appHeader.vue',
            'dataEngine' : '/vueApp/easyOndemandDemo/dataEngine.vue',
            'spinner'   : '/vueApp/easyOndemandDemo/spinner.vue',
            'popUpModal': '/vueApp/easyOndemandDemo/popUpModals/_frame.vue',
            'appBody'   : '/vueApp/easyOndemandDemo/appBody.vue'
        }
    })
}
</script>
 
<style>
.body-card { min-height : 42em }
</style>
