<template>
  <div class="create-content">
    <h1>Create New Recipe</h1>
    <!-- form for input -->
    <div class="input-container">
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
      <!-- name -->
      <vs-input label-placeholder="Recipe Name" v-model="name" />
      <!-- description -->
      <vs-input label-placeholder="Description" v-model="description" />
      <!-- prep time -->
      <vs-input
        type="number"
        label-placeholder="Prep Time (minutes)"
        v-model="prepTime"
      >
        <template v-if="prepTime < 1" #message-primary>
          Please input a positive number
        </template>
      </vs-input>
      <!-- difficulty -->
      <vs-select label-placeholder="Cooking Difficulty" v-model="difficulty">
        <vs-option label="Easy" value="1"> Easy</vs-option>
        <vs-option label="Intermediate" value="2"> Intermediate</vs-option>
        <vs-option label="Hard" value="3"> Hard</vs-option>
        <vs-option label="Gordon Ramsay" value="4"> Gordon Ramsay</vs-option>
      </vs-select>
      <!-- ingredient -->
      <vs-input
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
      <!-- instruction -->
      <vs-input
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
    </div>
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
        <template #header> Edit Item</template>
        <vs-input
          v-model="selArr[selIndex]"
          class="dialog-input"
          @keypress.enter="dialogCloseCheck(selArr, selIndex)"
        />
        <template #footer class="dialog-buttons">
          <div class="dialog-buttons">
            <vs-button @click="dialogCloseCheck(selArr, selIndex)"
              >Save
            </vs-button>
            <vs-button
              danger
              @click="selArr.splice(selIndex, 1), (editActive = false)"
              >Delete
            </vs-button>
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
      name: '',
      description: '',
      ingredient: '',
      ingredientsArr: [],
      instruction: '',
      instructionsArr: [],
      prepTime: undefined,
      difficulty: '',
      image: undefined,
      imageURL: undefined,
      editActive: false,
      selArr: '',
      selIndex: undefined,
    }
  },
  methods: {
    dialogCloseCheck(selArr, selIndex) {
      // delete if remaining selection is empty (not including whitespace)
      if (selArr[selIndex].trim() === '') selArr.splice(selIndex, 1)
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
    isDataValid() {
      // if data is valid, return true. Else, produce error and return false
      let error = 'Missing recipe '
      if (!this.name) {
        error += 'name'
      } else if (!this.description) {
        error += 'description'
      } else if (!this.prepTime) {
        error += 'preparation time'
      } else if (!this.difficulty) {
        error += 'difficulty'
      } else if (!this.image) {
        error += 'image'
      } else if (this.ingredientsArr.length < 1) {
        error += 'ingredients'
      } else if (this.instructionsArr.length < 1) {
        error += 'instructions'
      } else {
        return true
      }
      error += '!'
      this.$vs.notification({
        color: 'danger',
        title: 'Recipe Upload Error',
        text: error,
        position: 'top-center',
      })
    },
    createRecipe() {
      // prevent upload if invalid data
      if (!this.isDataValid()) return
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
        prepTime: parseInt(this.prepTime),
        difficulty: parseInt(this.difficulty),
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
            title: 'Recipe Upload Error',
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

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;

  > div {
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
