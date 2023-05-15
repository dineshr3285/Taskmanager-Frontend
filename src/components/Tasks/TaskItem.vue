<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>
                    View Task
                </h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <h5 for="">Title: </h5>
                    <p>{{ this.task.title }}</p>
                </div>
                <div class="mb-3">
                    <h5 for="">Description:</h5>
                    <p>{{ this.task.description }}</p>
                </div>
                <div class="mb-3">
                    <RouterLink :to="{ path: '/tasks/'+this.task.id+'/edit' }" class="btn btn-sm btn-success">
                        Edit
                    </RouterLink>
                    <button type="button" @click="deleteTask" class="btn btn-sm btn-danger ms-1">Delete</button>

                    <button v-if="this.task.is_completed == 0" type="button" @click="updateStatus(1)" class="btn btn-sm btn-primary ms-1">Mark as Complete</button>
                    <button v-else type="button" @click="updateStatus(0)" class="btn btn-sm btn-primary ms-1">Mark as InComplete</button>

                    <RouterLink to="/" class="btn btn-sm btn-secondary ms-1">
                        Back
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

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
        updateStatus(status) {
            Swal.fire({
                title: 'Change Task Status',
                text: 'Are you sure you want to change the Completion Status of this Task?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                if(result.isConfirmed) {
                    var payload = {'taskId': this.$route.params.id, 'status': status}
                    this.$store.dispatch('updateCompletionStatus', payload);
                }
            });
        },
        deleteTask() {
            Swal.fire({
                title: 'Delete Task',
                text: 'Do you sure you want to Delete this Task?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                if(result.isConfirmed) {
                    var taskId = this.$route.params.id;
                    this.$store.dispatch('deleteTask', taskId);
                }
            });
        }
    }
}
</script>