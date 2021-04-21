<template>
  <div class="outline">
    <div class="recipes4u">RECIPES JUST FOR YOU:</div>
    <img class="image" src="./temp/testImage.jpeg" alt="temporary" />
    <h1>Test Name</h1>
    <div class="tags">Yummy Delicious 10/10</div>
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
.outline {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  border-radius: 25px;
  border: 2px solid #000000;
  padding: 15px;
  width: 250px;
  height: 450px;
}
.recipes4u {
  font-size: 1.4vh;
  font-weight: 400;
}

.image {
  object-fit: cover;
  border-radius: 25px;
  padding: 15px;
  width: 250px;
  height: 350px;
}

.tags {
  display: flex;
  flex-direction: row;
  padding: 5px;
}
</style>