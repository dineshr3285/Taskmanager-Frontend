<template>
  <div class="container mt-5">
    <div class="card">
        <div class="card-header">
            <h4>
                Tasks
                <RouterLink to="/tasks/create" class="btn btn-primary float-end">
                    Add New Task
                </RouterLink>
            </h4>
        </div>
        <div class="card-body">
                <label for="" class="font-weight-bold float-left mt-1">Filter by Status:</label>
                <select @change="onChange($event)" class="form-control select-sm float-left width-custom-25  ms-2">
                    <option value="">Select Filter</option>
                    <option value="0">Active</option>
                    <option value="1">Completed</option>
                </select>
                <button type="button" @click="filterTasks" class="btn btn-sm btn-danger mt-1 ms-1">Filter</button>
            <table class="table table-bordered tabletasks mt-3">
                 <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created AT</th>
                        <th>Action</th>
                    </tr>
                 </thead>
                 <tbody v-if="tasks.length > 0">
                    <tr v-for="(task, index) in tasks" :key="task.id" :task="task">
                        <td>{{ task.title }}</td>
                        <td>{{ task.description }}</td>
                        <td v-if="task.is_completed == 0">Active</td>
                        <td v-else>Completed</td>
                        <td>{{ task.created_at_time }}</td>
                        <td class="btn-td">
                            <RouterLink :to="{ path: '/tasks/'+task.id+'/view' }" class="btn btn-sm btn-info">
                                View
                            </RouterLink>
                            <RouterLink :to="{ path: '/tasks/'+task.id+'/edit' }" class="btn btn-sm btn-success ms-1">
                                Edit
                            </RouterLink>
                            <button type="button" @click="deleteTask(task.id)" class="btn btn-sm btn-danger ms-1">Delete</button>
                        </td>
                    </tr>
                 </tbody>
                 <tbody v-else>
                    <tr>
                        <td colspan="5"> {{ tasksLoadingText }} </td>
                    </tr>
                 </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            task: {
                is_completed: '',
            } 
        }
    },
    computed: {
        tasks() {
            return this.$store.state.tasks;
        },
        errorList() {
            return this.$store.state.errorList;
        },
        tasksLoadingText() {
            return this.$store.state.tasksLoadingText;
        }
    },
    mounted() {
        this.$store.dispatch('getTasks')
    },
    methods: {
        onChange(event) {
            this.task.is_completed = event.target.value;
        },
        filterTasks() {
            this.$store.dispatch('getFilteredTasks', this.task.is_completed)
        },
        deleteTask(taskId) {
            Swal.fire({
                title: 'Delete Task',
                text: 'Are you sure you want to Delete this Task?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                if(result.isConfirmed) {
                    this.$store.dispatch('deleteTask', taskId);
                }
                else if(result.dismiss === Swal.DismissReason.cancel) {
                    //Swal.fire('Cancelled', 'Cancelled.', 'error');
                }
            });
        }
    }
}
</script>