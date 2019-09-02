<template>
  <div id="app">
    <Loader v-bind="{isLoading, statusMessage}"/>
    <Scene v-bind="{fileUrl}" @emitMessage="handleMessageEvent" @isLoading="handleLoadingEvent"/>
    <Footer id="footer" v-bind="{statusMessage}" @reloadClick="handleReloadClick"/>
  </div>
</template>

<script>
import Scene from './components/Scene.vue'
import Footer from './components/Footer.vue'
import Loader from './components/Loader.vue'

export default {
  name: 'app',
  components: {
    Scene,
    Footer,
    Loader,
  },
  data  () {
    return {
      isLoading: false,
      statusMessage: '',
      fileUrl: '',
    }
  },
  methods: {
    handleReloadClick (fileUrl) {
      this.fileUrl = fileUrl
    },
    handleLoadingEvent (bool) {
      this.isLoading = bool
    },
    handleMessageEvent (msg) {
      this.statusMessage = msg
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';

#app {
 display: flex;
 flex-direction: column;
 width: 100%;
 height: 100vh;
}

#three-container {
  margin: 0;
  padding: 0;
  width: 100%;
  flex:5;
  max-height: 90%;
}

#footer {
  background-color: #333;
  // width: 100%;
  height: 10%;
}
</style>
