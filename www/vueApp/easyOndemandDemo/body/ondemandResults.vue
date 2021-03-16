<template>
    <div class="body-card m-1">
        <div class="card-body m-0 p-1">
            <div class="container-fluid m-0 head-menu-1">
                <div class="row">
                    <div class="col-3 p-1 m-0 ">
                        <div class="card ondemand-requestions-section mt-0 mr-1 p-2">
                            <div class="pl-2 m-0 text-left"><h5>OnDemand Results:</h5></div>

                            <div v-if="currentResult" class="border border-secondary rounded m-1 p-1 text-left">
                                {{currentResult}}
                                ({{resultFiles.length}})
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
                        test
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
</style>
