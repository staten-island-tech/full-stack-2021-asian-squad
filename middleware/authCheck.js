// redirects user to login page if not logged in
export default function ({ store, redirect }) {
  if (!store.state.user.loggedIn) {
    return redirect('/login')
  }
}
