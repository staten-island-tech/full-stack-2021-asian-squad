<template>
  <div class="outline">
    <img class="image" :src="recipeData.imgUrl" alt="temporary" />
      <h1>{{ recipeData.name }}</h1>
    <div class="tags">{{ recipeData.desc }}</div>
  </div>
</template>

<script>
export default {
  props: [
    'recipeData'
  ],
  data() {
    return {
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
  background-color: rgba(255, 255, 255, 0.20);
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
