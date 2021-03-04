export default function({ route, redirect }) {
  const LS = localStorage.getItem('vuex')

  if (LS === null) {
    return
  }

  const loggedStatus = JSON.parse(LS).user.loggedIn
  console.log(loggedStatus)

  const loggedBL = ['/login', '/signup']
  const guestBL = ['/create']

  const pth = route.path
  console.log(pth)

  if (loggedStatus) {
    if (loggedBL.includes(pth)) {
      console.log("executed!")
      return redirect('/')
    }
  } else {
    if (guestBL.includes(pth)) {
      return redirect('/login')
    }
  }
}
