<template>
  <div id="dashboard">
    <h3>{{users[0].id}}</h3>
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  data () {
    return {
      users: []
    }
  },
  created () {
    this.$fire.firestore
      .collection('user')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.id,
            'uname': doc.data().uname,
            'udescription': doc.data().udescription,
          }
          this.users.push(data)
          console.log(data)
        })
      })
  },
}
</script>

<style>
.user-item{
  border: 1rem;
  border-color: black;
}
</style>
