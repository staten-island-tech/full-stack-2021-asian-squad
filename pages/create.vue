<template>
  <div class="create-content">
    <h1>Create New Recipe</h1>
    <img id="recipeImage" src="#" alt="(Select recipe image)" />
    <!--input for file-->
    <div class="buttons">
      <vs-button
        class="main-buttons"
        floating
        size="large"
        color="#1F1F1F"
        @click="pickFile"
      >
        <i class="bx bx-plus"></i> &nbsp; Add/Change Image
      </vs-button>
    </div>
    <input
      type="file"
      class="file-input"
      ref="fileInput"
      accept="image/*"
      @change="onFilePicked"
    />
    <div class="tables">
      <vs-table v-if="ingredientsArr.length > 0" id="ingredients-list">
        <template #thead>
          <vs-tr>
            <vs-th>Ingredients List</vs-th>
            <vs-th>Edit</vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr v-for="(ingredient, i) in ingredientsArr" :key="i">
            <vs-td>{{ ingredient }}</vs-td>
            <vs-td>
              <vs-button icon transparent class="list-buttons" color="#1F1F1F">
                <i class="bx bx-pencil"></i>
              </vs-button>
              <vs-button icon transparent class="list-buttons" color="#1F1F1F">
                <i class="bx bx-x"></i>
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <vs-table v-if="instructionsArr.length > 0" id="instructions-list">
        <template #thead>
          <vs-th>#</vs-th>
          <vs-th>Instructions</vs-th>
          <vs-th>Edit</vs-th>
        </template>
        <template #tbody>
          <vs-tr v-for="(instruction, i) in instructionsArr" :key="i">
            <vs-td>{{ i + 1 }}</vs-td>
            <vs-td>{{ instruction }}</vs-td>
            <vs-td>
              <vs-button icon transparent class="list-buttons" color="#1F1F1F">
                <i class="bx bx-pencil"></i>
              </vs-button>
              <vs-button icon transparent class="list-buttons" color="#1F1F1F">
                <i class="bx bx-x"></i>
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <!-- form for input -->
    <form @submit.prevent>
      <div class="inputs">
        <vs-input label-placeholder="Recipe Name" v-model="name" />
      </div>
      <div class="inputs">
        <vs-input
          icon-after
          @click-icon="addIngredient"
          label-placeholder="Add Ingredients"
          v-model="ingredient"
        >
          <template #icon>
            <i class="bx bx-plus"></i>
          </template>
          <template v-if="ingredient !== ''" #message-primary>
            Click on <i class="bx bx-plus"></i> to add ingredient
          </template>
        </vs-input>
      </div>
      <div class="inputs">
        <vs-input
          icon-after
          @click-icon="addInstruction"
          label-placeholder="Add Instructions"
          v-model="instruction"
        >
          <template #icon>
            <i class="bx bx-plus"></i>
          </template>
          <template v-if="instruction !== ''" #message-primary>
            Click on <i class="bx bx-plus"></i> to add instruction
          </template>
        </vs-input>
      </div>
      <div class="inputs">
        <vs-input label-placeholder="Add Tag"> </vs-input>
      </div>
      <vs-button
        color="#1F1F1F"
        class="main-buttons"
        floating
        size="large"
        type="submit"
        @click="createRecipe"
        >Upload
      </vs-button>
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
      ingredient: '',
      ingredientsArr: [],
      instruction: '',
      instructionsArr: [],
      tags: [],
      image: undefined,
    }
  },
  methods: {
    addIngredient() {
      // do nothing if empty
      if (!this.ingredient) return
      // push current ingredient onto list
      this.ingredientsArr.push(this.ingredient)
      // reset ingredient on the textbox
      this.ingredient = ''
    },
    addInstruction() {
      // do nothing if empty
      if (!this.instruction) return
      // push current ingredient onto list
      this.instructionsArr.push(this.instruction)
      // reset ingredient on the textbox
      this.instruction = ''
    },
    createRecipe() {
      // open loading
      const loading = this.$vs.loading({
        text: 'Uploading Recipe...',
        color: 'dark',
      })
      const recipeData = {
        name: this.name,
        ingredients: this.ingredientsArr,
        instructions: this.instructionsArr,
        tags: this.tags,
        image: this.image,
      }
      // use helper function
      this.$addRecipe(recipeData)
        .then(() => {
          this.$router.push('/')
          this.$vs.notification({
            color: 'success',
            title: 'Recipe Created!',
            text: 'Your recipe has been created!',
          })
        })
        .catch((error) => {
          this.$vs.notification({
            color: 'danger',
            title: 'Recipe Error',
            text: error,
          })
        })
      loading.close()
    },
    pickFile() {
      // activates hidden file input from vs-button
      this.$refs.fileInput.click()
    },
    onFilePicked(e) {
      // allow for live image previewing on UI
      const recipeImage = document.getElementById('recipeImage')
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        recipeImage.src = e.target.result
      }
      reader.readAsDataURL(file)
      // update vue data object
      this.image = file
    },
  },
}
</script>

<style lang='scss' scoped>
#recipeImage {
  max-height: 30vh;
}

.create-content {
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin: 2rem;
}

.main-buttons {
  margin: 1rem auto;
}

.tables {
  margin: 0 auto;
  width: 65%;
}

.list-buttons {
  margin: 0;
  display: inline-block;
}

td {
  padding: 0;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  .inputs {
    transform: scale(1.25);
    margin: 2rem;
  }
}

.file-input {
  display: none;
}
</style>
