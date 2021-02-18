<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent>
      <input type="text" name="email" placeholder="Email" v-model="email" />
      <input type="text" name="pass" placeholder="Password" v-model="pass" />
      <input type="submit" value="Log In" @click="checkLogin()" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      pass: '',
    }
  },
  methods: {
    checkLogin: function () {
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.pass)
        .then((userCredential) => {
          alert(`Signed in as ${userCredential.user.uid}!`)
        })
        .catch((error) => {
          alert(error.message)
        })
    },
  },
}
</script>

<style>
div {
  font-size: 5rem;
}
</style>
