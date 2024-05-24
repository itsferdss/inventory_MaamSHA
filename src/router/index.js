import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter ({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: 'login'

        },
        {
            path: '/login',
            component: () => import('../views/AdminLogin.vue')

        },

        {
            path: '/employee',
            component: () => import('../views/Employee.vue')
        },

        {
            path: '/dashboard',
            component: () => import('../views/Dashboard.vue')
        },

        {
            path: '/expenses',
            component: () => import('../views/Expenses.vue')
        },
    
        
    ]
})

export default router