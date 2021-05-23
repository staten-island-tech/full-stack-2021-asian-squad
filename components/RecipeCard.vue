<template>
  <vs-card>
    <template #title>
      <h2 @click='goToRecipe'>{{ recipeData.name }}</h2>
    </template>
    <template #text>
      <p @click='goToRecipe'>{{ recipeData.desc }}</p>
    </template>
    <template #img>
      <img
        @click='goToRecipe'
        class='recipeImage'
        :src='recipeData.imgUrl'
        alt=''
      />
    </template>
    <template #interactions>
      <vs-button
        class='interaction'
        dark
        v-if='recipeData.author'
        :to='userLink'
      >
        <!-- testing -->
        <img
          class='profileImage'
          v-if='recipeData.author.uimg'
          :src='recipeData.author.uimg'
          alt=''
        />
        <img
          class='profileImage'
          v-else
          src='@/assets/noProfilePic.png'
          alt=''
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
      userLink: undefined
    }
  },
  created() {
    this.recipeData = this.rawRecipeData.data()
    // console.log(this.recipeData.ref);
    if (this.recipeData.ref) this.recipeLink = `/recipe/${this.recipeData.ref}`
    else this.recipeLink = `/recipe/${this.rawRecipeData.id}`
    this.userLink = `/user/${this.recipeData.authorId}`
  },
  methods: {
    goToRecipe() {
      this.$router.push(this.recipeLink)
    },
    goToUser() {
      this.$router.push(this.userLink)
    }
  }
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

.interaction {
  z-index: 100;
}
</style>
