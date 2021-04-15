<template>
  <div class='format'>
    <h1>Create New Recipe</h1>
    <img id='recipeImage' src='#' alt='Select recipe image'>
    <!--input for file-->
    <div class='buttons'>
      <vs-button size='large' icon floating color='#1F1F1F' @click='pickFile'>
        <i class='bx bx-plus'></i> &nbsp; Add/Change Image
      </vs-button>
    </div>
    <input
      type='file'
      class='file-input'
      ref='fileInput'
      accept='image/*'
      @change='onFilePicked'
    />
    <form @submit.prevent='createRecipe'>
      <div class='inputs'>
        <div class='center content-inputs'>
          <vs-input label-placeholder='Recipe Name' v-model='name' />
        </div>
        <div class='center content-inputs'>
          <vs-input label-placeholder='Add Ingredients' v-model='ingredients' />
        </div>
        <div class='center content-inputs'>
          <vs-input
            label-placeholder='Add Instructions'
            v-model='instructions'
          />
        </div>
        <div class='center content-inputs'>
          <vs-input label-placeholder='Add Additional Tags' v-model='tags' />
        </div>
      </div>
    </form>
    <div class='buttons'>
      <vs-button
        color='#1F1F1F'
        size='large'
        type='submit'
      >
        Upload
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Create',
  middleware: 'authCheck',
  data() {
    return {
      name: undefined,
      ingredients: undefined,
      instructions: undefined,
      tags: undefined,
      image: undefined
    }
  },
  methods: {
    createRecipe() {
      this.$fire.firestore
        .collection('recipes')
        .add({
          name: this.name,
          ingredients: this.ingredients,
          instructions: this.instructions,
          tags: this.tags
        })
        .then(() => {
          alert('New recipe created!')
          this.$router.push('/')
        })
        .catch((error) =>
          this.$vs.notification({
            color: 'danger',
            title: 'Upload Failure',
            text: error
          }))
    },
    pickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(e) {
      const recipeImage = document.getElementById('recipeImage')
      const file = e.target.files[0]
      this.image = file

      const reader = new FileReader()
      reader.onload = (e) => {
        recipeImage.src = e.target.result
      }
      reader.readAsDataURL(file)

      this.$addImage(this.image)
        .then(url => console.log(url))
    }
  }
}
</script>

<style lang='scss' scoped>
#recipeImage {
  max-height: 30vh;
}

.format {
  text-align: center;
}

button {
  margin: 1rem auto;
}

.buttons {
  width: 100%;
}

h1 {
  font-size: 2rem;
  margin: 2rem;
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 40vh;
}

.content-inputs {
  transform: scale(1.25);
}

.file-input {
  display: none;
}
</style>
