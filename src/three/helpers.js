import { THREE } from '@/three/three.js'
// import { Colors } from '@/three/colors.js'

export default {

  makeGrid (gridSize, cellSize, majorInterval, colorMajor, colorMinor, centered = true) {
    let offset = centered ? gridSize / 2 : 0

    var geometry = new THREE.Geometry()
    geometry.vertices.push(new THREE.Vector3(0 - offset, 0, 0))
    geometry.vertices.push(new THREE.Vector3(gridSize - offset, 0, 0))
    let matLineMajor = new THREE.LineBasicMaterial({ color: colorMajor })
    let matLineMinor = new THREE.LineBasicMaterial({ color: colorMinor })

    let group = new THREE.Group()
    let currentSize = 0

    for (let i = 0; currentSize <= gridSize; i++) {
      currentSize = i * cellSize
      let color = i % majorInterval === 0 ? matLineMajor : matLineMinor
      let line = new THREE.Line(geometry, color)

      line.position.y = currentSize - offset
      group.add(line)

      let line2 = new THREE.Line(geometry, color)
      line2.rotation.z = Math.PI / 2
      line2.position.x = currentSize - offset
      group.add(line2)
    }
    return group
  },
  // TODO: re-write
  // makeMesh (geometry) {
  //   let material = new THREE.MeshLambertMaterial({
  //     color: 0xffffff,
  //     side: THREE.DoubleSide,
  //     vertexColors: THREE.FaceColors,
  //   })
  //   // let material = new THREE.MeshNormalMaterial()
  //   material.opacity = 0.85
  //   material.flatSharing = true
  //   material.transparent = true
  //   const meshCube = new THREE.Mesh(geometry, material)
  //   return meshCube
  // },
  // makeCube (xUnits, yUnits, zUnits, trans, color) {
  //   const DENSITY = 50 // 500 len cube = 10 Cells
  //   let geometry = new THREE.BoxGeometry(
  //     xUnits, yUnits, zUnits,
  //     xUnits / DENSITY, yUnits / DENSITY, zUnits / DENSITY
  //   )
  //   if (trans) geometry.translate(trans.x, trans.y, trans.z)
  //   // geometry.faces = geometry.faces.filter(f => f.normal.y !== 1)
  //   let material = new THREE.MeshBasicMaterial({
  //     color: color,
  //     vertexColors: THREE.FaceColors,
  //     side: THREE.DoubleSide,
  //   })
  //   const meshCube = new THREE.Mesh(geometry, material)
  //   return meshCube
  // },
  // makeWireframe (geometry) {
  //   let wireGeometry = new THREE.WireframeGeometry(geometry)
  //   const lineMaterial = new THREE.LineBasicMaterial({ color: Colors.black, linewidth: 2 })
  //   var lineSegments = new THREE.LineSegments(wireGeometry, lineMaterial)
  //   lineSegments.material.opacity = 0.25
  //   lineSegments.material.transparent = true
  //   return lineSegments
  // },
  // makeMeshLine (geometry) {
  //   var meshLine = new MeshLine.MeshLine()
  //   meshLine.setGeometry(geometry, (p) => 5)
  //   var meshMat = new MeshLine.MeshLineMaterial({ color: Colors.airbnb })
  //   var mesh = new THREE.Mesh(meshLine.geometry, meshMat)
  //   return mesh
  // },
  // makeEdge (geometry) {
  //   const edgesGeometry = new THREE.EdgesGeometry(geometry, 1)
  //   const lineMaterial = new THREE.LineBasicMaterial({ color: 0x666666 })
  //   const edges = new THREE.LineSegments(edgesGeometry, lineMaterial)
  //   return edges
  // },
  // makePlane (width, length, trans) {
  //   let geometry = new THREE.PlaneGeometry(width, length, 1)
  //   if (trans) geometry.translate(trans.x, trans.y, trans.z)
  //   let planeMesh = new THREE.Mesh(geometry, Materials.white)
  //   return planeMesh
  // },
  // pointsFromFace (face, vertices) {
  //   return [
  //     vertices[face.a],
  //     vertices[face.b],
  //     vertices[face.c],
  //   ]
  // },
  // getCentroid (...points) {
  //   return new THREE.Vector3(
  //     points.map(p => p.x).reduce((a, b) => a + b) / points.length,
  //     points.map(p => p.y).reduce((a, b) => a + b) / points.length,
  //     points.map(p => p.z).reduce((a, b) => a + b) / points.length,
  //   )
  // },
}
