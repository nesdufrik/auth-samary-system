import axios from 'axios'

export const loginApi = async payload => {
    return await axios
        .post('/auth/login', payload)
        .then(res => res.data)
        .catch(err => err.response.data)
}
