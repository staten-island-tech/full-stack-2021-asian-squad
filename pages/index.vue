<template>
  <div class="container">
    <div v-if="userData">
      <h1>Signed In as User: {{ userData.uname }}</h1>
      <vs-button color="#1F1F1F" @click="getData()"
        >Get recipes (Work-in-progress)</vs-button
      >
      <ul>
        <li v-for="recipe in recipes" :key="recipe.ingredients">
          {{ recipe }}
        </li>
      </ul>
    </div>
    <h1 v-else>Not Signed In</h1>
  </div>
</template>

<script>
export default {
  computed: {
    userData() {
      return this.$store.state.user.userData
    },
  },
  data() {
    return {
      recipes: [],
    }
  },
  methods: {
    getData: async function () {
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
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
