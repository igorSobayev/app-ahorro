import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_CONNECTION

const state = {
    user: null,
    token: ''
}

const mutations = {
    setUserData(state, userData) {
        state.user = userData.user
        state.token = userData.token
        localStorage.setItem('user', JSON.stringify(userData))
        axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    },
    clearUserData() {
        localStorage.removeItem('user')
        location.reload()
    }
}

const actions = {
    login({ commit }, credentials) {
        return axios
            .post('/login', credentials)
            .then(({ data }) => {
                commit('setUserData', data)
            })
    },
    register({ commit }, userData) {
        return axios
            .post('/register', userData)
            .then(({ data }) => {
                return 200
            })
            .catch(e => {
                return e.response.status
            })
    },
    logout({ commit }) {
        commit('clearUserData')
    },
    setUserDataAction({ commit }, data) {
        commit('setUserData', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
