export default ({ app, store }, inject) => {
  inject('addUser', async (uid, dsname, email) => {
    // adds new user onto firestore
    const user = {
      uname: dsname,
      uimg: '',
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
  })

  inject('getUser', async (uid, commit = true) => {
    // returns user information stored from firestore, and puts it on vuex
    const ref = app.$fire.firestore.collection('users').doc(uid)

    let user
    try {
      user = await ref.get()
    } catch (error) {
      console.error(error)
    }
    const userData = user.data()
    if (commit) store.commit('user/setUserData', userData)
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
    recipeData.author = {
      uname: userData.uname,
      uimg: userData.uimg
    }
    recipeData.authorId = uid
    // references to storage points
    const imgRef = app.$fire.storage.ref(
      `recipeImages/${userData.uname}/${recipeImage.name}`
    )
    const recipeRef = app.$fire.firestore.collection('recipes').doc()
    const userRef = app.$fire.firestore.collection(
      `users/${uid}/created-recipes`
    ).doc(recipeRef.id)

    try {
      // store image on firebase storage
      const snapshot = await imgRef.put(recipeImage, metadata)

      // store remaining data and reference on firestore
      recipeData.imgUrl = await snapshot.ref.getDownloadURL()
      await recipeRef.set(recipeData)

      // create reference to user document
      await userRef.set({
        ref: recipeRef.id,
        name: recipeData.name,
        desc: recipeData.desc,
        imgUrl: recipeData.imgUrl
      })
    } catch (error) {
      console.error(error)
    }
  })

  inject('getRecipe', async (recipeId) => {
    const recipesRef = app.$fire.firestore.collection('recipes')

    let recipeData
    try {
      recipeData = await recipesRef.doc(recipeId).get()
    } catch (e) {
      console.error(e)
    }
    if (recipeData.exists) return recipeData.data()
    else throw 'Recipe does not exist!'
  })

  inject('getUserRecipes', async (uid) => {
    let resArr = []
    const querySnapshot = await app.$fire.firestore
      .collection(`users/${uid}/created-recipes`)
      .get()
    querySnapshot.forEach((doc) => resArr.push(doc))
    return resArr
  })

  inject('deleteRecipe', async (recipeId) => {
    try {
      await app.$fire.firestore.doc(`recipes/${recipeId}`).delete()
      await app.$fire.firestore.doc(`users/${store.state.user.uid}/created-recipes/${recipeId}`).delete()
    } catch (e) {
      console.error(e)
    }
  })
}
