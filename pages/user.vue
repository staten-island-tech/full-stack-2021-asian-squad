<template>
  <div class="user-interface">
<!--    slug below -->
<!--    <nuxt-child />-->
    <!-- <vs-avatar circle>
      <img src="" alt="">
    </vs-avatar> -->
    <h1>Hello {{ userData.uname }}</h1>
    <h2>About Me:</h2>
    <vs-input
      class="input-container"
      v-model="value"
      placeholder="Brief About Me"
    />
    <h2>Top Recipes:</h2>
  </div>
</template>

<script>
import RecipeCard from '~/components/RecipeCard.vue'
export default {
  components: { RecipeCard },
  computed: {
    userData() {
      return this.$store.state.user.userData
    },
  },
  data() {
    return {
      recipes: [],
      value: null,
    }
  },
}
</script>

<style>
.user-interface {
  justify-content: center;
  align-items: center;
  text-align: center;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin: 1rem;
}

h2 {
  font-size: 1rem;
  margin: 1rem;
}
</style>
