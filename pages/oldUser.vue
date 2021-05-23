<template>
  <div class="user-interface">
    <h1>Hello {{ userData.uname }}</h1>
    <h2>Description: {{ userData.udisc }}</h2>
    <vs-button @click="active = !active">User Settings</vs-button>

    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Welcome to <b>BAT</b></h4>
      </template>

      <div class="con-form">
        <vs-input v-model="email" placeholder="Email">
          <template #icon> @ </template>
        </vs-input>
        <vs-input type="bio" v-model="value" placeholder="Bio">
          <template #icon>
            <i class="bx bx-user"></i>
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block> Save </vs-button>
        </div>
      </template>
    </vs-dialog>

    <h2>Top Recipes:</h2>
    <div class="recipe-grid">
      <RecipeCard
        v-for="recipe in userRecipes"
        :key="recipe.id"
        :rawRecipeData="recipe"
      />
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
    },
    uid() {
      return this.$store.state.user.uid
    },
  },
  data() {
    return {
      userRecipes: [],
      value: null,
      active: false,
      email: '',
      password: '',
      remember: false,
    }
  },
  async created() {
    this.userRecipes = await this.$getUserRecipes(this.uid)
  },
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
.user-interface {
  justify-content: center;
  align-items: center;
  text-align: center;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.vs-checkbox-label {
  font-size: 2rem;
}


h1 {
  font-size: 2rem;
  margin: 1rem;
}

h2 {
  font-size: 1rem;
  margin: 1rem;
}
</style>
