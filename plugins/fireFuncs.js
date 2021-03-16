export default ({ app, store }, inject) => {
  inject('addUser', async (id, dsname, email) => {
    // adds new user onto firestore
    const user = {
      uname: dsname,
      uimg: 'placeholder',
      uemail: email,
      udisc: '',
      preferences: {
        dark_mode: false
      },
      shopping_list: []
    }

    const ref = app.$fire.firestore.collection('users').doc(id)

    try {
      await ref.set(user)
      console.log(`New user "${dsname}" successfully created`)
    } catch (e) {
      console.error(e)
    }
    // add new data onto vuex store
    store.commit('user/setUserData', user)
  })

  inject('getUser', async (id, pushStore = true) => {
    // returns user information stored from firestore, and puts it on vuex by default
    const ref = app.$fire.firestore.collection('users').doc(id)

    let user
    try {
      user = await ref.get()
    } catch (e) {
      console.error(e)
    }

    const userData = user.data()

    if (pushStore) store.commit('user/setUserData', userData)
    return userData
  })

}
