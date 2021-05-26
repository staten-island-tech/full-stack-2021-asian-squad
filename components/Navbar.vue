<template>
  <vs-navbar class='nav' shadow fixed>
    <template #left>
      <vs-button transparent dark to='/'>
        <strong>BAT</strong>
        <template #animate>
          <i class='bx bx-home'></i>
        </template>
      </vs-button>
    </template>
    <template #right>
      <vs-button v-if='loggedIn' dark to='/profile'
      ><i class='bx bx-user'></i> &nbsp; Profile
      </vs-button
      >
      <vs-button dark v-if='!loggedIn' to='/login'>Log In</vs-button>
      <vs-button dark v-else @click='logOut'>Log Out</vs-button>
    </template>
  </vs-navbar>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn
    },
    uid() {
      return this.$store.state.user.uid
    }
  },
  methods: {
    logOut() {
      this.$fire.auth.signOut()
      this.$router.push('/')
    },
  }
}
</script>

<style lang='scss' scoped>
* {
  position: relative;
}
</style>
