<template>
  <div>TESTING</div>
</template>

<script>
export default {
  computed: {
    userData() {
      return this.$store.state.user.userData
    },
  },
  data() {
    return {
      recipes: [],
    }
  },
  methods: {
    getData: async function () {
      const ref = this.$fire.firestore.collection('recipes')
      let querySnapshot
      try {
        querySnapshot = await ref.get()
        this.recipes = []
        querySnapshot.forEach((doc) => {
          this.recipes.push(doc.data())
        })
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>