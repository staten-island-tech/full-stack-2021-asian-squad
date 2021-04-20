<template>
  <div class="create-content">
    <h1>Create New Recipe</h1>
    <!--input for file-->
    <vs-button
      class="main-buttons"
      floating
      size="large"
      dark
      @click="pickFile"
    >
      <i class="bx bx-plus"></i> &nbsp; Add/Change Image
    </vs-button>
    <input
      type="file"
      class="file-input"
      ref="fileInput"
      accept="image/*"
      @change="onFilePicked"
    />
    <!-- form for input -->
    <form @submit.prevent>
      <vs-input class="inputs" label-placeholder="Recipe Name" v-model="name" />
      <vs-input
        class="inputs"
        label-placeholder="Description"
        v-model="description"
      />
      <vs-input
        class="inputs"
        icon-after
        @click-icon="addIngredient"
        @keypress.enter="addIngredient"
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
      <vs-input
        class="inputs"
        icon-after
        @click-icon="addInstruction"
        @keypress.enter="addInstruction"
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
      <vs-input class="inputs" label-placeholder="Add Tag" v-model="tags" />
    </form>
    <!-- preview pane shows when data exists -->
    <div
      v-if="
        ingredientsArr.length > 0 ||
        instructionsArr.length > 0 ||
        image != undefined
      "
      class="preview"
    >
      <h2>Preview</h2>
      <!-- image preview -->
      <img id="recipeImage" v-if="image" :src="imageURL" alt="Recipe Image" />
      <!-- ingredient/instruction preview -->
      <div class="preview-lists">
        <div v-if="ingredientsArr.length > 0" id="ingredients-list">
          <h3>Ingredients</h3>
          <ul>
            <li
              v-for="(ingredient, i) in ingredientsArr"
              :key="i"
              @click="
                ;(editActive = true), (selArr = ingredientsArr), (selIndex = i)
              "
            >
              {{ ingredient }}
            </li>
          </ul>
        </div>
        <div v-if="instructionsArr.length > 0" id="instructions-list">
          <h3>Instructions</h3>
          <ol>
            <li
              v-for="(instruction, i) in instructionsArr"
              :key="i"
              @click="
                ;(editActive = true), (selArr = instructionsArr), (selIndex = i)
              "
            >
              {{ instruction }}
            </li>
          </ol>
        </div>
      </div>
      <!-- editing dialog -->
      <vs-dialog
        class="dialogs"
        v-model="editActive"
        @close="dialogCloseCheck(selArr, selIndex)"
      >
        <template #header> Edit Item </template>
        <vs-input
          v-model="selArr[selIndex]"
          class="dialog-input"
          @keypress.enter="dialogCloseCheck(selArr, selIndex)"
        />
        <template #footer class="dialog-buttons">
          <div class="dialog-buttons">
            <vs-button @click="dialogCloseCheck(selArr, selIndex)"
              >Save</vs-button
            >
            <vs-button
              danger
              @click="selArr.splice(selIndex, 1), (editActive = false)"
              >Delete</vs-button
            >
          </div>
        </template>
      </vs-dialog>
    </div>
    <!-- upload/submit button -->
    <vs-button
      dark
      class="main-buttons"
      floating
      size="large"
      type="submit"
      @click="createRecipe"
      >Upload
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
      description: undefined,
      ingredient: '',
      ingredientsArr: [],
      instruction: '',
      instructionsArr: [],
      prepTime: undefined,
      difficulty: undefined,
      image: undefined,
      imageURL: undefined,
      editActive: false,
      selArr: '',
      selIndex: undefined,
    }
  },
  methods: {
    dialogCloseCheck(selArr, selIndex) {
      if (selArr[selIndex] === '') selArr.splice(selIndex, 1)
      this.editActive = false
    },
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
        desc: this.description,
        ingredients: this.ingredientsArr,
        instructions: this.instructionsArr,
        prepTime: this.prepTime,
        difficulty: this.difficulty,
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
            position: 'top-center',
          })
        })
        .catch((error) => {
          this.$vs.notification({
            color: 'danger',
            title: 'Recipe Error',
            text: error,
            position: 'top-center',
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
      const file = e.target.files[0]
      this.imageURL = URL.createObjectURL(file)
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

.file-input {
  display: none;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  .inputs {
    transform: scale(1.25);
    margin: 1.5rem;
  }
}

.preview-lists {
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    margin: 1rem 0 0 0;
    text-align: center;
  }
  li {
    padding: 8px;
    cursor: pointer;
  }
  li:hover {
    text-decoration: underline;
  }
  * {
    text-align: left;
    vertical-align: middle;
  }
}

.dialog-input {
  position: absolute;
}

.dialog-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
