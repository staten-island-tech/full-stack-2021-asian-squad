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
    } catch (error) {
      console.error(error)
    }
    const userData = user.data()
    if (pushStore) store.commit('user/setUserData', userData)
    return userData
  })

  inject('addImage', async (imageData) => {
    const metadata = {
      contentType: 'image/jpeg'
    }
    const uname = store.state.user.userData.uname
    const ref = app.$fire.storage
      .ref(`${uname}/${imageData.name}`)
    let downloadURL
    try {
      const snapshot = await ref.put(imageData, metadata)
      downloadURL = await snapshot.ref.getDownloadURL()
    } catch (error) {
      console.error(error)
    }
    return downloadURL
    // const uploadTask = this.$fire.storage
    //   .ref(`${this.$store.state.user.userData.uname}/${this.image.name}`)
    //   .put(this.image, metadata)
    // uploadTask.on(
    //   'state_changed',
    //   () => {},
    //   (error) => {
    //     this.$vs.notification({
    //       color: 'danger',
    //       title: 'Upload Failure',
    //       text: error
    //     })
    //   },
    //   () => {
    //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //       this.image = downloadURL
    //     })
    //   }
    // )
  })
}
