<template>
  <div id="three-container"></div>
</template>

<script>
import Environment from '@/three/environment'
import helper from '@/three/helpers'
import { Colors } from '@/three/colors'
import RhinoService from '@/rhinoService'
import threeEncoder from '@/encoders'
// import { THREE } from '@/three/three'

export default {
  name: 'Scene',
  data () {
    return {
      rhinoService: null
    }
  },
  created () {
    document.addEventListener('mousedown', this.handleObjectClick, false)
  },
  destroyed () {
    document.removeEventListener('mousedown', this.handleObjectClick)
  },
  async mounted () {
    const sceneSize = 500
    let options = { grid: false, background: Colors.white, sceneSize: sceneSize }
    this.environment = new Environment(options)
    const grid = helper.makeGrid(2000, 10, 5, Colors.darkGray, Colors.lightGray)
    this.environment.scene.add(grid)

    this.rhinoService = new RhinoService()
    await this.rhinoService.init()
    this.loadModel()
  },
  methods: {
    async loadModel () {
      let doc = await this.rhinoService.loadFileFromUrl('https://files.mcneel.com/rhino3dm/models/RhinoLogo.3dm')
      // let model = await this.rhinoService.loadFileFromUrl('https://files.mcneel.com/rhino3dm/models/Cutters.3dm')
      doc.objects.forEach(async o => {
        let rhinoObjects = await o.toRenderable()
        let threeObjects = rhinoObjects.map(o => threeEncoder(o)).filter(o => o !== null)
        this.environment.scene.add(...threeObjects)
      })
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

#three-container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  position: absolute;
}

</style>
