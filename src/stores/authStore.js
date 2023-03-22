import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            logInForm: {
                email: '',
                password: '',
            },
            logInData: {
                message: '',
                show: false,
            },
            actionState: false,
            cargando: false,
        }
    },
    actions: {
        loginAuth(path) {
            this.islogIn = true
            this.cargando = true
            this.router.push({ path: 'https://www.google.com' })
        },
        async verifyJwt() {
            this.cargando = false
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${localStorage.getItem('token')}`
            const res = await axios
                .get('/auth/jwt')
                .then(res => {
                    this.cargando = true
                    return res.data
                })
                .catch(err => {
                    return err.code
                })

            return res
        },
    },
})
