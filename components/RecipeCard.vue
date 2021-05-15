<template>
  <vs-card @click='goToRecipe'>
    <template #title>
      <h3> {{ recipeData.name }} </h3>
    </template>
<!--    <template #interactions>-->
<!--      <vs-button :to='recipeLink'>Hello</vs-button>-->
<!--    </template>-->
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
  //width: 200px;
  height: 300px;
}
</style>
