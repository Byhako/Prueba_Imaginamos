
export default { register }

function register (email, password) {
  return function (dispatch) {
    const user = {
      email,
      password,
    }
    dispatch({ type: 'SET_REGISTER', user })
    dispatch({ type: 'SET_LOGIN', login: true })
  }
}
