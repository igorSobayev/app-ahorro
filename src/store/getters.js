const getters = {
    isLogged: state => !!state.user.user,
    user: state => state.user.user,
    token: state => state.user.token
}
export default getters
