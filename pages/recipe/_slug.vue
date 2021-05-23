<template>
  <div>
    Slug: {{ $route.params.slug }}
    <br />
    Recipe: {{ recipe.name }}
    <br />
    Ingredients: {{ recipe.ingredients }}
    <br />
    Instructions: {{ recipe.instructions }}
    <img v-if="recipe" :src="recipe.imgUrl" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: '',
    }
  },
  async created() {
    const recipeId = this.$route.params.slug
    this.recipe = await this.$getRecipe(recipeId)
  },
}
</script>

<style lang='scss' scoped>
</style>
