import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../components/Tasks/TaskList.vue'
import TaskCreate from '../components/Tasks/TaskForm.vue'
import TaskView from '../components/Tasks/TaskItem.vue'
import TaskEdit from '../components/Tasks/TaskForm.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tasks',
      component: TaskList
    },
    {
      path: '/tasks/create',
      name: 'tasksCreate',
      component: TaskCreate
    },
    {
      path: '/tasks/:id/view',
      name: 'tasksView',
      component: TaskView
    },
    {
      path: '/tasks/:id/edit',
      name: 'tasksEdit',
      component: TaskEdit
    }
  ]
})

export default router
