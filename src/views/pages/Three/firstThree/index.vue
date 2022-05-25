<template>
  <div id="import-template">
    <div id="stats"></div>
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import * as Stats from 'stats.js'
  // import * as dat from 'dat.gui'
  import OrbitControls from 'three-orbitcontrols'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
  import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

  const $ = name => document.querySelector(name)

  export default {
    name: 'ImportTemplate',
    data() {
      return {
        scene: null, // 场景
        camera: null, // 照相机
        renderer: null, // 渲染器
        mesh: null, // 网格
        textureLoader: null, // 纹理加载器
        mixer: null,
        groupBox: null,
        control: null, // 相机控件
        publicPath: process.env.BASE_URL,
        timer: null,
        clock: null
      }
    },
    created() {
      // this.init()
    },
    mounted() {
      this.init()
    },
    methods: {
      //初始化
      init() {
        // 场景
        this.scene = new THREE.Scene();
        // 1.2 相机
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        // 1.3 渲染器
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // 创建纹理加载器
        this.textureLoader = new THREE.TextureLoader();
        // 
        this.groupBox = new THREE.Group();
        // 设置相机
        // 设置摄像机位置,相机方向逆X轴方向，倾斜向下看
        this.camera.position.set(360, 360, 360);
        //this.camera.position.set(-20, 40 ,30)
        // 指向场景中心
        this.camera.lookAt(this.scene.position);
        // 添加坐标轴，辅助判断位置
        let axes = new THREE.AxesHelper(1000);
        // this.scene.add(axes);
        // 设置环境
        this.renderer.setClearColor(new THREE.Color("#f1f9fb"));
        // 设置场景大小
        this.renderer.setSize(
          $('#container').getBoundingClientRect().width,
          $('#container').getBoundingClientRect().height
        );
        // 渲染器开启阴影效果
        this.renderer.shadowMap.enabled = true;
        // 点光源
        let point = new THREE.PointLight(0xffffff);
        point.position.set(500, 300, 400); // 点光源位置
        this.scene.add(point); // 点光源添加到场景中
        // 环境光
        let ambient = new THREE.AmbientLight(0x999999);
        this.scene.add(ambient);

        // 渲染div到canvas
        $('#container').appendChild(this.renderer.domElement);

        //创建相机控件
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.control.enableDamping = true
        // 动态阻尼系数 就是鼠标拖拽旋转灵敏度，阻尼越小越灵敏
        this.control.dampingFactor = 0.5;
        // 是否可以缩放
        this.control.enableZoom = true;
        // 是否自动旋转
        this.control.autoRotate = false;
        // 设置相机距离原点的最近距离
        this.control.minDistance = 20;
        // 设置相机距离原点的最远距离
        this.control.maxDistance = 1000;
        // 是否开启右键拖拽
        this.control.enablePan = true;
        // 上下翻转的最大角度
        this.control.maxPolarAngle = 1.5;
        // 上下翻转的最小角度
        this.control.minPolarAngle = 0.0;
        // 是否可以旋转
        this.enableRotate = true;
        this.loadGlbModel();
        // this.loadFbxModel()
      },
      // 加载 GLTF 模型
      loadGlbModel() {
        const loader = new GLTFLoader()
        // const dracoLoader = new DRACOLoader()
        // dracoLoader.setDecoderPath('/draco/')
        // dracoLoader.preload()
        // loader.setDRACOLoader(dracoLoader)
        loader.load(`${this.publicPath}model/12OJJ6MOWT722N61Z5N92KA9C.glb`, (gltf) => {
          console.log(gltf, 'gltf----->>>')
          gltf.scene.scale.set(100,100,100)  //  设置模型大小缩放
          gltf.scene.position.set(0,0,0)
          let axis = new THREE.Vector3(0,1,0);//向量axis
          gltf.scene.rotateOnAxis(axis,Math.PI/2);
          //绕axis轴逆旋转π/16
          gltf.scene.rotateOnAxis(axis,Math.PI/-20);
          gltf.scene.rotateOnAxis(axis,Math.PI/50);
          // gltf.rotateY(Math.PI / 2);
          // this.groupBox.add(gltf);
          this.scene.add(gltf.scene)
        }, (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        }, (error) => {
            console.error(error)
        })
        let animate = () => {
          //循环调用函数
          requestAnimationFrame(animate)
          //更新相机控件
          this.control.update()
          //渲染界面
          this.renderer.render(this.scene, this.camera)
        }
        animate()
      },
      //  加载 FBX 模型
      loadFbxModel() {
        const loader = new FBXLoader();
        loader.load(`${this.publicPath}model/glbxz.com6031.FBX`, object => {//加载路径fbx文件
          console.log(object, 'object----->>>')
          object.traverse( child => {
            if ( child.isMesh ){
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          this.scene.add(object);//模型
        })
        let animate = () => {
          //循环调用函数
          requestAnimationFrame(animate)
          //更新相机控件
          this.control.update()
          //渲染界面
          this.renderer.render(this.scene, this.camera)
        }
        animate()
      }
    }
  }
</script>
<style scoped>
#import-template {
  width: 100%;
  height: 100%;
}
#stats {
  width: 100%;
  height: 50px;
}
#container {
  width: 100%;
  height: calc(100% - 50px);
}
</style>