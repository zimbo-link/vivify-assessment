import { createRouter, createWebHistory } from "vue-router";


import ToDosIndex from '@/components/todos/ToDosIndex.vue'
import ToDosCreate from '@/components/todos/ToDosCreate.vue'
import ToDosEdit from '@/components/todos/ToDosEdit.vue'

const routes = [
    {
        path: '/dashboard',
        name: 'todos.index',
        component: ToDosIndex
    },
    {
        path: '/todos/create',
        name: 'todos.create',
        component: ToDosCreate
    },
    {
        path: '/todos/:id/edit',
        name: 'todos.edit',
        component: ToDosEdit,
        props: true
    }
    
]

export default createRouter({
    history: createWebHistory(),
    routes
})
