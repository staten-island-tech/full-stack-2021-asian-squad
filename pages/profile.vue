<template>
  <UserProfile :user-id='uid' />
</template>

<script>
import RecipeCard from '~/components/RecipeCard.vue'
export default {
  components: { RecipeCard },
  computed: {
    uid() {
      return this.$store.state.user.uid
    },
  },
}
</script>

<style lang='scss' scoped>
</style>
