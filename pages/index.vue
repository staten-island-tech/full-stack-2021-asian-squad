<template>
  <div class="container">
    <h1 v-if="loginStatus">Signed In as {{ userUID }}</h1>
    <h1 v-else>Not Signed In</h1>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuesaxLogo from '~/components/VuesaxLogo.vue'

export default {
  components: {
    Logo,
    VuesaxLogo,
  },
  computed: {
    loginStatus() {
      return this.$store.state.user.loggedIn
    },
    userUID() {
      return this.$store.state.user.userData.uid
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
