<template>
  <view class="container">
    <view class="header" :style="{ paddingTop: (statusBarHeight + 10) + 'px' }">
      请选择你的形象
    </view>

    <canvas type="webgl" id="webgl" canvas-id="webgl" style="width: 100vw; height: 70vh;" @touchstart="handleTouchStart"
      @touchmove="handleTouchMove" @touchend="handleTouchEnd"></canvas>

    <view class="navigation">
      <button class="nav-button" @click="prevModel">←</button>
      <button class="nav-button" @click="nextModel">→</button>
    </view>

    <view class="footer">
      <button class="confirm-button" plain="true" @click="confirmSelection">确认选择</button>
      <button class="next-button" :style="{ backgroundColor: '#36ffeb' }" @click="selected">Next</button>
    </view>
  </view>
</template>

<script>
import { createScopedThreejs } from 'threejs-miniprogram'
import { registerGLTFLoader } from 'common/loaders/GLTFLoader'
import { registerOrbitControls } from 'common/loaders/OrbitControls'
import { registerDRACOLoader } from 'common/loaders/DRACOLoader'

export default {
  data() {
    return {
      controls: null,
      currentModelIndex: 1,
      statusBarHeight: 0, // 状态栏高度
    }
  },
  created() {
    // 放到 this 上，避免 Vue 响应式追踪这些对象
    this.THREE = null
    this.canvas = null
    this.scene = null
    this.camera = null
    this.renderer = null
    this.model = null
    this.gltfLoader = null
  },
  onReady() {
    const query = uni.createSelectorQuery().in(this)
    query.select('#webgl')
      .node()
      .exec((res) => {
        this.canvas = res[0].node
        this.THREE = createScopedThreejs(this.canvas)

        // 注册 threejs loader
        registerGLTFLoader(this.THREE)
        registerDRACOLoader(this.THREE)
        registerOrbitControls(this.THREE)

        this.initScene()
        this.loadModel()
      })
    const systemInfo = uni.getSystemInfoSync()
    this.statusBarHeight = systemInfo.statusBarHeight // 单位 px
  },
  methods: {
    initScene() {
      const THREE = this.THREE
      const canvas = this.canvas

      this.camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 0.001, 1000)
      this.camera.position.set(1, 1, 1)

      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xffffff)

      const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
      this.scene.add(light)

      this.renderer = new THREE.WebGLRenderer({ canvas })
      this.renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio)
      this.renderer.setSize(canvas.width, canvas.height)

      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)

      this.gltfLoader = new THREE.GLTFLoader()
      const dracoLoader = new THREE.DRACOLoader()
      this.gltfLoader.setDRACOLoader(dracoLoader)

      const render = () => {
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        canvas.requestAnimationFrame(render)
      }

      render()
    },
    loadModel() {
      const indexStr = this.currentModelIndex.toString().padStart(3, '0')
      const url = `http://127.0.0.1:8080/static/${indexStr}/scene.gltf`

      if (this.model) {
        this.scene.remove(this.model)
        this.model = null
      }

      this.gltfLoader.load(
        url,
        (loaded) => {
          this.model = loaded.scene
          this.scene.add(this.model)

          // 调整 OrbitControls
          const box3 = new this.THREE.Box3().setFromObject(this.model)
          const length = box3.max.distanceTo(box3.min)
          this.controls.target = box3.getCenter(new this.THREE.Vector3())
          this.controls.minDistance = length
          this.controls.maxDistance = length * 2
          this.controls.maxPolarAngle = Math.PI / 2
          this.controls.update()
        },
        undefined,
        (error) => {
          console.error('模型加载失败:', error)
        }
      )
    },
    nextModel() {
    const modelCount = 8
    this.currentModelIndex = this.currentModelIndex % modelCount + 1
    this.loadModel()
  },
    prevModel() {
      const modelCount = 8
      this.currentModelIndex = (this.currentModelIndex + modelCount - 2) % modelCount + 1
      this.loadModel()
    },
    confirmSelection() {
      const indexStr = this.currentModelIndex.toString().padStart(3, '0')
      // console.log('你选择了模型', this.currentModelIndex)
      uni.showToast({
        title: `选择模型 ${indexStr}`,
        icon: 'success',
      })
      const avatarUrl = `http://127.0.0.1:8080/static/${indexStr}/scene.gltf`;

      // 调用 saveAvatar 云函数
      uniCloud.callFunction({
        name: 'saveAvatar',
        data: {
          userId: '67d16f8ae0ec19c842704b02', // 替换为实际用户 ID
          avatarUrl: avatarUrl, // 当前模型的 URL
        },
      })
        .then((res) => {
          if (res.result.code === 200) {
            uni.showToast({
              title: '保存成功',
              icon: 'success',
            });
          } else {
            uni.showToast({
              title: res.result.message || '保存失败',
              icon: 'none',
            });
          }
        })
        .catch((error) => {
          console.error('云函数调用失败:', error);
          uni.showToast({
            title: '保存失败',
            icon: 'none',
          });
        });
    },
    selected() {
      uni.navigateTo({
        url: '/pages/metaverse/meet', // 跳转到 meet 页面
      });
    },
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
}

.header {
  padding: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.navigation {
  display: flex;
  justify-content: center;
  margin-top: 20rpx;
}

.nav-button {
  margin: 0 30rpx;
  font-size: 40rpx;
  padding: 10rpx 30rpx;
}

.footer {
  margin: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40rpx;
  flex-wrap: nowrap;
}

.confirm-button 
.next-button {
  font-size: 28rpx;
  padding: 10rpx 50rpx;
  background-color: #36ffeb !important;
  color: #000;
  border: none;
  border-radius: 10rpx;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
}
</style>