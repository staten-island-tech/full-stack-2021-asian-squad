<template>
  <div class='container'>
    <div class='subContainer hero'>
      <img class='recipeImg' v-if='recipe' :src='recipe.imgUrl' alt=''>
      <div class='titleInfo'>
        <h1> {{ recipe.name }} </h1>
        <h3> {{ recipe.desc }} </h3>
      </div>
    </div>
    <div class='subContainer information'>
      <div class='ingredients'>
        <h2> Ingredients </h2>
        <ul class='itemList'>
          <li v-for='(ingredient, i) in ingredients' :key='i'> {{ ingredient }}</li>
        </ul>
      </div>
      <div class='instructions'>
        <h2> Instructions </h2>
        <ol class='itemList'>
          <li v-for='(instruction, i) in instructions' :key='i'> {{ instruction }}</li>
        </ol>
      </div>
    </div>
    <!--    <vs-card-group>-->
    <!--    </vs-card-group>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: '',
      ingredients: [],
      instructions: []
    }
  },
  async created() {
    const recipeId = this.$route.params.slug
    this.recipe = await this.$getRecipe(recipeId)
    this.ingredients = this.recipe.ingredients
    this.instructions = this.recipe.instructions
  }
}
</script>

<style lang='scss' scoped>
.subContainer {
  display: grid;
  h1 {
    font-weight: 700;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 3fr 2fr;
    .titleInfo {
      padding: 3rem 0;
    }
  }
  grid-gap: 2rem;
}

.recipeImg {
  margin: auto;
  height: 60vh;
  background-color: white;
  //width: 100%;
  border-radius: 20px;
}

.information {
  margin: 3rem;
  text-align: center;
}

.itemList {
  text-align: left;
}
</style>
