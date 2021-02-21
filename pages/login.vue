<template>
  <div class="login-content">
    <h1>Bone Apple Teeth</h1>
    <h2>Sign In</h2>
    <form @submit.prevent>
      <vs-input
        class="flex-items"
        type="text"
        name="email"
        label-placeholder="Email"
        v-model="email"
      />
      <vs-input
        class="flex-items"
        type="password"
        name="pass"
        label-placeholder="Password"
        v-model="pass"
      />
      <vs-input
        class="flex-items"
        type="submit"
        value="Sign In"
        @click="checkLogin()"
      />
      <vs-input
        class="flex-items"
        type="submit"
        value="Sign in with Google"
        @click="checkLogin()"
      />
    </form>
    <div class="background">
    </div>
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
@import url('https://fonts.googleapis.com/css2?family=Nova+Round&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

.background {
  position: absolute;
  z-index: -1;
  background-size: cover;
  background-color: #f5a6a6;
  clip-path: polygon(0 70%, 100% 30%, 100% 100%, 0% 100%);
  height: 100vh;
  width: 100vw;
}

.login-content {
  position: relative;
  font-family: 'Nova Round', cursive;
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
  margin: 2rem;
  transform: scale(1.25);
  /* width: 15rem; */
}
</style>
