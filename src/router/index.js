import { createRouter, createWebHistory } from 'vue-router'

import pinia from '../stores'
import { useAuthStore } from '../stores/authStore'

import Login from '../pages/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        meta: {
            title: 'Inicio de Sesión',
        },
        component: Login,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    // Cambio de titulo en el documento
    if (to.meta.title) {
        document.title = to.meta.title
    }

    // Redireccionamiento de rutas especificas
    if (to.path === '/') {
        const store = useAuthStore(pinia)
        store.cargando = true
        next()
        return
    }
    next()
})

export default router
