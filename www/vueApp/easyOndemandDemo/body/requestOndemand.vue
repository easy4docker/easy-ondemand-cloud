<template>
    <div class="body-card m-1">
        <div class="card-body m-0 p-1">
            <div class="container-fluid m-0">
                <div class="row">
                    <div class="col-3 p-1 m-0 ">
                        <div class="card ondemand-requestions-section mt-0 mr-1 p-2">
                            <div class="pl-2 m-0 text-left"><h5>Pendding requests:</h5></div>
                            <div v-if="requests.length" v-for="o in requests"
                                class="border border-secondary rounded m-1 p-1 text-left">
                                {{o}}
                            </div>
                            <div v-if="!requests.length"
                                class="m-1 p-1 text-left text-secondary">
                                No pendding request.
                            </div> 
                        </div>
                    
                    </div>
                    <div class="card alert-light col-9 p-2 m-0 text-left" v-if="module === 'success'">
                        Your request has been sent successfully!
                    </div>
                    <div class="card alert-light col-9 p-2 m-0 text-left" v-if="!module !== 'success'">
                        <h3>Request OnDemand Form</h3>
                        <div class="form-group">
                            <label>Repository git URI</label>
                            <input type="text" class="form-control" v-model="form.gitHub" @input="changedGit" placeholder="A Git URI">
                        </div>
                        <div class="form-group">
                            <div class="container-fluid border border-2 p-2 alert-secondary rounded">
                                <div class="row">
                                    <div class="col-12 text-info">
                                        * Only if private git repository need provide username and password                      
                                    </div>
                                </div>    
                                <div class="row">
                                    <div class="col-6">
                                        <label>Repository username</label>
                                        <input type="text" class="form-control" v-model="form.userName"  placeholder="Rep. username">                        
                                    </div>
                                    <div class="col-6">
                                        <label>Repository password</label>
                                        <input type="password" class="form-control" v-model="form.password" placeholder="Rep. password">
                                    </div>
                                </div>    
                            </div>
                        </div>
                       <div class="form-group">
                            <label>Input Data (* option)</label>
                            <textarea class="form-control" v-model="form.inputData" rows="6" placeholder="input data"></textarea>
                        </di>            
                        <!--div class="form-group">
                            <label>Upload Inuut Data Files</label>
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="customFile">
                                <label class="custom-file-label" for="customFile">Choose file</label>
                            </div>
                        </div-->
                        <div class="form-group">
                            <button class="btn btn-sm btn-success border border-secondary m-1 mt-2" 
                                :disabled="!isSubmit()"
                                v-on:click="submit()">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            </div>
            <div class="container-fluid mt-1 head-menu-2">
            </div>
        </div>
    </div> 
</template>
 
<script>
module.exports = {
    data: function() {
        return {
            root :  this.$parent.root,
            module : '',
            form : {
                gitHub      : '',
                userName    : '',
                password    : '',
                inputData   : ''
            },
            requests : [],
            errors: {}
        }
    },
    mounted() {
        // Add the following code if you want the name of the file appear on select
        $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
    },
    watch : {

    },
    methods :{
        cleanForm() {
            var me = this;
            me.form.userName = '';
            me.form.password = '';
        },
        changedGit(e) {
            var me = this;
            me.form.gitHub = e.target.value.replace(/^\s+|\s+$/g, '');
            me.cleanForm();
        },
        gitUrlValidation() {
            var me = this;
            me.errors.gitHub = null;
            var regex = /^(git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
            
            if (!me.form.gitHub) {
                me.errors.gitHub = 'Github URI required.';
            } else if (!regex.test(me.form.gitHub)) {
                me.errors.gitHub = 'Incorrect github URI.';
            } else {
                delete me.errors.gitHub;
            }
            return (!me.errors.gitHub) ? true : false;
        },
        isSubmit() {
            var me = this;
            return (me.gitUrlValidation()) ? true : false;
        },
        showError() {
            const me = this;
            JSON.stringify(me.error)
        },
        submit() {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'onDemandRequest',
                data : me.form
            }, (result)=> {
                console.log(result);
                me.module = 'success';
                me.getPenddingRequests();
            }, true);
        },
        getPenddingRequests() {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'getPenddingRequests',
                data : {}
            }, (result)=> {
                me.requests = (!result.list) ? [] : result.list;
                console.log(result);
            }, true);
        }
    }
}
</script>
 
<style>
.ondemand-requestions-section {
    min-height : 40rem;
}
</style>
