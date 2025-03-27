<template>
    <canvas ref="canvas" class="avatar-canvas"></canvas>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default {
    props: {
        avatarUrl: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            scene: null,
            camera: null,
            renderer: null,
            mixer: null,
            clock: new THREE.Clock(),
            model: null,
        };
    },
    mounted() {
        this.initScene();
        this.loadAvatar(this.avatarUrl);
        this.animate();
    },
    methods: {
        initScene() {
            // 创建场景
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0xeeeeee);

            // 创建相机
            this.camera = new THREE.PerspectiveCamera(
                75,
                this.$refs.canvas.clientWidth / this.$refs.canvas.clientHeight,
                0.1,
                1000
            );
            this.camera.position.set(0, 1.6, 2);

            // 创建渲染器
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.$refs.canvas,
                antialias: true,
            });
            this.renderer.setSize(
                this.$refs.canvas.clientWidth,
                this.$refs.canvas.clientHeight
            );

            // 添加灯光
            const ambientLight = new THREE.AmbientLight(0x404040);
            this.scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(1, 1, 1).normalize();
            this.scene.add(directionalLight);
        },
        loadAvatar(url) {
            const loader = new GLTFLoader();
            loader.load(
                url,
                (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(1, 1, 1);
                this.model.position.set(0, 0, 0);
                this.scene.add(this.model);

                // 如果有动画，可以播放
                if (gltf.animations && gltf.animations.length > 0) {
                    this.mixer = new THREE.AnimationMixer(this.model);
                    const action = this.mixer.clipAction(gltf.animations[0]);
                    action.play();
                }
                },
                undefined,
                (error) => {
                    console.error('Error loading GLTF model:', error);
                }
            );
        },
        animate() {
            requestAnimationFrame(this.animate);

            // 更新动画
            if (this.mixer) {
                this.mixer.update(this.clock.getDelta());
            }

            // 渲染场景
            this.renderer.render(this.scene, this.camera);
        },
        updatePosition(position) {
            if (this.model) {
                this.model.position.set(position.x, position.y, position.z);
            }
        },
    },
};
</script>

<style scoped>
.avatar-canvas {
    width: 100%;
    height: 100%;
}
</style> 