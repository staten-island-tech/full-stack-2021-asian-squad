<template>
  <div>
    Slug: {{ $route.params.slug }}
    <br/>
    Recipe: {{ recipe }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: undefined
    }
  },
  async created() {
    const recipeId = this.$route.params.slug
    this.recipe = await this.$getRecipe(recipeId)
  }
}
</script>

<style lang='scss' scoped>

</style>
