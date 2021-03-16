export const state = () => ({
  loggedIn: false,
  authData: undefined,
  userData: undefined,
  rememberedEmail: '',
  rememberMe: false,
})

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    if (!authUser) {
      state.loggedIn = false
      state.authData = undefined
      state.userData = undefined
      claims = null
    } else {
      const { uid, email, emailVerified } = authUser
      state.authData = { uid, email, emailVerified }
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
  },
}
