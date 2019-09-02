import { THREE } from '@/three/three'

export default function (rhinoObject) {
  const rhinoObjTypeName = rhinoObject.constructor.name
  let encoderFunc = encoders[rhinoObjTypeName]
  if (!encoderFunc) {
    console.warn(`no three js encoder for ${rhinoObjTypeName}`)
    return null
  }
  return encoderFunc(rhinoObject)
}

const materials = {
  line: new THREE.LineBasicMaterial({ color: 0x000000 }),
  wire: new THREE.LineBasicMaterial({ color: 0x000000 }),
  mesh: new THREE.MeshPhongMaterial({ color: 0xffffff }),
  // mesh: new THREE.MeshBasicMaterial({color: 0xe0e0e0}),
}

const encoders = {
  'LineCurve': (rhinoLineCurve) => {
    const pt1 = rhinoLineCurve.pointAtStart
    const pt2 = rhinoLineCurve.pointAtEnd
    const geometry = new THREE.Geometry()
    geometry.vertices.push(new THREE.Vector3(...pt1))
    geometry.vertices.push(new THREE.Vector3(...pt2))
    return new THREE.Line(geometry, materials.line)
  },
  'NurbsCurve': (rhinoCurve) => {
    const geometry = new THREE.Geometry()
    const domain = rhinoCurve.domain
    const start = domain[0]
    const range = domain[1] - domain[0]
    var interval = range / 50.0
    for (var i = 0; i < 51; i++) {
      let t = start + i * interval
      let pt = rhinoCurve.pointAt(t)
      geometry.vertices.push(new THREE.Vector3(pt[0], pt[1], pt[2]))
    }
    return new THREE.Line(geometry, materials.wire)
  },
  'Mesh': (rhinoMesh) => {
    const geometry = new THREE.BufferGeometry()
    const vertices = rhinoMesh.vertices()
    const faces = rhinoMesh.faces()
    const normals = rhinoMesh.normals()

    var vertexbuffer = new Float32Array(3 * vertices.count)
    for (let i = 0; i < vertices.count; i++) {
      let pt = vertices.get(i)
      vertexbuffer[i * 3] = pt[0]
      vertexbuffer[i * 3 + 1] = pt[1]
      vertexbuffer[i * 3 + 2] = pt[2]
    }
    geometry.addAttribute('position', new THREE.BufferAttribute(vertexbuffer, 3))
    const indices = []

    for (let i = 0; i < faces.count; i++) {
      const face = faces.get(i)
      indices.push(face[0], face[1], face[2])
      if (face[2] !== face[3]) {
        indices.push(face[2], face[3], face[0])
      }
    }
    geometry.setIndex(indices)

    var normalBuffer = new Float32Array(3 * normals.count)
    for (let i = 0; i < normals.count; i++) {
      const pt = normals.get(i)
      normalBuffer[i * 3] = pt[0]
      normalBuffer[i * 3 + 1] = pt[1]
      normalBuffer[i * 3 + 2] = pt[1]
    }
    geometry.addAttribute('normal', new THREE.BufferAttribute(normalBuffer, 3))
    return new THREE.Mesh(geometry, materials.mesh)
  }
}
