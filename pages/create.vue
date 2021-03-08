<template>
  <div class="format">
    <h1>Create New Recipe</h1>
    <vs-button circle icon floating>
      <i class="bx bx-plus"></i>
    </vs-button>

    <div class="inputs">
      <div class="center content-inputs">
        <vs-input label-placeholder="Recipe Name" v-model="value" />
      </div>

      <div class="center content-inputs">
        <vs-input label-placeholder="Add Ingredients" v-model="value" />
      </div>

      <div class="center content-inputs">
        <vs-input label-placeholder="Add Instructions" v-model="value" />
      </div>

      <div class="center content-inputs">
        <vs-input label-placeholder="Add Additional Tags" v-model="value" />
      </div>
    </div>

    <div class="upload">
      <vs-button
        color="#1F1F1F"
        size="large"
        class="flex-items"
        type="submit"
        :active="active == 0"
        @click="active = 0"
      >
        Preview
      </vs-button>
      <vs-button
        color="#1F1F1F"
        size="large"
        class="flex-items"
        type="submit"
        :active="active == 1"
        @click="active = 1"
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
}
</script>

<style lang='scss' scoped>
.format {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90vh;
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
</style>
