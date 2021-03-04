// export default function ({ store, redirect }) {
//   if (!store.state.user.loggedIn) {
//     return redirect('/login')
//   }
// }

export default function({ redirect }) {
  const store = JSON.parse(localStorage.getItem('vuex'))
  if (!store.state.user.loggedIn) {
    return redirect('/login')
  }
}
