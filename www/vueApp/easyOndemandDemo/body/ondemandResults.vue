<template>
    <div class="body-card m-1">
        <div class="card-body m-0 p-1">
            <div class="container-fluid m-0 head-menu-1">
                <div class="row">
                    <div class="col-3 p-1 m-0 ">
                        <div class="card ondemand-requestions-section mt-0 mr-1 p-2">
                            <div class="pl-2 m-0 text-left"><h5>OnDemand Results:</h5></div>

                            <div v-if="currentResult" class="border border-secondary alert-secondary rounded m-1 p-1 text-left">
                                <div class="p-1">
                                    {{currentResult}}
                                    ({{resultFiles.length}})
                                    <a href="JavaScript:void(o)" v-on:Click="togglesRresultFiles()"  >
                                        <i class="fa fa-angle-double-up pull-right" v-if="!togglesRresult"></i>
                                        <i class="fa fa-angle-double-right pull-right" v-if="!!togglesRresult"></i>
                                    </a>
                                </div>
                                <div class="current-ondemand-section overflow-auto bg-secondary" v-if="!!togglesRresult">
                                    <div v-for="o in resultFiles" class="ml-2 mt-1">
                                        <a href="JavaScript:void(0)"
                                            class="text-left text-light" >
                                            {{o}}
                                        </a>
                                    </div>
                                </div>  
                            </div>
                            <span v-if="results.length" v-for="o in results">
                                <div v-on:click="selectResult(o)" v-if="o !== currentResult"
                                    class="border border-secondary rounded m-1 p-1 text-left">
                                    {{o}}
                                </div>
                            <span>
                            <div v-if="!results.length"
                                class="m-1 p-1 text-left text-secondary">
                                No results.
                            </div> 
                        </div>
                    
                    </div>
                    <div class="card alert-light col-9 p-2 m-0 text-left">
                        <div v-if="!results.length"
                            class="m-1 p-1 text-left text-secondary">
                            No results.
                        </div> 
                        <div class="" v-if="!!togglesRresult">
                            Input Data:
                        </div>  
                        <div class="" v-if="!!togglesRresult">
                            Output Data:
                            <div class="alert-secondary">
                                <div v-for="o in resultFiles" class="ml-2 mt-1">
                                    <a href="JavaScript:void(0)"
                                        class="text-left text-light" >
                                        {{o}}
                                    </a>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>
 
<script>
module.exports = {
    data: function() {
        return {
            root            : this.$parent.root,
            module          : '',
            results         : [],
            resultFiles     : [],
            togglesRresult  : true,
            currentResult   : ''
        }
    },
    mounted() {
        const me = this;
        me.getOndemandResults();
    },
    watch : {

    },
    methods :{
        togglesRresultFiles() {
            const me = this;
            me.togglesRresult = (me.togglesRresult) ? false : true;
        },
        getOndemandResults() {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'getOnDemandResults',
                data : {}
            }, (result)=> {
                me.results = result.result;
                console.log(result);
            }, true);
        },
        getResultFiles (o) {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'getResultFiles',
                data : { result : o }
            }, (result)=> {
                me.togglesRresult = true;
                me.resultFiles = result.result;
                console.log(result);
            }, true);
        },
        selectResult(o) {
            const me = this;
            me.currentResult = o;
            me.getResultFiles(o);
        }
    }
}
</script>
 
<style>
.ondemand-requestions-section {
    min-height : 40rem;
}
.current-ondemand-section {
    max-height: 26rem;
}
</style>
