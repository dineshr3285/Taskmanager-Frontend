export const SET_TASKS = (state, tasks) => {
    state.tasks = tasks;
    state.tasksLoadingText = 'No Tasks Found';
}
export const SET_TASK = (state, task) => {
    state.task = task;
}
export const UPDATE_TASK_ERROR = (state, error) => {
    state.errorList = error;
}