<template>
  <view class="container">
    <canvas type="webgl" id="webgl" canvas-id="webgl" style="width: 100vw; height: 100vh;"
      @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"></canvas>
  </view>
</template>

<script>

import AvatarViewer from '@/components/AvatarViewer.vue'; // 确保路径正确

import { createScopedThreejs } from 'threejs-miniprogram'
import { registerGLTFLoader } from 'common/loaders/GLTFLoader'
import { registerOrbitControls } from 'common/loaders/OrbitControls'
import { registerDRACOLoader } from 'common/loaders/DRACOLoader'

export default {
  components: {
    AvatarViewer,
  },
  data() {
    return {
      controls: null
    }
  },
  onReady() {
    const query = uni.createSelectorQuery().in(this)
    query.select('#webgl')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        const THREE = createScopedThreejs(canvas)

        // 注册组件
        registerGLTFLoader(THREE)
        registerDRACOLoader(THREE)
        registerOrbitControls(THREE)

        let camera, scene, light, renderer

        // 初始化场景
        const init = () => {
          camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 0.001, 1000)
          camera.position.set(1, 1, 1)

          scene = new THREE.Scene()
          scene.background = new THREE.Color(0xffffff)

          light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
          scene.add(light)

          renderer = new THREE.WebGLRenderer({ canvas })
          renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio)
          renderer.setSize(canvas.width, canvas.height)

          this.controls = new THREE.OrbitControls(camera, renderer.domElement)

          const gltfLoader = new THREE.GLTFLoader()
          const dracoLoader = new THREE.DRACOLoader()
          // dracoLoader.setDecoderPath('http://127.0.0.1:8080/draco/')
          gltfLoader.setDRACOLoader(dracoLoader)


          gltfLoader.load(
            'http://127.0.0.1:8080/static/001/scene.gltf',
            (model) => {
              const gltf = model.scene
              scene.add(gltf)

              this.controls.rotateSpeed = 2
              const box3 = new THREE.Box3().setFromObject(gltf)
              const length = box3.max.distanceTo(box3.min)
              this.controls.target = box3.getCenter(new THREE.Vector3())
              this.controls.minDistance = length
              this.controls.maxDistance = length * 2
              this.controls.maxPolarAngle = Math.PI / 2
              this.controls.update()
            },
            (err) => {
              console.error('GLTF 加载失败:', err)
            }
          )

          render()
        }

        const render = () => {
          this.controls.update()
          renderer.render(scene, camera)
          canvas.requestAnimationFrame(render)
        }

        init()
      })
  },
  methods: {
    handleTouchStart(e) {
      if (this.controls && this.controls.onTouchStart) {
        this.controls.onTouchStart(e)
      }
    },
    handleTouchMove(e) {
      if (this.controls && this.controls.onTouchMove) {
        this.controls.onTouchMove(e)
      }
    },
    handleTouchEnd(e) {
      if (this.controls && this.controls.onTouchEnd) {
        this.controls.onTouchEnd(e)
      }
    }
  }
}
</script>

<style>
.container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>