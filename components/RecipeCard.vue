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
      <vs-button @click='deleteRecipe' v-if='isDeletable' danger><i class='bx bx-trash'></i> &nbsp; Delete</vs-button>
    </template>
  </vs-card>
</template>

<script>
export default {
  props: ['rawRecipeData', 'isDeletable'],
  data() {
    return {
      recipeData: undefined,
      recipeLink: undefined,
      userLink: undefined
    }
  },
  created() {
    this.recipeData = this.rawRecipeData.data()
    // if (this.recipeData.ref) this.recipeLink = `/recipe/${this.recipeData.ref}`
    // else this.recipeLink = `/recipe/${this.rawRecipeData.id}`
    this.recipeLink = `/recipe/${this.rawRecipeData.id}`
    this.userLink = `/user/${this.recipeData.authorId}`
  },
  methods: {
    goToRecipe() {
      this.$router.push(this.recipeLink)
    },
    deleteRecipe() {
      if (!(confirm('Are you sure you want to delete?'))) return

      this.$deleteRecipe(this.rawRecipeData.id).then(() => {
        this.$router.go()
        this.$vs.notification({
          color: 'success',
          title: 'Recipe Deleted',
          text: 'Your recipe has been deleted.',
          position: 'top-center'
        })
      })
        .catch((error) => {
          this.$vs.notification({
            color: 'danger',
            title: 'Recipe Delete Error',
            text: error,
            position: 'top-center'
          })
        })
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
