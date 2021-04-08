<template>
  <div class="format">
    <h1>Create New Recipe</h1>
    <vs-button icon floating color="#1F1F1F" @click="pickFile">
      <i class="bx bx-plus"></i> &nbsp; Add File
    </vs-button>
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      accept="image/*"
      @change="onFilePicked"
    />
    <form @submit.prevent="createRecipe">
      <div class="inputs">
        <div class="center content-inputs">
          <vs-input label-placeholder="Recipe Name" v-model="name" />
        </div>

        <div class="center content-inputs">
          <vs-input label-placeholder="Add Ingredients" v-model="ingredients" />
        </div>

        <div class="center content-inputs">
          <vs-input
            label-placeholder="Add Instructions"
            v-model="instructions"
          />
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
  data() {
    return {
      name: undefined,
      ingredients: undefined,
      instructions: undefined,
      tags: undefined,
      image: null,
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
          tags: this.tags,
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
        contentType: 'image/jpeg',
      }

      const uploadTask = this.$fire.storage
        .ref('images/' + filename)
        .put(file, metadata)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          /* var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case this.$fire.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case this.$fire.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          } */
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.image = downloadURL
            console.log('File available at', downloadURL)
          })
        }
      )
    },
    getImageFromStorage() {},
  },
}
</script>

<style lang="scss" scoped>
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
  transform: scale(1);
}

.upload {
  display: flex;
  flex-direction: row;
  transform: scale(1.25);
}
</style>
