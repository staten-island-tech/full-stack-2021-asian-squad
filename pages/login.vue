<template>
<div class="background"> 
  <div>
    <h1>Bone Apple Teeth</h1>
    <h2>Sign In</h2>
    <form @submit.prevent>
      <input class="flex-items" type="text" name="email" placeholder="Email" v-model="email" />
      <input class="flex-items" type="text" name="pass" placeholder="Password" v-model="pass" />
      <input class="flex-items" type="submit" value="Sign In" @click="checkLogin()" />
      <input class="flex-items" type="submit" value="Sign in with Google" @click="checkLogin()" />
    </form>
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

.background{
  position: relative;
    z-index: -1;
    background-size:cover;
    background-color: #F5A6A6;
   /*clip-path: polygon(0 70%, 100% 30%, 100% 100%, 0% 100%) ;*/
    
}

div {
  position: relative;
  font-family: 'Nova Round', cursive;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  
}


h1 {
margin-top:5rem;
font-size:2.5rem;
display:block;
z-index: 3;

}

h2{
font-size: 2rem;
margin-right:10rem;
margin-top: 5rem;

z-index: 3;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  margin-top: 2rem;
}

.flex-items{
margin: 2rem;  
width:15rem;
}



</style>
