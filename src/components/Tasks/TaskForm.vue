<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4 v-if="this.$route.name == 'tasksCreate'"> ADD TASK </h4>
                <h4 v-else>EDIT TASK</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
                        {{ error }}
                    </li>
                </ul>
                <form id="add-edit-form">
                    <div class="mb-3">
                        <label for="" class="required">Title</label>
                        <input type="text" v-model="task.title" class="form-control" maxlength="255" minlength="3" required/>
                        
                    </div>
                    <div class="mb-3">
                        <label for="">Description</label>
                        <textarea class="form-control" v-model="task.description"></textarea>
                    </div>
                    <div class="mb-3">
                        <button v-if="this.$route.name == 'tasksCreate'" type="button" @click="saveTask" class="btn btn-sm btn-success">Save</button>
                        <button v-else type="button" @click="updateTask" class="btn btn-sm btn-success">Update</button>
                        
                        <RouterLink to="/" class="btn btn-sm btn-secondary ms-1">
                            Back
                        </RouterLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import validate from 'jquery-validation';

export default {
    data() {
        if(this.$route.name == 'tasksCreate') {
            return {
                errorList: [],
                task: {
                    title: '',
                    description: '',
                }
            }
        }
        else{
            return {
                errorList: [],
            }
        }
    },
    computed: {
        task() {
            if(this.$route.name != 'tasksCreate') {
                return this.$store.state.task;
            }else {
                return this.task;
            }
        },
        errorList() {
            return this.$store.state.errorList;
        }
    },
    mounted() {
        if(this.$route.name != 'tasksCreate') {
            this.$store.dispatch('getTask', this.$route.params.id);
        }
    },
    methods: {
        saveTask() {
            if($('#add-edit-form').valid()) {
                this.$store.dispatch('createTaskDetails', this.task);
            }
        },
        updateTask() {
            this.$store.dispatch('updateTaskDetails', this.task);
        }
    }
}
</script>