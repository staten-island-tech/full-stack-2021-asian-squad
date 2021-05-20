<template>
  <div class='container'>
    <div v-if='userData'>
      <!--      <h1>Signed In as User: {{ userData.uname }}</h1>-->
      <h1 class='welcome'>Welcome to Bone Apple Teeth, {{ userData.uname }}!</h1>
      <div class='recipe-grid'>
        <RecipeCard
          v-for='recipe in recipes'
          :key='recipe.id'
          :rawRecipeData='recipe'
        />
      </div>
    </div>
    <div class='welcome' v-else>
      <h1>Bone Apple Teeth</h1>
      <p>Welcome! Please log in or sign up!</p>
    </div>
  </div>
</template>

<script>
import RecipeCard from '~/components/RecipeCard.vue'

export default {
  components: { RecipeCard },
  computed: {
    userData() {
      return this.$store.state.user.userData
    }
  },
  created() {
    this.$fire.firestore
      .collection('recipes')
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) => {
          this.recipes.push(doc)
        })
      )
  },
  data() {
    return {
      recipes: []
    }
  },
  methods: {
    getData: async function() {
      const ref = this.$fire.firestore.collection('recipes')
      let querySnapshot
      try {
        querySnapshot = await ref.get()
        this.recipes = []
        querySnapshot.forEach((doc) => {
          this.recipes.push(doc.data())
        })
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 2rem;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.welcome {
  margin: 1.5rem 0;
}
</style>
