<template>
  <div class="forgot-content">
    <h1>Bone Apple Teeth</h1>
    <h2>Forgot Password</h2>
    <form @submit.prevent>
      <vs-input
        class="flex-items"
        icon-after
        type="text"
        label-placeholder="Email"
        v-model="email"
      >
        <template #icon>
          <i class="bx bx-envelope"></i>
        </template>
      </vs-input>
      <vs-button
        color="#1F1F1F"
        class="flex-items"
        type="submit"
        @click="sendReset()"
        >Send Reset Email</vs-button
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    }
  },
  methods: {
    sendReset: function () {
      this.$fire.auth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.$router.push('/login')
        })
        .catch((error) => {
          alert(error.message)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.forgot-content {
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
  margin-right: 2.5rem;
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
</style>
