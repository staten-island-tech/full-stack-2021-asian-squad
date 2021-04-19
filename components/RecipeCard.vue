<template>

<div class="outline">

  <div class="recipes4u">
    RECIPES JUST FOR YOU:
  </div>

    <img class="image" src="temp media\1537973085542.jpeg" alt="temporary">

      <h1> RECIPE NAME </h1>
      <div class="tags"> Yummy Delicious 10/10 </div>
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
.outline{
  display:flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  border-radius: 25px;
  border: 2px solid #000000;
  padding: 15px;
  width: 250px;
  height: 500px;
}
.recipes4u{
  font-weight: 400;
}

.image{
  border-radius: 25px;
  padding: 20px;
  width: 200px;
  height: 300px;
}

.tags{
  display: flex;
  flex-direction: row;
  padding:5px;
}
</style>