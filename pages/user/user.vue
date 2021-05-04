<template>
  <div class="user-interface">
    <vs-avatar circle>
      <img src="" alt="">
    </vs-avatar>
    <h1>Hello {{ userData.uname }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    userData() {
      return this.$store.state.user.userData
    },
  },
}
</script>

<style></style>
