export default Reducer

function Reducer (state, action) {
  const reducer = ({
    SET_LOGIN,
    SET_USER,
    SET_REGISTER,
    SET_TASK
  })[action.type]

  return (reducer && reducer(state, action)) || state
}

function SET_LOGIN (state, action) {
  return { ...state, login: action.login }
}

function SET_USER (state, action) {
  return { ...state, user: action.user }
}

function SET_REGISTER (state, action) {
  let users = state.users
  let tasks = state.tasks
  users[action.user.email] = {
    password: action.user.password,
    id: action.user.id
  }
  tasks[action.user.email] = []
  return { ...state, users, tasks }
}

function SET_TASK (state, action) {
  const newTasks = action.data[0]
  const user = action.data[1]
  let tasks = state.tasks
  tasks[user] = newTasks
  
  return { ...state, tasks }
}
