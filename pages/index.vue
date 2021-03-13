<template>
  <div class="container">
    <h1 v-if="loginStatus">Signed In as {{ userUID }}</h1>
    <h1 v-else>Not Signed In</h1>
  </div>
</template>

<script>
export default {
  computed: {
    loginStatus() {
      return this.$store.state.user.loggedIn
    },
    userUID() {
      return this.$store.state.user.authData.uid
    },
  },
}
</script>

<style lang='scss' scoped>
.container {
  position: relative;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
