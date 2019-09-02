<template>
  <div id="three-container"></div>
</template>

<script>
import Environment from '@/three/environment'
import { Colors } from '@/three/colors'
import threeEncoder from '@/three/encoders'
import RhinoService from '@/rhinoService'

export default {
  name: 'Scene',
  props: [
    'fileUrl'
  ],
  data () {
    return {
      rhinoService: null
    }
  },
  watch: {
    fileUrl (fileUrl) {
      this.loadModel(fileUrl)
    }
  },
  created () {
    this.$emit('isLoading', true)
    document.addEventListener('mousedown', this.handleObjectClick, false)
  },
  destroyed () {
    document.removeEventListener('mousedown', this.handleObjectClick)
  },
  async mounted () {
    const sceneSize = 500
    let options = {
      background: Colors.white,
      sceneSize: sceneSize,
      grid: {
        show: true,
        size: 2000,
        cellSize: 10,
        major: 5,
      }
    }
    this.environment = new Environment(options)

    this.$emit('emitMessage', 'Loading Rhino Depedencies')
    this.rhinoService = new RhinoService()
    await this.rhinoService.init()
    this.$emit('isLoading', false)
  },
  methods: {
    async loadModel (fileUrl) {
      this.environment.clear()
      this.$emit('isLoading', true)
      this.$emit('emitMessage', 'Loading Model')
      let doc
      try {
        doc = await this.rhinoService.loadFileFromUrl(fileUrl)
      } catch (e) {
        this.$emit('emitMessage', 'Request Failed')
        setTimeout(() => { this.$emit('isLoading', false) }, 1000)
        return
      }

      this.$emit('emitMessage', 'Encoding Objects')
      for (let obj of doc.objects) {
        let rhinoObjects
        try {
          rhinoObjects = await obj.toRenderable()
        } catch (e) {
          this.$emit('emitMessage', 'Compute Request Failed')
          setTimeout(() => { this.$emit('isLoading', false) }, 1000)
          return
        }

        let threeObjects = rhinoObjects
          .filter(o => o !== null) // Filter objects with no renderable rep
          .map(o => threeEncoder(o))
          .filter(o => o !== null) // Filter objects with no three js encoder
        this.environment.scene.add(...threeObjects)
      }
      this.$emit('isLoading', false)
    },
    handleObjectClick () {
    //   let intersects = this.environment.raycaster
    //     .intersectObjects(this.environment.scene.children)
    //   console.log(intersects)
    }
  }
}

</script>

<style scoped>

</style>
