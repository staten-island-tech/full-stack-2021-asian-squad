export const state = () => ({
  loggedIn: false,
  userData: null,
})

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
    if (!authUser) {
      state.loggedIn = false
      state.userData = null
      claims = null
    } else {
      const { uid, email, emailVerified } = authUser
      state.userData = { uid, email, emailVerified }
      state.loggedIn = true
    }
  },
}
