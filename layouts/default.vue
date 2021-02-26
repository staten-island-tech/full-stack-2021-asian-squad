<template>
  <div>
    <vs-navbar dark>
      <template #left>
        <vs-button to='/'>Home</vs-button>
      </template>
      <template #right>
        <vs-button v-if='!loginStatus' to='/login'>Sign In</vs-button>
        <vs-button v-else @click='logOut'>Log Out</vs-button>
      </template>
    </vs-navbar>
    <div class='bg'></div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    loginStatus() {
      return this.$store.state.user.loggedIn
    }
  },
  methods: {
    logOut: function() {
      this.$fire.auth.signOut()
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nova+Round&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

* {
  font-family: 'Nova Round', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, 'Helvetica Neue', Arial, sans-serif !important;
}

html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.bg {
  position: absolute;
  z-index: -1;
  background-size: cover;
  background-color: #f5a6a6;
  clip-path: polygon(0 70%, 100% 30%, 100% 100%, 0% 100%);
  height: 100vh;
  width: 100vw;
}
</style>
