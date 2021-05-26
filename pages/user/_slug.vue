<template>
  <UserProfile :user-id='uid' />
</template>

<script>
import UserProfile from '~/components/userProfile'

export default {
  components: { UserProfile },
  data() {
    return {
      uid: '',
    }
  },
  created() {
    this.uid = this.$route.params.slug
  }
}
</script>

<style lang='scss' scoped>
.profileImage {
  height: 50px;
  width: auto;
  margin-right: 10px;
  border-radius: 100%;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 2rem;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.vs-checkbox-label {
  font-size: 2rem;
}

.settings {
  transform: scale(1.3);
  position: fixed;
  left: 2.5rem;
  bottom: 2rem;
}
</style>
