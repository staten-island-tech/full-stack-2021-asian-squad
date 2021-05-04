<template>
  <div class="outline">
    <!-- <vs-button
      size="large"
      icon
      floating
      color="#1F1F1F"
      @click="getData"
    ></vs-button> -->
    <div class="recipes4u">RECIPES JUST FOR YOU:</div>
    <img class="image" src="./temp/testImage.jpeg" alt="temporary" />
    <h1>{{recipes.name}}</h1>
    <div class="tags">{{recipes.ingredients}}</div>
    <NuxtLink to="recipes.slug">Slug Link</NuxtLink>
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
  created () {
    this.$fire.firestore.collection('recipes').get().then((querySnapshot) => querySnapshot.forEach((doc) => {
        this.recipes = doc.data()
        })
     )},
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
  height: 500px;
}
.recipes4u {
  font-weight: 400;
}

.image {
  object-fit: cover;
  border-radius: 25px;
  padding: 20px;
  width: 200px;
  height: 300px;
}

.tags {
  display: flex;
  flex-direction: row;
  padding: 5px;
}
</style>
