<template>
  <div class='userContainer'>
    <div class='hero'>
      <img
        class='profileImage'
        v-if='userData.uimg'
        :src='userData.uimg'
        alt=''
      />
      <img
        class='profileImage'
        v-else
        src='@/assets/noProfilePic.png'
        alt=''
      />
      <h1>{{ userData.uname }}</h1>
      <h2 v-if='userData.udisc'>{{ userData.udisc }}</h2>
    </div>
<!--    <vs-button v-if='isCurrentUser' dark circle class='settings' @click='active = !active'>-->
<!--      <i class='bx bx-cog'></i> &nbsp;-->
<!--      User Settings-->
<!--    </vs-button>-->
    <div class='separator'>
      <hr>
    </div>
    <div class='recipe-grid'>
      <RecipeCard
        v-for='recipe in userRecipes'
        :key='recipe.id'
        :rawRecipeData='recipe'
        :is-deletable='isCurrentUser'
      />
    </div>
    <vs-dialog v-model='active'>
      <template #header>
        <h4 class='not-margin'>Welcome to <b>BAT</b></h4>
      </template>

      <div class='con-form'>
        <vs-input v-model='email' placeholder='Email'>
          <template #icon> @</template>
        </vs-input>
        <vs-input type='bio' v-model='value' placeholder='Bio'>
          <template #icon>
            <i class='bx bx-user'></i>
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class='footer-dialog'>
          <vs-button block>Save</vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import RecipeCard from '~/components/RecipeCard.vue'

export default {
  components: { RecipeCard },
  props: ['userId'],
  data() {
    return {
      userRecipes: [],
      userData: '',
      isCurrentUser: false,
      value: null,
      active: false,
      email: '',
      password: '',
      remember: false
    }
  },
  async created() {
    if (this.userId === this.$store.state.user.uid) {
      this.isCurrentUser = true
    }
    this.userData = await this.$getUser(this.userId, false)
    this.userRecipes = await this.$getUserRecipes(this.userId)
  }
}
</script>

<style lang='scss' scoped>
.hero {
  padding: 2rem 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

.separator {
  padding: 3rem;
}

.profileImage {
  height: 75px;
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
  margin: 1.5rem auto 0;
}
</style>
