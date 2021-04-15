<template>
  <div class='format'>
    <h1>Create New Recipe</h1>
    <vs-button size='large' icon floating color='#1F1F1F' @click='pickFile'>
      <i class='bx bx-plus'></i> &nbsp; Add File
    </vs-button>
    <!--input for file-->
    <input
      type='file'
      style='display: none'
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
    <vs-button
      color='#1F1F1F'
      size='large'
      type='submit'
    >
      Upload
    </vs-button>
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
      image: null
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
        .then((data) => {
          alert('New recipe created!')
          this.$router.push('/')
        })
        .catch((err) => console.log(err))
    },
    pickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(e) {
      const file = e.target.files[0]
      const filename = file.name
      // console.log(file)

      const metadata = {
        contentType: 'image/jpeg'
      }

      const uploadTask = this.$fire.storage
        .ref('images/' + filename)
        .put(file, metadata)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
        },
        (error) => {
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.image = downloadURL
            console.log('File available at', downloadURL)
          })
        }
      )
    },
    getImageFromStorage() {
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
  height: 100vh;
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
  transform: scale(1);
}
</style>
