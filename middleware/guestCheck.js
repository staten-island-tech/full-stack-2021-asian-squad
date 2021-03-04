// redirects user back to homepage if already logged in
export default function ({ store, redirect }) {
  if (store.state.user.loggedIn) {
    return redirect('/')
  }
}
