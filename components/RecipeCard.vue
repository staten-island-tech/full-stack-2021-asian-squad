<template>
  <vs-card @click="goToRecipe">
    <template #title>
      <h2>{{ recipeData.name }}</h2>
    </template>
    <template #img>
      <img class="recipeImage" :src="recipeData.imgUrl" alt="" />
    </template>
    <template #text>
      <p>{{ recipeData.desc }}</p>
    </template>
    <template #interactions>
      <vs-button dark v-if="recipeData.author">
        <!-- testing -->
        <img
          class="profileImage"
          v-if="recipeData.author.uimg"
          :src="recipeData.author.uimg"
          alt=""
        />
        <img
          class="profileImage"
          v-else
          src="@/assets/noProfilePic.png"
          alt=""
        />
        {{ recipeData.author.uname }}
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
export default {
  props: ['rawRecipeData'],
  data() {
    return {
      recipeData: undefined,
      recipeLink: undefined,
    }
  },
  created() {
    this.recipeData = this.rawRecipeData.data()
    this.recipeLink = `/recipe/${this.rawRecipeData.id}`
  },
  methods: {
    goToRecipe() {
      this.$router.push(this.recipeLink)
    },
  },
}
</script>

<style lang='scss' scoped>
.recipeImage {
  object-fit: cover;
  height: 300px;
}

.profileImage {
  height: 20px;
  width: auto;
  margin-right: 10px;
  border-radius: 100%;
}
</style>
