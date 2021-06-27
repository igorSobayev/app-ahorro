import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_CONNECTION

const state = {
    categories: [],
    transactions: []
}

const mutations = {
    setCategories(state, categories) {
        state.categories = categories
    },
    setTransactions(state, transactions) {
        state.transactions = transactions
    }
}

const actions = {
    getCategories({ commit }) {
        return axios
            .get('/all-categories')
            .then(({ data }) => {
                commit('setCategories', data.data.categories)
            })
            .catch(e => {
                console.log(e)
            })
    },
    getTransactionsMonth({ commit }) {
        return axios
            .get('/transactions-month')
            .then(({ data }) => {
                console.log(data)
                commit('setTransactions', data.data.transactions)
            })
            .catch(e => {
                console.log(e)
            })
    },
    addTransaction({ commit }, operacion) {
        return new Promise((resolve, reject) => {
            axios.post('/add-transaction', { transaction: operacion })
                .then(res => {
                    resolve(res)
                })
                .catch(e => {
                    reject(e)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
