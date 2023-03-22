import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { loginApi } from '../helpers/helpAuth'
import { useAuthStore } from '../stores/authStore'

export const useAuth = () => {
    const router = useRouter()
    const authStore = useAuthStore()
    const { logInForm, logInData, actionState, cargando } =
        storeToRefs(authStore)

    const login = async () => {
        logInData.value.show = false
        if (!logInForm.value.email || !logInForm.value.password) {
            logInData.value.message = 'Por favor llene todos los campos'
            logInData.value.show = true
            return
        }
        actionState.value = true
        await loginApi(logInForm.value).then(res => {
            actionState.value = false
            console.log(res.success)
            if (!res.success) {
                logInData.value.message = res.data.message
                logInData.value.show = true
                return
            }
            window.location.href =
                'https://admin-frontend-pos.netlify.app/admin'
        })
    }

    return {
        //! propiedades
        logInForm,
        logInData,
        actionState,
        cargando,

        //! computadas

        //! metodos
        login,
    }
}
