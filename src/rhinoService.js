import axios from 'axios'

export default function RhinoService () {
  this.token = this.getToken()
}

RhinoService.prototype.init = function () {
  return new Promise((resolve, reject) => {
    const scripts = [
      'https://files.mcneel.com/rhino3dm/js/latest/rhino3dm.js',
      'https://files.mcneel.com/rhino3dm/js/latest/compute.rhino3d.js',
    ]
    let loaded = 0

    for (let url of scripts) {
      let script = document.createElement('script')
      script.src = url
      document.head.appendChild(script)
      script.onerror = (err) => {
        return reject(err)
      }
      script.onload = () => {
        loaded++
        if (loaded === scripts.length) {
          window.RhinoCompute.authToken = `Bearer ${this.getToken()}`
          window.rhino3dm()
            .then(module => {
              window.Rhino3dm = module
              resolve()
            })
        }
      }
    }
  })
}

RhinoService.prototype.getToken = function () {
  let token = localStorage.getItem('computeToken')
  if (token) return token
  if (window.confirm('Please open the pop up and copy the token from the Rhino Compute Login')) {
    window.open('https://www.rhino3d.com/compute/login')
  }
  token = prompt('Rhino Compute Token')
  this.setToken(token)
  return token
}

RhinoService.prototype.setToken = function (token) {
  return localStorage.setItem('computeToken', token)
}

RhinoService.prototype.loadFileFromUrl = async function (url) {
  let response
  try {
    response = await axios.get(url, { responseType: 'arraybuffer' })
  } catch (e) {
    throw Error('could not fetch url')
  }
  const longInt8View = new Uint8Array(response.data)
  const file = Rhino3dm.File3dm.fromByteArray(longInt8View)
  return new RhinoDoc(file)
}

function RhinoDoc (file) {
  this.file = file
  this.objects = []
  const objectsTable = file.objects()
  for (let i = 0; i < objectsTable.count; i++) {
    this.objects.push(new RhinoObject(objectsTable.get(i)))
  }
}

function RhinoObject (modelObject) {
  this.object = modelObject
  this.geometry = modelObject.geometry()
  this.attributes = modelObject.attributes()
}

RhinoObject.prototype.toRenderable = async function () {
  const rhinoObjecTypeName = this.geometry.constructor.name
  const converter = converters[rhinoObjecTypeName]
  if (!converter) {
    console.warn(`no renderable obj for ${rhinoObjecTypeName}`)
    return null
  }
  let rhinoOBjects
  try {
    rhinoOBjects = await converter(this.geometry)
  } catch (e) {
    console.warn('Rhino Compute request failed')
    localStorage.removeItem('computeToken')
    throw Error('Rhino Compute request failed')
  }
  return rhinoOBjects
}

// Convert Rhino Objects into types that can be encoded into ThreeJs Objects
const converters = {
  'Brep': async function (brep) {
    const rhinoMeshes = await RhinoCompute.Mesh.createFromBrep(brep)
    const rhinoWireframes = await RhinoCompute.Brep.getWireframe(brep, 1)
    return rhinoMeshes
      .concat(rhinoWireframes)
      .map(r => Rhino3dm.CommonObject.decode(r))
  },
}
