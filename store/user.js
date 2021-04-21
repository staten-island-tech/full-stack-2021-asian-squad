export const state = () => ({
  loggedIn: false,
  uid: undefined,
  userData: undefined,
  rememberedEmail: '',
  rememberMe: false
})

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    if (!authUser) {
      state.loggedIn = false
      state.uid= undefined
      state.userData = undefined
      claims = null
    } else {
      const { uid } = authUser
      state.uid = uid
      state.loggedIn = true
    }
  },
  recordRememberedEmail(state, newEmail) {
    if (state.rememberMe) state.rememberedEmail = newEmail
    else state.rememberedEmail = ''
  },
  setRemPref(state, value) {
    state.rememberMe = value
  },
  setUserData(state, user) {
    state.userData = user
  }
}
