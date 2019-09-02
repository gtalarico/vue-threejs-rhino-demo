<template>
  <div id="loader" :class="{loading: isLoading}">
    <div class="lds-dual-ring"></div>
    <p>{{ statusMessage }}</p>
  </div>
</template>

<script>

export default {
  name: 'Loader',
  props: [
    'isLoading',
    'statusMessage'
  ],
  data () {
    return {
    }
  },
}

</script>

<style lang="scss" scoped>
#loader {
  z-index: 5;
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  &:not(.loading) {
    display: none;
  }
}
</style>
