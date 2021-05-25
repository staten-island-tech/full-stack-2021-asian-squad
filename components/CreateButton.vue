<template>
  <vs-button class='button' dark circle v-if='loggedIn' to='/create'>
    <i class='bx bx-plus'></i> &nbsp; Create
  </vs-button>
</template>

<script>
export default {
  name: 'CreateButton',
  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn
    }
  },
}
</script>

<style lang='scss' scoped>
.button {
  transform: scale(1.45);
}
</style>
