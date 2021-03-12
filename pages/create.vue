<template>
  <div class="format">
    <h1>Create New Recipe</h1>
    <vs-button circle icon floating
    color='#1F1F1F'>
      <i class="bx bx-plus"></i>
    </vs-button>

    <form @submit.prevent="createRecipe">
    <div class="inputs">
      <div class="center content-inputs">
        <vs-input label-placeholder="Recipe Name" v-model="name" />
      </div>

      <div class="center content-inputs">
        <vs-input label-placeholder="Add Ingredients" v-model="ingredients" />
      </div>

      <div class="center content-inputs">
        <vs-input label-placeholder="Add Instructions" v-model="instructions" />
      </div>

      <div class="center content-inputs">
        <vs-input label-placeholder="Add Additional Tags" v-model="tags" />
      </div>
    </div>

    <div class="upload">
      <vs-button
        color="#1F1F1F"
        size="large"
        class="flex-items"
        type="submit"
      >
        Preview
      </vs-button>
      <vs-button
        color="#1F1F1F"
        size="large"
        class="flex-items"
        type="submit"
      >
        Upload
      </vs-button>
    </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Create',
  middleware: 'authCheck',
  data(){
    return{
      name: undefined,
      ingredients: undefined,
      instructions: undefined,
      tags: undefined
    }
  },
  methods: {
    createRecipe () {
      this.$fire.firestore.collection('recipes').add({
        name: this.name,
        ingredients: this.ingredients,
        instructions: this.instructions,
        tags: this.tags
      }).then(console.log("uploaded")).catch(err => console.log(err))
    }
  }
}
</script>

<style lang='scss' scoped>
.format {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 93vh;
}

h1 {
  font-size: 2rem;
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 40vh;
}

.upload{
  display:flex;
  flex-direction: row;
  transform: scale(1.25);
}
</style>
