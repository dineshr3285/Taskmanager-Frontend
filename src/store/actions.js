import axios from "axios";
import Swal from 'sweetalert2';

const BASE_API_URL = 'http://127.0.0.1:8000/api/';
const UNPROCESSED_HTTP_STATUS = 422;

export const getTasks = ({ commit }) => {
    axios.get(BASE_API_URL+'tasks/all').then(res => {
        commit('SET_TASKS', res.data.data.tasks)
    });
}

export const getFilteredTasks = ({ commit }, status = '') => {
    axios.get(BASE_API_URL+`tasks/all?status=${status}`).then(res => {
        commit('SET_TASKS', res.data.data.tasks)
    });
}

export const getTask = ({ commit }, taskID) =>  {
    axios.get(BASE_API_URL+`tasks/${taskID}/edit`).then(res => {
        commit('SET_TASK', res.data.data.task)
    }).catch(function (error) {
        if(error.response) {
            if(error.response.status == UNPROCESSED_HTTP_STATUS) {
                Swal.fire({
                    title: 'Task Error',
                    text: error.response.data.message,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Ok'
                });
            }
        }
    });
}

export const createTaskDetails = ({ commit }, taskDetails) => {
    axios.post(BASE_API_URL+`tasks/store`, taskDetails)
        .then(res => {
            Swal.fire({
                title: 'Task Creation',
                text: res.data.message,
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok'
            }).then((result) => {
                if(result.isConfirmed) {
                    window.location.replace('/');
                }
            });
        })
        .catch(function (error) {
            if(error.response) {
                if(error.response.status == UNPROCESSED_HTTP_STATUS) {
                    commit('UPDATE_TASK_ERROR', error.response.data.errors);
                }
            }
        })
}
export const updateTaskDetails = ({ commit }, taskDetails) => {
    axios.post(BASE_API_URL+`tasks/update`, taskDetails)
    .then(res => {
        Swal.fire({
            title: 'Update Task',
            text: res.data.message,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Ok'
        }).then((result) => {
            if(result.isConfirmed) {
                window.location.replace('/');
            }
        });
    })
    .catch(function (error) {
        if(error.response) {
            if(error.response.status == UNPROCESSED_HTTP_STATUS) {
                commit('UPDATE_TASK_ERROR', error.response.data.errors);
            }
        }
    })
}
export const updateCompletionStatus = ({ commit }, payload) => {
    axios.post(BASE_API_URL+`tasks/change-status`, {'id' : payload.taskId, 'status': payload.status})
        .then(res => {
            Swal.fire({
                title: 'Status Changes',
                text: res.data.message,
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok'
            }).then((result) => {
                if(result.isConfirmed) {
                    window.location.replace('/');
                }
            });
        })
        .catch(function (error) {
            if(error.response) {
                if(error.response.status == UNPROCESSED_HTTP_STATUS) {
                    commit('UPDATE_TASK_ERROR', error.response.data.errors);
                }
            }
        })
}

export const deleteTask = ({ commit }, taskId, status) => {
    axios.delete(BASE_API_URL+`tasks/${taskId}/delete`).then(res => {
        Swal.fire({
            title: 'Deleted',
            text: 'Task has been Deleted Successfully.',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Ok'
        }).then((result) => {
            if(result.isConfirmed) {
                window.location.replace('/');
            }
        });
    })
    .catch(function (error) {
        if(error.response) {
            if(error.response.status == UNPROCESSED_HTTP_STATUS) {
                commit('UPDATE_TASK_ERROR', error.response.data.errors);
            }
        }
    });
}

