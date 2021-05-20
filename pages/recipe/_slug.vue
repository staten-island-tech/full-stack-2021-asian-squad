<template>
  <div>
    Slug: {{ $route.params.slug }}
    <br/>
    Recipe: {{ recipe }}
    <br/>
    <img v-if='recipe' :src='recipe.imgUrl' alt=''>
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
