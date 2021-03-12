export default ({ app }, inject) => {
  inject('addUser', async (name, email) => {
    const user = {
      uname: name,
      uimg: 'placeholder',
      uemail: email,
      udisc: '',
      preferences: {
        dark_mode: false
      },
      shopping_list: []
    }

    const ref = app.$fire.firestore
      .collection('users')

    try {
      const res = await ref.add(user)
      console.log(`New user ${name} successfully created: ${res}`)
    } catch (e) {
      console.error(e)
    }
  })
}
