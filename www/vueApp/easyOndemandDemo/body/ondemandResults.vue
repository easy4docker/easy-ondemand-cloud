<template>
    <div class="body-card overflow-auto  m-1">
        <div class="card-body m-0 p-1">
            <div class="container-fluid m-0 head-menu-1">
                <div class="row">
                    <div class="col-2 p-1 m-0 ">
                        <div class="card ondemand-requestions-section mt-0 mr-1 p-2">
                            <div class="pl-2 m-0 text-left"><h5>OnDemand Results:</h5></div>


                            <span v-if="results.length" v-for="o in results">
                                <div v-on:click="selectResult(o)" v-if="o !== currentResult"
                                    class="border border-secondary rounded m-1 p-1 text-left">
                                    {{o}}
                                    <a href="JavaScript:void(0)" v-on:Click="selectResult(o)"  >
                                        <i class="fa fa-angle-double-right pull-right"></i>
                                    </a>
                                </div>
                                <div v-if="currentResult === o " class="border border-secondary alert-secondary rounded m-1 p-1 text-left">
                                    <div class="p-1">
                                        {{currentResult}}
                                        <a href="JavaScript:void(0)" v-on:Click="selectResult('')"  >
                                            <i class="fa fa-angle-double-left pull-right"></i>
                                        </a>
                                    </div>
                                    <div class="current-ondemand-section overflow-auto bg-light p-2" v-if="!!togglesRresult">
                                        Input :  {{(!resultFiles.input) ? '' : resultFiles.input.length}}<br/>
                                        Output : {{(!resultFiles.input) ? '' : resultFiles.output.length}}<br/>
                                    </div>  
                                </div>
                            <span>
                            <div v-if="!results.length"
                                class="m-1 p-1 text-left text-secondary">
                                No results.
                            </div> 
                        </div>
                    
                    </div>
                    <div class="card alert-light col-10 p-2 m-0 text-left">
                        <div v-if="!results.length"
                            class="m-1 p-1 text-left text-secondary">
                            No results.
                        </div>
                        Input Data: 
                        <div class="input-data-section alert-warning rounded border border-warning p-1 overflow-auto">
                            input contents
                            <div v-for="o in resultFiles" class="ml-2 mt-1">
                                <a href="JavaScript:void(0)"
                                    class="text-left text-secondary" >
                                    {{o}}
                                </a>
                            </div>
                        </div>
                        Output Data:
                        <div class="output-data-section alert-success rounded border border-success p-1 overflow-auto">
                            output contents
                            <div v-for="o in resultFiles" class="ml-2 mt-1">
                                <a href="JavaScript:void(0)"
                                    class="text-left text-secondary" >
                                    {{o}}
                                </a>
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
                me.resultFiles = result.files;
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
.input-data-section {
    height: 12rem;
}
.output-data-section {
    min-height: 18rem;
    max-height: 36rem;
}
</style>
