<template>
  <div class="footer-box dark">
    <form v-on:submit.prevent class="form">
      <fieldset>
        <input type="text"
               placeholder="Rhino File Url"
               id="file-url-field"
               v-model="fileUrl">
        <input class="button-primary" type="submit" value="Load" @click="handleReloadClick">
      </fieldset>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  props: [

  ],
  data () {
    return {
      fileUrl: 'https://files.mcneel.com/rhino3dm/models/RhinoLogo.3dm',
      // https://files.mcneel.com/rhino3dm/models/Cutters.3dm
    }
  },
  created () {
  },
  destroyed () {
  },
  async mounted () {

  },
  methods: {
    handleReloadClick () {
      this.$emit('reloadClick', this.fileUrl)
    }
  }
}

</script>

<style lang="scss" scoped>
.footer-box {
  display: flex;
  width: 100%;
  padding: 1.5rem;
  .form {
    width: 100%;
  }
  #file-url-field {
    width: 100%;
  }
}
</style>
