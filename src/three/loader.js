import { THREE } from '@/three/three.js'

import meshData from '@/../data/mesh.json'

function GeometryFromExport () {
  let geometry = new THREE.Geometry()
  meshData.vertices
    .map(v => new THREE.Vector3(v.y, v.z, v.x))
    .map(v => geometry.vertices.push(v))
  meshData.faces
    .map(f => new THREE.Face3(f.a, f.b, f.c))
    .map(f => geometry.faces.push(f))
  geometry.computeFaceNormals()
  return geometry
}

export { GeometryFromExport }
