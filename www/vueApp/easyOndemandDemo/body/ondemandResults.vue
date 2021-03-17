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
                                        <i class="fa fa-angle-double-down pull-right"></i>
                                    </a>
                                </div>
                                <div v-if="currentResult === o " class="border border-secondary alert-secondary rounded m-1 p-1 text-left">
                                    <div class="p-1">
                                        {{currentResult}}
                                        <a href="JavaScript:void(0)" v-on:Click="selectResult('')"  >
                                            <i class="fa fa-angle-double-right pull-right"></i>
                                        </a>
                                    </div>
                                    <div class="current-ondemand-section overflow-auto bg-light p-2">
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

                        <div class="input-data-section alert-warning rounded border border-warning p-1 overflow-auto">
                            <div class="float-tag pull-right">Input contents</div>
                            <div v-for="o in resultFiles.input" class="ml-2 mt-1">
                                <a href="JavaScript:void(0)" v-on:click="getFileContent(currentResult, 'input', o)"
                                    class="text-left text-secondary" >
                                    {{o}}
                                    <div>-{{contents[currentResult + '-input-' + o]}}</div>
                                </a>
                            </div>
                        </div>
                        <div class="output-data-section alert-success rounded border border-success p-1 mt-1 overflow-auto">
                            <div class="float-tag pull-right">Output contents</div>
                            <div v-for="o in resultFiles.output" class="ml-2 mt-1">
                                <a href="JavaScript:void(0)" v-on:click="getFileContent(currentResult, 'output', o)"
                                    class="text-left text-secondary" >
                                    {{o}}
                                    <div>-{{contents[currentResult + '-output-' + o]}}</div>
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
            currentResult   : '',
            contents : {}
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
                me.resultFiles = result.files;
                console.log(result);
            }, true);
        },
        selectResult(o) {
            const me = this;
            me.currentResult = o;
            me.getResultFiles(o);
        },
        getFileContent(ondemand, ftype, file) {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'getFileContent',
                data : { ondemand : ondemand ,ftype: ftype, file:file}
            }, (result)=> {
                me.contents[ondemand + '-' + ftype + '-' + file] = 'result.content';
                me.$forceUpdate();
                console.log(result);
                console.log(me.contents);
            }, true);
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
    height: 10rem;
}
.output-data-section {
    height: 26rem;
}
.float-tag {
    z-index :8000;
}
</style>
