# Vue ThreeJS Rhino Viewer Demo

This is a demo project to test Rhino3dm & Compute integration with Three JS.
I created this project just to test and learn these technologies were designed to work
and to generate boiler plate code to use in future projects.

It uses [resources provided by McNeel here](https://github.com/mcneel/rhino3dm/blob/master/samples/javascript/rhinologo.html) for the setup,
but also wraps the code into reusable modules and uses newer level JS syntax.

### What's included
* A minimal VueJs project setup using Vue CLI
* My preferred setup for [loading ThreeJS into a Vue project](/master/blob/src/three) and [setting up a configurable Scene ](/master/blob/src/three/environment.js)
* A RhinoService module for making handling auth, Rhino Compute calls, and converting objects to a renderable object (eg. Brep to Meshes)
* Samples ThreeJs encoders to convert renderable Rhino Objects into ThreeJs equivalents (eg. Meshes, NurbsCurve, LineCurve, etc)

### Contributing

Contributions of any kind is welcome, including UI improvement, additional encoders, ThreeJS setup, etc

## Local Development
```
$ yarn install
$ yarn run serve
```

### License MIT
