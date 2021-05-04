<template>
  <vs-navbar shadow fixed>
    <template #left>
      <vs-button transparent dark to='/'>
        <strong>BAT</strong>
        <template #animate>
          <i class="bx bx-home"></i>
        </template>
      </vs-button>
    </template>
    <template #right>
      <vs-button dark :disabled='!loggedIn' to='/create'>
        <i class='bx bx-plus'></i> &nbsp; Create
      </vs-button>
      <vs-button dark v-if='!loggedIn' to='/login'>Log In</vs-button>
      <vs-button dark v-else @click='logOut'>Log Out</vs-button>
      <vs-button dark to='/user'>User</vs-button>
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
