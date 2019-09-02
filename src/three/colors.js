import { THREE } from '@/three/three.js'

const Colors = {
  black: new THREE.Color('#333333'),
  offWhite: new THREE.Color('#f0f0f0'),
  white: new THREE.Color('#ffffff'),
  lightGray: new THREE.Color('#eaeaea'),
  gray: new THREE.Color('#cacaca'),
  darkGray: new THREE.Color('#aaaaaa'),
}

const Materials = {
  black: new THREE.MeshBasicMaterial({ color: Colors.black }),
  white: new THREE.MeshBasicMaterial({ color: Colors.white }),
  lightGray: new THREE.MeshBasicMaterial({ color: Colors.lightGray }),
  gray: new THREE.MeshBasicMaterial({ color: Colors.gray }),
  darkGray: new THREE.MeshBasicMaterial({ color: Colors.darkGray }),
}

export { Colors, Materials }
