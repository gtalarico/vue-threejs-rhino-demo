import { THREE } from '@/three/three'
import { Colors } from '@/three/colors'

export default function Environment (options) {
  window.addEventListener('resize', this.handleResize.bind(this), false)

  const defaultOptions = {
    background: Colors.offWhite,
    sceneSize: 500,
    axis: true,
    axisSize: 100,
  }
  const envOptions = Object.assign(defaultOptions, options)

  this.container = document.getElementById('three-container')
  let canvasWidth = this.container.offsetWidth
  let canvasHeight = this.container.offsetHeight

  this.renderer = new THREE.WebGLRenderer({ antialias: true })
  this.renderer.setPixelRatio(window.devicePixelRatio)
  this.renderer.setSize(canvasWidth, canvasHeight)
  this.container.appendChild(this.renderer.domElement)

  const cameraDistance = envOptions.sceneSize * 1
  this.camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, envOptions.sceneSize * 10)
  this.camera.position.set(cameraDistance, cameraDistance, cameraDistance / 2)
  this.camera.up.set(0, 0, 1)
  this.camera.lookAt(new THREE.Vector3(0, 0, 0))

  this.controls = new THREE.OrbitControls(this.camera, this.container)
  this.controls.enableDamping = true
  this.controls.dampingFactor = 0.3
  this.controls.minDistance = envOptions.sceneSize / 5
  this.controls.maxDistance = envOptions.sceneSize

  this.raycaster = new THREE.Raycaster()
  this.mouse = new THREE.Vector2()
  this.raycaster.setFromCamera(this.mouse, this.camera)

  this.scene = new THREE.Scene()
  this.scene.background = envOptions.background
  this.scene.fog = new THREE.Fog(envOptions.background, 1, envOptions.sceneSize * 5)

  // Temporary - Generic Light
  let light = new THREE.DirectionalLight(0xffffff)
  light.position.set(0, 0, 1)
  this.scene.add(light)
  var light2 = new THREE.DirectionalLight(0xaaaaaa)
  light2.position.set(-1, -1, 0)
  this.scene.add(light2)

  if (envOptions.axis) {
    this.scene.add(new THREE.AxesHelper(envOptions.axisSize))
  }

  // Setup flag native scene objects so we can keep them when wiping scene
  this.scene.children.map(o => {
    o.userData.isEnvironment = true
  })
  this.renderForever()
}

Environment.prototype.renderForever = function () {
  requestAnimationFrame(this.renderForever.bind(this))
  this.controls.update()
  this.renderer.render(this.scene, this.camera)
}

Environment.prototype.handleResize = function () {
  const canvasWidth = this.container.offsetWidth
  const canvasHeight = this.container.offsetHeight
  this.camera.aspect = canvasWidth / canvasHeight
  this.camera.updateProjectionMatrix()
  this.renderer.setSize(canvasWidth, canvasHeight)
}

Environment.prototype.tearDownScene = function () {
  window.removeEventListener('resize', this.handleResize)
}
