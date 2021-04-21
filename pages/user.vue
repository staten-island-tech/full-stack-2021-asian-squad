<template>
  <div class="user-interface">
    <!-- <vs-avatar circle>
      <img src="" alt="">
    </vs-avatar> -->
    <h1>Hello {{ userData.uname }} </h1>
    <h2>About Me:</h2>
    <vs-input v-model="value" placeholder="Brief About Me" />
  </div>
</template>

<script>
import RecipeCard from '~/components/RecipeCard.vue'
export default {
  computed: {
    userData() {
      return this.$store.state.user.userData
    },
  },
}
</script>

<style></style>
