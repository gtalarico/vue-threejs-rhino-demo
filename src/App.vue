<template>
  <div id="app">
    <Scene msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Scene from './components/Scene.vue'

export default {
  name: 'app',
  components: {
    Scene
  },
  created () {

  }
}
</script>

<style>
@import './assets/scss/main.scss'
</style>
