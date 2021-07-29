import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_CONNECTION

const state = {
    chartMonth: []
}

const mutations = {
    setChartMonth(state, chartMonth) {
        state.chartMonth = chartMonth
    },
}

const actions = {
    getTransactionsDataChartMonth({ commit }) {
        return axios
            .get('/transactions-chart-month')
            .then(({ data }) => {
                commit('setChartMonth', data.data)
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
