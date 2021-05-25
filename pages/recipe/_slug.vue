<template>
  <div class='container' v-if='recipe'>
    <div class='subContainer hero'>
      <img class='recipeImg' v-if='recipe' :src='recipe.imgUrl' alt=''>
      <div class='titleInfo'>
        <h1> {{ recipe.name }} </h1>
        <h3> {{ recipe.desc }} </h3>
        <h4> Prep & Cook Time: {{ recipe.prepTime }} minutes </h4>
        <h4> Difficulty: {{ difficulty }} </h4>
        <vs-button transparent dark class='author' :to='userLink'>
          <img
            class='profileImage'
            v-if='recipe.author.uimg'
            :src='recipe.author.uimg'
            alt=''
          />
          <img
            class='profileImage'
            v-else
            src='@/assets/noProfilePic.png'
            alt=''
          />
          {{ recipe.author.uname }}
        </vs-button>
      </div>
    </div>
    <div class='separator'>
      <hr>
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
      instructions: [],
      userLink: undefined,
      difficulty: ''
    }
  },
  async created() {
    const recipeId = this.$route.params.slug
    this.recipe = await this.$getRecipe(recipeId)
    this.ingredients = this.recipe.ingredients
    this.instructions = this.recipe.instructions
    this.userLink = `/user/${this.recipe.authorId}`

    //  determine difficulty
    let ans
    switch (this.recipe.difficulty) {
      case 1:
        ans = 'Easy'
        break
      case 2:
        ans = 'Intermediate'
        break
      case 3:
        ans = 'Hard'
        break
      case 4:
        ans = 'Gordon Ramsay'
        break
      default:
        ans = 'Default'
        break
    }
    this.difficulty = ans
  }
}
</script>

<style lang='scss' scoped>
.separator {
  padding: 2rem 3rem 0;
}

.subContainer {
  display: grid;
  grid-gap: 2rem;
}

.hero {
  @media (min-width: 1200px) {
    grid-template-columns: 3fr 2fr;
    .titleInfo {
      padding: 3rem 0;
    }
  }
}

.information {
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
}

.recipeImg {
  margin: auto;
  height: 50vh;
  background-color: white;
  border-radius: 20px;
  @media (max-width: 700px) {
    height: auto;
    width: 100%;
  }
}

.titleInfo {
  > * {
    padding: .5rem 0;
  }

  .profileImage {
    height: 50px;
    width: auto;
    margin-right: 10px;
    border-radius: 100%;
  }
}

.information {
  margin: 3rem;
  text-align: center;
}

.itemList {
  text-align: left;
}
</style>
