export default ({ app, store }, inject) => {
  inject('addUser', async (uid, dsname, email) => {
    // adds new user onto firestore
    const user = {
      uid,
      uname: dsname,
      uimg: undefined,
      uemail: email,
      udisc: '',
      preferences: {
        dark_mode: false
      },
      shopping_list: []
    }

    const ref = app.$fire.firestore.collection('users').doc(uid)

    try {
      await ref.set(user)
      console.log(`New user "${dsname}" successfully created`)
    } catch (e) {
      console.error(e)
    }
    // add new data onto vuex store
    store.commit('user/setUserData', user)
  })

  inject('getUser', async (uid, pushStore = true) => {
    // returns user information stored from firestore, and puts it on vuex by default
    const ref = app.$fire.firestore.collection('users').doc(uid)

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

  inject('addRecipe', async (recipeData) => {
    const recipeImage = recipeData.image
    delete recipeData.image
    const metadata = {
      contentType: 'image/jpeg'
    }
    // current user data
    const { uid, userData } = store.state.user
    // references to storage points
    const imgRef = app.$fire.storage
      .ref(`recipeImages/${userData.uname}/${recipeImage.name}`)
    const recipeRef = app.$fire.firestore
      .collection('recipes').doc()
    const userRef = app.$fire.firestore
      .collection(`users/${uid}/created-recipes`)

    try {
      // store image on firebase storage
      const snapshot = await imgRef.put(recipeImage, metadata)

      // store remaining data and reference on firestore
      recipeData.imgUrl = await snapshot.ref.getDownloadURL()
      await recipeRef.set(recipeData)

      // create reference to user document
      await userRef.add({
        ref: recipeRef,
        name: recipeData.name,
        imgUrl: recipeData.imgUrl,
        author: userData.uname,
      })
    } catch (error) {
      console.error(error)
    }
  })
}
