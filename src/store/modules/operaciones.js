import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_CONNECTION

const state = {
    categories: [],
    transactions: [],
    updateTransactions: false,
    loading: false
}

const mutations = {
    setCategories(state, categories) {
        state.categories = categories
    },
    setTransactions(state, transactions) {
        state.transactions = transactions
    },
    setUpdateTransactions(state, updateTransactions) {
        state.updateTransactions = updateTransactions
    },
    setLoading(state, loading) {
        state.loading = loading
    }
}

const actions = {
    getCategories({ commit }) {
        commit('setLoading', true)
        return axios
            .get('/all-categories')
            .then(({ data }) => {
                commit('setCategories', data.data.categories)
                commit('setLoading', false)
            })
            .catch(e => {
                console.log(e)
            })
    },
    getTransactionsMonth({ commit }) {
        commit('setLoading', true)
        return axios
            .get('/transactions-month')
            .then(({ data }) => {
                commit('setTransactions', data.data.transactions)
                commit('setUpdateTransactions', false)
                commit('setLoading', false)
            })
            .catch(e => {
                console.log(e)
            })
    },
    getTransactionsLast30Days({ commit }) {
        commit('setLoading', true)
        return axios
            .get('/transactions-last-30-days')
            .then(({ data }) => {
                commit('setTransactions', data.data.transactions)
                commit('setUpdateTransactions', false)
                commit('setLoading', false)
            })
            .catch(e => {
                console.log(e)
            })
    },
    getAllTransactionsYear({ commit }) {
        commit('setLoading', true)
        return axios
            .get('/transactions-all-year')
            .then(({ data }) => {
                commit('setTransactions', data.data.transactions)
                commit('setUpdateTransactions', false)
                commit('setLoading', false)
            })
            .catch(e => {
                console.log(e)
            })
    },
    getAllTransactions({ commit }) {
        commit('setLoading', true)
        return axios
            .get('/transactions-all')
            .then(({ data }) => {
                commit('setTransactions', data.data.transactions)
                commit('setUpdateTransactions', false)
                commit('setLoading', false)
            })
            .catch(e => {
                console.log(e)
            })
    },
    loadUpdateTransaction({ commit }, id) {
        commit('setLoading', true)
        return new Promise((resolve, reject) => {
            axios.get('/transaction-data-' + id)
                .then(({ data }) => {
                    resolve(data)
                    commit('setLoading', false)
                })
                .catch(e => {
                    reject(e)
                })
        })
    },
    addTransaction({ commit }, operacion) {
        commit('setLoading', true)
        return new Promise((resolve, reject) => {
            axios.post('/add-transaction', { transaction: operacion })
                .then(res => {
                    resolve(res)
                    commit('setUpdateTransactions', true)
                    commit('setLoading', false)
                })
                .catch(e => {
                    reject(e)
                })
        })
    },
    updateTransaction({ commit }, operacion) {
        commit('setLoading', true)
        return new Promise((resolve, reject) => {
            axios.post('/update-transaction', { transaction: operacion })
                .then(res => {
                    resolve(res)
                    commit('setUpdateTransactions', true)
                    commit('setLoading', false)
                })
                .catch(e => {
                    reject(e)
                })
        })
    },
    removeTransaction({ commit }, id_transaction) {
        return new Promise((resolve, reject) => {
            axios.post('/remove-transaction', id_transaction)
                .then(res => {
                    resolve(res)
                    commit('setUpdateTransactions', true)
                })
                .catch(e => {
                    reject(e)
                })
        })
    },
    updateTransactionsAction({ commit }, updateTransactions) {
        commit('setUpdateTransactions', updateTransactions)
    },
    loadingAction({ commit }, loading) {
        commit('setLoading', loading)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
