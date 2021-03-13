<template>
  <div class='login-content'>
    <h1>Bone Apple Teeth</h1>
    <h2>Log In</h2>
    <form @submit.prevent>
      <vs-input
        class='flex-items'
        icon-after
        type='text'
        label-placeholder='Email'
        v-model='email'
      >
        <template #icon>
          <i class='bx bx-envelope'></i>
        </template>
      </vs-input>
      <vs-input
        class='flex-items'
        icon-after
        type='password'
        label-placeholder='Password'
        v-model='pass'
        @click-icon='passVisible = !passVisible'
        :visible-password='passVisible'
      >
        <template #icon>
          <i v-if='!passVisible' class='bx bx-lock'></i>
          <i v-else class='bx bx-show'></i>
        </template>
      </vs-input>
      <vs-checkbox dark v-model='rememberMe'>Remember Me</vs-checkbox>
      <vs-button size='large' type='button' dark transparent to='/forgot'
      >Forgot Password?
      </vs-button>
      <vs-button
        color='#1F1F1F'
        class='flex-items'
        type='submit'
        @click='emailLogin()'
      >Log In
      </vs-button>
      <vs-button
        color='#1F1F1F'
        class='flex-items'
        type='submit'
        @click='googleLogin()'
      ><i class='bx bxl-google'></i> &nbsp; Log in with Google
      </vs-button>
      <div class='create'>
        <span>Don't have an account?</span>
        <vs-button size='large' dark transparent to='/signup'
        >Create one
        </vs-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  middleware: 'guestCheck',
  computed: {
    // set getters and setters for remember me button
    // to sync real-time with vuex store
    rememberMe: {
      get() {
        return this.$store.state.user.rememberMe
      },
      set(value) {
        this.$store.commit('user/setRemPref', value)
      }
    }
  },
  data() {
    return {
      email: '',
      pass: '',
      passVisible: false
    }
  },
  methods: {
    emailLogin: function() {
      // standard email + password login
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.pass)
        .then((result) => {
          // push user info into vuex and bump to homepage w/ helper
          this.$getUser(result.user.uid)
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
        .then((result) => {
          const { uid, displayName, email } = result.user
          if (result.additionalUserInfo.isNewUser) {
            // add user to the firestore if new google log-in
            this.$addUser(uid, displayName, email)
          } else {
            // else load existing user data into vuex w/ helper
            this.$getUser(uid)
          }
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
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

h1 {
  margin-top: 3rem;
  font-size: 2.5rem;
  display: block;
  z-index: 3;
}

h2 {
  font-size: 2rem;
  margin-right: 10rem;
  margin-top: 3rem;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  color: #555555;

  a {
    color: #000;
    text-decoration: none;
  }
}
</style>
