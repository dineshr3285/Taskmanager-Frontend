<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>
                    Edit Task
                </h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
                        {{ error }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="">Title</label>
                    <input type="text" v-model="task.title" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Description</label>
                    <textarea class="form-control" v-model="task.description"></textarea>
                </div>
                <div class="mb-3">
                    <button type="button" @click="updateTask" class="btn btn-sm btn-success">Update</button>
                    <RouterLink to="/" class="btn btn-sm btn-secondary ms-1">
                        Back
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            errorList: '',
        }
    },
    computed: {
       task() {
            return this.$store.state.task;
       },
       errorList() {
            return this.$store.state.errorList;
       }
    },
    mounted() {
        this.$store.dispatch('getTask', this.$route.params.id);
    },
    methods: {
        updateTask() {
            this.$store.dispatch('updateTaskDetails', this.task);
        }
    }
}
</script>