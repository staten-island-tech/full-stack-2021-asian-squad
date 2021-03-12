<template>
  <div class='login-content'>
    <h1>Bone Apple Teeth</h1>
    <h2>Sign Up</h2>
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
        type='text'
        label-placeholder='Name'
        v-model='name'
      >
        <template #icon>
          <i class='bx bx-user'></i>
        </template>
      </vs-input>
      <vs-input
        class='flex-items'
        icon-after
        type='password'
        label-placeholder='Password'
        v-model='pass'
      >
        <template #icon>
          <i class='bx bx-lock'></i>
        </template>
      </vs-input>
      <vs-input
        class='flex-items'
        icon-after
        type='password'
        label-placeholder='Confirm Password'
        v-model='passConfirm'
      >
        <template #icon>
          <i class='bx bx-check-shield'></i>
        </template>
      </vs-input>
      <vs-button
        color='#1F1F1F'
        class='flex-items'
        type='submit'
        @click='emailSignUp()'
      >Sign Up
      </vs-button
      >
      <vs-button
        color='#1F1F1F'
        class='flex-items'
        type='submit'
        @click='googleLogin()'
      ><i class='bx bxl-google'></i> &nbsp; Sign up with Google
      </vs-button
      >
      <div class='create'>
        <span>Have an account?</span>
        <vs-button size='large' dark transparent to='/login'>Log In</vs-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      name: '',
      pass: '',
      passConfirm: ''
    }
  },
  methods: {
    emailSignUp: function() {
      // standard email + password signup w/ confirmation
      if (this.pass !== this.passConfirm) {
        alert('Passwords do not match.')
        return
      }

      this.$fire.auth
        .createUserWithEmailAndPassword(this.email, this.pass)
        .then(() => {
          // create firestore entry
          this.$addUser(this.name, this.email)
          // bump user to home
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
          this.$addUser(this.name, this.email)
          this.$router.push('/')
        })
        .catch((error) => {
          alert(error.message)
        })
    }
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
  margin-top: 1.5rem;
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
