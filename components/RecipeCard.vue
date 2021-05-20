<template>
  <vs-card @click='goToRecipe'>
    <template #title>
      <h2> {{ recipeData.name }} </h2>
    </template>
    <template #img>
      <img :src='recipeData.imgUrl' alt=''>
    </template>
    <template #text>
      <p>{{ recipeData.desc }}</p>
    </template>
  </vs-card>
</template>

<script>
export default {
  props: [
    'rawRecipeData'
  ],
  data() {
    return {
      recipeData: undefined,
      recipeLink: undefined
    }
  },
  created() {
    this.recipeData = this.rawRecipeData.data()
    this.recipeLink = `/recipe/${this.rawRecipeData.id}`
  },
  methods: {
    goToRecipe() {
      this.$router.push(this.recipeLink)
    }
  }
}
</script>

<style lang='scss' scoped>
img {
  object-fit: cover;
  height: 300px;
}
</style>
