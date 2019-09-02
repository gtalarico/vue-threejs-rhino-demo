# Vue ThreeJS Rhino Viewer Demo

This is a demo project to test Rhino3dm & Compute integration with Three JS.
I created this project to test and learn how these new technologies were designed to work,
and to generate boiler plate code for use in future projects.

It uses [resources and samples provided by McNeel here](https://github.com/mcneel/rhino3dm/blob/master/samples/javascript/rhinologo.html) for the basic setup,
but also build on it with more reusable modules and newer level JS syntax.

The application bootstrapping and [loading sequence of dependencies](https://github.com/gtalarico/vue-threejs-rhino-demo/blob/master/src/rhinoService.js#L7) in the [context of a Vue application](https://github.com/gtalarico/vue-threejs-rhino-demo/blob/master/src/components/Scene.vue#L49) was a bit tricky but seems to be working well.

[**Live Demo**](https://vue-threejs-rhino-viewer.netlify.com/)
(Requires Rhino Compute Token, get yours [here](https://www.rhino3d.com/compute/login))

### What's included
* A minimal VueJs project setup using Vue CLI
* My preferred setup for [loading ThreeJS into a Vue project](https://github.com/gtalarico/vue-threejs-rhino-demo/blob/master/src/three) and [setting up a configurable Scene ](https://github.com/gtalarico/vue-threejs-rhino-demo/blob/master/src/three/environment.js)
* A [RhinoService module](https://github.com/gtalarico/vue-threejs-rhino-demo/blob/master/src/rhinoService.js) for making handling auth, Rhino Compute calls, and converting objects to a renderable object (eg. Brep to Meshes)
* Samples [ThreeJs encoders]((https://github.com/gtalarico/vue-threejs-rhino-demo/blob/master/src//three/encoders.js)) to convert renderable Rhino Objects into ThreeJs equivalents (eg. Meshes, NurbsCurve, LineCurve, etc)

![demo-screenshot](https://github.com/gtalarico/vue-threejs-rhino-demo/raw/master/rhino-viewer.gif)
![demo-screenshot-2](https://github.com/gtalarico/vue-threejs-rhino-demo/raw/master/rhino-viewer-2.gif)


### Contributing

Contributions of any kind are welcome, including UI improvement, additional encoders, application setup, etc

## Local Development
```
$ yarn install
$ yarn run serve
```

**License MIT**
