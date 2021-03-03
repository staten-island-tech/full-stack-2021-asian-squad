<template>
  <vs-navbar shadow square>
    <template #left>
      <vs-button to='/'>Home</vs-button>
    </template>
    <template #right>
      <vs-button :disabled='!loggedIn' to='/create'>
        <i class='bx bx-plus'></i> &nbsp; Create New Recipe
      </vs-button>
      <vs-button v-if='!loggedIn' to='/login'>Sign In</vs-button>
      <vs-button v-else @click='logOut'>Log Out</vs-button>
    </template>
  </vs-navbar>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn
    }
  },
  methods: {
    logOut: function() {
      this.$fire.auth.signOut()
      this.$router.push('/')
    }
  }
}
</script>

<style lang='scss' scoped>
* {
  position: relative;
}
</style>
