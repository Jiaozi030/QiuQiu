<template>
    <view class="meet-page">
      <canvas
        type="webgl"
        id="webgl"
        canvas-id="webgl"
        style="width: 100vw; height: 100vh;"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      ></canvas>
    </view>
  </template>
  
  <script>
  import { createScopedThreejs } from 'threejs-miniprogram'
  import { registerGLTFLoader } from 'common/loaders/GLTFLoader'
  import { registerOrbitControls } from 'common/loaders/OrbitControls'
  import { registerDRACOLoader } from 'common/loaders/DRACOLoader'
  
  export default {
    data() {
      const raw = uni.getStorageSync('avatarUrl')
      return {
        avatarUrl: typeof raw === 'string' ? raw : ''
      }
    },
  
    created() {
      this.canvas = null
      this.THREE = null
      this.scene = null
      this.camera = null
      this.renderer = null
      this.controls = null
      this.model = null
      this.gltfLoader = null
    },
  
    onReady() {
      console.log('[DEBUG] avatarUrl =', this.avatarUrl)
      if (!this.avatarUrl) {
        uni.showToast({ title: '没有设置 avatarUrl', icon: 'none' })
        return
      }
  
      const query = uni.createSelectorQuery().in(this)
      query.select('#webgl')
        .node()
        .exec((res) => {
          this.canvas = res[0].node
          this.THREE = createScopedThreejs(this.canvas)
  
          registerGLTFLoader(this.THREE)
          registerDRACOLoader(this.THREE)
          registerOrbitControls(this.THREE)
  
          this.initScene()
          this.loadAvatarModel(this.avatarUrl)
        })
    },
  
    methods: {
      initScene() {
        const THREE = this.THREE
        const canvas = this.canvas
  
        this.camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 0.01, 1000)
  
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xffffff)
  
        const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
        this.scene.add(light)
  
        this.renderer = new THREE.WebGLRenderer({ canvas })
  
        let pixelRatio = 1
        try {
          if (wx.getWindowInfo) {
            pixelRatio = wx.getWindowInfo().pixelRatio
          } else {
            pixelRatio = wx.getSystemInfoSync().pixelRatio
          }
        } catch (e) {
          console.warn('[WARN] 获取 pixelRatio 失败，使用默认值 1')
        }
  
        this.renderer.setPixelRatio(pixelRatio)
        this.renderer.setSize(canvas.width, canvas.height)
  
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableRotate = false
        this.controls.enablePan = true
        this.controls.screenSpacePanning = true
        this.controls.enableZoom = true
  
        // ✅ 微信小程序触控优化
        this.controls.touches.ONE = this.THREE.TOUCH.PAN
        this.controls.touches.TWO = this.THREE.TOUCH.DOLLY_PAN
  
        this.gltfLoader = new THREE.GLTFLoader()
        const dracoLoader = new THREE.DRACOLoader()
        this.gltfLoader.setDRACOLoader(dracoLoader)
  
        const renderLoop = () => {
          this.controls.update()
          this.renderer.render(this.scene, this.camera)
          canvas.requestAnimationFrame(renderLoop)
        }
  
        renderLoop()
      },
  
      loadAvatarModel(url) {
        if (!url || typeof url !== 'string') {
          console.warn('[WARN] avatarUrl 非法或为空:', url)
          return
        }
  
        if (this.model) {
          this.scene.remove(this.model)
          this.model = null
        }
  
        this.gltfLoader.load(
          url,
          (gltf) => {
            this.model = gltf.scene
            this.scene.add(this.model)
  
            const box = new this.THREE.Box3().setFromObject(this.model)
            const center = box.getCenter(new this.THREE.Vector3())
            const size = box.getSize(new this.THREE.Vector3()).length()
            const minY = box.min.y

            // ✅ 把人物模型脚贴到地板上
            this.model.position.y -= minY
            this.scene.add(this.model)

            // ✅ 添加更大的地面背景图
            const loader = new this.THREE.TextureLoader()
            loader.load('/static/background/BG2.jpg', (texture) => {
                const geometry = new this.THREE.PlaneGeometry(size * 5, size * 5) // 控制图片大小缩放
                const material = new this.THREE.MeshBasicMaterial({ map: texture })
                const backgroundPlane = new this.THREE.Mesh(geometry, material)

                backgroundPlane.position.set(center.x, 0, center.z) // 地板贴在 y = 0 上
                backgroundPlane.rotation.x = -Math.PI / 2
                this.scene.add(backgroundPlane)
            })

            // ✅ 设置摄像机视角（斜视俯瞰）
            this.camera.position.set(
            center.x + size * 1,
            center.y + size * 1.5,
            center.z + size * 1
            )
            this.camera.lookAt(center)

            // ✅ 设置控制器观察点
            // this.controls.target.copy(center)
            // this.controls.minDistance = size * 0.5
            // this.controls.maxDistance = size * 2
            // this.controls.update()

          },
          undefined,
          (err) => {
            console.error('[ERROR] 模型加载失败:', err)
            uni.showToast({ title: '模型加载失败', icon: 'none' })
          }
        )
      },
  
      handleTouchStart(e) {
        if (this.controls?.onTouchStart) this.controls.onTouchStart(e)
      },
      handleTouchMove(e) {
        if (this.controls?.onTouchMove) this.controls.onTouchMove(e)
      },
      handleTouchEnd(e) {
        if (this.controls?.onTouchEnd) this.controls.onTouchEnd(e)
      }
    }
  }
  </script>
  
  <style>
  .meet-page {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  </style>
  