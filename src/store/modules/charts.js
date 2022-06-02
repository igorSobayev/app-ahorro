import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_CONNECTION

const state = {
    chartsData: []
}

const mutations = {
    setChartsData(state, chartsData) {
        state.chartsData = chartsData
    },
}

const actions = {
    getTransactionsDataChartMonth({ commit }) {
        return axios
            .get('/transactions-chart-month')
            .then(({ data }) => {
                commit('setChartsData', data.data)
            })
            .catch(e => {
                console.log(e)
            })
    },
    getTransactionsDataChartLast30Days({ commit }) {
        return axios
            .get('/transactions-chart-last-30-days')
            .then(({ data }) => {
                commit('setChartsData', data.data)
            })
            .catch(e => {
                console.log(e)
            })
    },
    getTransactionsDataChartYear({ commit }) {
        return axios
            .get('/transactions-chart-all-year')
            .then(({ data }) => {
                commit('setChartsData', data.data)
            })
            .catch(e => {
                console.log(e)
            })
    },
    getTransactionsDataChartAll({ commit }) {
        return axios
            .get('/transactions-chart-all')
            .then(({ data }) => {
                commit('setChartsData', data.data)
            })
            .catch(e => {
                console.log(e)
            })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
