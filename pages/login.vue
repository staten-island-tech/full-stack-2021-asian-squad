<template>
  <div class='login-content'>
    <h1>Bone Apple Teeth</h1>
    <h2>Sign In</h2>
    <form @submit.prevent>
      <vs-input
        class='flex-items'
        type='text'
        label-placeholder='Email'
        v-model='email'
      />
      <vs-input
        class='flex-items'
        type='password'
        label-placeholder='Password'
        v-model='pass'
      />
      <vs-checkbox v-model='rememberMe'>Remember Me</vs-checkbox>
      <vs-button
        color='#1F1F1F'
        class='flex-items'
        type='submit'
        @click='emailLogin()'
      >Sign In
      </vs-button
      >
      <vs-button
        color='#1F1F1F'
        class='flex-items'
        type='submit'
        @click='googleLogin()'
      ><i class='bx bxl-google'></i> &nbsp; Sign in with Google
      </vs-button
      >
      <div class='create'>
        <p>Don't have an account? <a href=''> Create a new one</a></p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    // set getters and setters for remember me button
    // to sync real-time with vuex store
    rememberMe: {
      get() {
        return this.$store.state.user.rememberMe
      },
      set(value) {
        this.$store.commit('user/updateRemPref', value)
      }
    }
  },
  data() {
    return {
      email: '',
      pass: ''
    }
  },
  methods: {
    emailLogin: function() {
      // standard email + password login
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.pass)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          alert(error.message)
        })
    },
    googleLogin: function() {
      // google login popup
      const provider = new this.$fireModule.default.auth.GoogleAuthProvider()
      this.$fire.auth
        .signInWithPopup(provider)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  },
  mounted() {
    // if user chooses to remember email, put email on box
    this.email = this.$store.state.user.rememberedEmail
  },
  beforeRouteLeave(to, from, next) {
    // store email on vuex to remember after logout
    this.$store.commit('user/recordRememberedEmail', this.email)
    next()
  }
}
</script>

<style lang='scss' scoped>
.login-content {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

h1 {
  margin-top: 5rem;
  font-size: 2.5rem;
  display: block;
  z-index: 3;
}

h2 {
  font-size: 2rem;
  margin-right: 10rem;
  margin-top: 5rem;

  z-index: 3;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-around;
  margin-top: 2rem;
}

.flex-items {
  margin: 1.5rem;
  transform: scale(1.35);
}

.create {
  margin-top: 2rem;
  color: #555555;
  a {
    color: #000;
    text-decoration: none;
  }
}
</style>
