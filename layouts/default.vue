<template>
  <div class='master-container'>
    <div class='bg'></div>
    <div class='bg2'></div>
    <Navbar />
    <div class='nuxt-container'>
      <Nuxt />
    </div>
    <CreateButton v-if='$route.name!=="login" && $route.name!=="signup"' class='create-button' />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import CreateButton from '@/components/CreateButton'

export default {
  components: {
    Navbar,
    CreateButton
  },
}
</script>

<style>
* {
  font-family: 'Poppins', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, 'Helvetica Neue', Arial, sans-serif !important;
}

html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.bg {
  position: fixed;
  z-index: -1;
  background-size: cover;
  background-color: #f5a6a6;
  clip-path: polygon(0 70%, 100% 30%, 100% 100%, 0% 100%);
  height: 100vh;
  width: 100vw;
}

.bg2 {
  position: fixed;
  z-index: -2;
  background-size: cover;
  background-color: #fff7f7;
  height: 100vh;
  width: 100vw;
}

.nuxt-container > * {
  padding: 6vh 3vw;
}

.create-button {
  position: fixed;
  right: 2.5rem;
  bottom: 2rem;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
</style>
