<template>
  <div></div>
</template>
<script>
// import * as THREE from 'three'
export default {
  data() {
    return {
      camera: null, // 照相机
      renderer: null, // 渲染器
      mesh: null, // 网格
      textureLoader: null, // 纹理加载器
      mixer: null, // 照相机
      publicPath: ''
    };
  },
  mounted() {
    //三维
    this.camera = null
    this.renderer = null
    this.mesh = null
    this.textureLoader = null
    this.mixer = null;
    this.clock = new THREE.Clock();
    this._pointsBuf = []
    this.timer = null;
    this.groupBox = new THREE.Group();
    this.groupBox1 = new THREE.Group();
    this.scene = new THREE.Scene();
    // this.$nextTick(() => {
    //   this.init()
    // })
  },
  computed: {},
  methods: {
    init() {
      // 1.2 相机
      this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      // 1.3 渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });

      // 创建纹理加载器
      this.textureLoader = new THREE.TextureLoader();

      // 设置相机
      // 设置摄像机位置,相机方向逆X轴方向，倾斜向下看
      this.camera.position.set(0, 360, 360);
      //this.camera.position.set(-20, 40 ,30)
      // 指向场景中心
      this.camera.lookAt(this.scene.position);
      // 添加坐标轴，辅助判断位置
      let axes = new THREE.AxesHelper(1000);
      this.scene.add(axes);

      // 设置环境
      this.renderer.setClearColor(new THREE.Color("#f1f9fb"));
      // 设置场景大小
      this.renderer.setSize(
        this.$refs.threeworld.clientWidth,
        this.$refs.threeworld.clientHeight
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
      this.$refs.threeworld.appendChild(this.renderer.domElement);

      // 鼠标键盘控制
      let controls = new OrbitControls(this.camera, this.renderer.domElement); // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度，阻尼越小越灵敏
      controls.dampingFactor = 0.5;
      // 是否可以缩放
      controls.enableZoom = true;
      // 是否自动旋转
      controls.autoRotate = false;
      // 设置相机距离原点的最近距离
      controls.minDistance = 20;
      // 设置相机距离原点的最远距离
      controls.maxDistance = 1000;
      // 是否开启右键拖拽
      controls.enablePan = true;
      // 上下翻转的最大角度
      controls.maxPolarAngle = 1.5;
      // 上下翻转的最小角度
      controls.minPolarAngle = 0.0;
      // 是否可以旋转
      this.enableRotate = true;

      controls.addEventListener("change", this.render);

      this.addGeoBox();
      this.createWall();
      this.createPartition();
      this.loadTable();
      // this.createConferenceTable()
      // this.createCabinet()
      // this.createChair()
      // this.loadObj()

      this.render();
    },
    render() {
      requestAnimationFrame(this.render); //请求再次执行渲染函数render
      if (this.renderer) {
        this.renderer.render(this.scene, this.camera); //执行渲染操作
      }
      var time = this.clock.getDelta();
      if (this.mixer) {
        this.mixer.update(time);
      }
    },
    //地板
    addGeoBox() {
      //创建材质并贴上纹理
      let floorTexture = this.textureLoader.load(
        // require("../../../../assets/img/floor.jpg") // 暂时注掉
      );
      let boxTextureMaterial = new THREE.MeshStandardMaterial({
        map: floorTexture,
        metalness: 0.2,
        roughness: 0.07,
        side: THREE.DoubleSide,
      });
      //墙宽2
      let boxGeo = new THREE.BoxBufferGeometry(439 + 2 + 2, 2, 376.5 + 2 + 2);
      let boxMesh = new THREE.Mesh(boxGeo, boxTextureMaterial);
      boxMesh.position.set(0, 0, 0);
      this.scene.add(boxMesh);
    },
    //四周墙
    createWall() {
      //外墙
      let wallMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
      let wallGeo = new THREE.BoxGeometry(439 + 2 + 2, 120, 376.5 + 2 + 2);
      let wallMesh = new THREE.Mesh(wallGeo, wallMaterial);
      wallMesh.position.set(0, 60, 0); //(0, 60, -14.95);
      //内墙
      let wallInnerMaterial = new THREE.MeshLambertMaterial({
        color: 0x2d1bff,
      });
      let wallInnerGeo = new THREE.BoxGeometry(439, 120, 376.5); //(270, 120, 390);
      let wallInnerMesh = new THREE.Mesh(wallInnerGeo, wallInnerMaterial);
      wallInnerMesh.position.set(0, 60, 0); //(0, 60, -14.95);

      //门
      let doorTexture = this.textureLoader.load(
        // require("../../../../assets/img/door_left.png") // 暂时注掉
      );
      let boxTextureMaterial = new THREE.MeshStandardMaterial({
        map: doorTexture,
        metalness: 0.2,
        roughness: 0.07,
        side: THREE.DoubleSide,
      });
      //let doorInnerMaterial = new THREE.MeshLambertMaterial({color: 0x2D1BFF});
      let doorGeo = new THREE.BoxGeometry(2, 80, 74.5);
      let doorMesh = new THREE.Mesh(doorGeo, boxTextureMaterial);
      doorMesh.position.set(-220.5, 40, 0);
      //this.scene.add(doorMesh);

      //转BSP
      let wallBSP = new ThreeBSP(wallMesh);
      let wallInnerBSP = new ThreeBSP(wallInnerMesh);
      let doorBSP = new ThreeBSP(doorMesh);
      // let window1BSP = new ThreeBSP(this.createWindowRight());
      //let window2BSP = new ThreeBSP(this.createWindowRight());// createWindowLeft
      let wallResultBSP = wallBSP.subtract(wallInnerBSP);
      wallResultBSP = wallResultBSP.subtract(doorBSP);
      // wallResultBSP = wallResultBSP.subtract(window1BSP);
      //wallResultBSP = wallResultBSP.subtract(window2BSP);
      let wallResultMesh = wallResultBSP.toMesh();

      //转换后的Mesh配置属性
      // let wallTexture = this.textureLoader.load(require("../../../../assets/img/wall.jpg")); // 暂时注掉
      let wallTextureMaterial = new THREE.MeshStandardMaterial({
        map: wallTexture,
        metalness: 0.2,
        roughness: 0.07,
        side: THREE.DoubleSide,
      });
      let wallInnerTexture = this.textureLoader.load(
        // require("../../../../assets/img/wall.jpg") // 暂时注掉
      );
      let wallInnerTextureMaterial = new THREE.MeshStandardMaterial({
        map: wallInnerTexture,
        metalness: 0.2,
        roughness: 0.07,
        side: THREE.DoubleSide,
      });
      let wallResultMeshMaterial = [];
      wallResultMeshMaterial.push(wallTextureMaterial);
      wallResultMeshMaterial.push(wallInnerTextureMaterial);
      //wallResultMeshMaterial.push(boxTextureMaterial);
      wallResultMesh.material = wallResultMeshMaterial;

      // console.log(wallResultMesh.geometry.faces, 112233);
      wallResultMesh.geometry.faces.forEach((item, i) => {
        if (i < 160) {
          item.materialIndex = 0;
        } else {
          item.materialIndex = 1;
        }
      });

      wallResultMesh.geometry.computeFaceNormals();
      wallResultMesh.geometry.computeVertexNormals();
      //添加结果到场景中
      this.scene.add(wallResultMesh);
    },
    //屋内隔断
    createPartition() {
      //隔断1
      let partitionMaterial = new THREE.MeshLambertMaterial({
        color: 0x2d1bff,
      });
      let partitionGeo = new THREE.BoxGeometry(330, 120, 2);
      let partitionMesh = new THREE.Mesh(partitionGeo, partitionMaterial);
      partitionMesh.position.set(54.5, 60, -47.6);
      //this.scene.add(partitionMesh);

      //门1

      let doorTexture = this.textureLoader.load(
        // require("../../../../assets/img/door_left.png") // 暂时注掉
      );
      let boxTextureMaterial = new THREE.MeshStandardMaterial({
        map: doorTexture,
        metalness: 0.2,
        roughness: 0.07,
        side: THREE.DoubleSide,
      });

      //let doorInnerMaterial = new THREE.MeshLambertMaterial({color: 0x2D1BFF});
      let doorGeo = new THREE.BoxGeometry(45, 80, 2);
      let doorMesh = new THREE.Mesh(doorGeo, boxTextureMaterial);
      doorMesh.position.set(-36, 40, -47.6);
      //this.scene.add(doorMesh);

      //门2
      //let doorInnerMaterial2 = new THREE.MeshLambertMaterial({color: 0x2D1BFF});
      let doorGeo2 = new THREE.BoxGeometry(45, 80, 2);
      let doorMesh2 = new THREE.Mesh(doorGeo2, boxTextureMaterial);
      doorMesh2.position.set(14.5, 40, -47.6);
      //this.scene.add(doorMesh2);

      //转BSP
      let partitionBSP = new ThreeBSP(partitionMesh);
      let doorBSP = new ThreeBSP(doorMesh);
      let doorBSP2 = new ThreeBSP(doorMesh2);
      let partitionResultBSP = partitionBSP.subtract(doorBSP);
      partitionResultBSP = partitionResultBSP.subtract(doorBSP2);
      let partitionResultMesh = partitionResultBSP.toMesh();

      let partitionture1 = this.textureLoader.load(
        // require("../../../../assets/img/wall.jpg") // 暂时注掉
      );
      let partitionMaterial1 = new THREE.MeshStandardMaterial({
        map: partitionture1,
        metalness: 0.2,
        roughness: 0.07,
        side: THREE.DoubleSide,
      });

      let partitionResultMeshMaterial = [];
      partitionResultMeshMaterial.push(partitionMaterial1);
      partitionResultMesh.material = partitionResultMeshMaterial;

      partitionResultMesh.geometry.faces.forEach((item, i) => {
        if (i < 160) {
          item.materialIndex = 0;
        } else {
          item.materialIndex = 1;
        }
      });

      partitionResultMesh.geometry.computeFaceNormals();
      partitionResultMesh.geometry.computeVertexNormals();
      //添加结果到场景中
      this.scene.add(partitionResultMesh);

      //隔断2
      let partitionGeo2 = new THREE.BoxGeometry(2, 120, 140.65);
      let partitionMesh2 = new THREE.Mesh(partitionGeo2, partitionMaterial1);
      partitionMesh2.position.set(-10.5, 60, -117.925);
      this.scene.add(partitionMesh2);

      //隔断3
      let partitionGeo3 = new THREE.BoxGeometry(2, 120, 140.65);
      let partitionMesh3 = new THREE.Mesh(partitionGeo3, partitionMaterial1);
      partitionMesh3.position.set(-110.5, 60, -117.925);
      this.scene.add(partitionMesh3);
    },
    //加载桌子模型
    loadTable() {
      //包含材质
      let _this = this;

      new MTLLoader().load(`${_this.publicPath}models/table/desk1000.mtl`,(materials) => {
        //console.log("materials", materials);
        materials.preload();
        new OBJLoader().setMaterials(materials).load(`${_this.publicPath}models/table/desk1000.obj`, (obj) => {
          obj.scale.set(0.05, 0.05, 0.05);
          obj.position.set(-160.5, 0, 190.25);
          obj.rotateY(Math.PI / 2);
          _this.groupBox.add(obj);

          _this.cloneModel(obj, -160.5, 0, 140.25, 0);
          _this.cloneModel(obj, -150.5, 0, 83.25, -Math.PI);
          _this.cloneModel(obj, -150.5, 0, 133.25, -Math.PI);
          _this.cloneModel(obj, -34, 0, 191.25, 0);
          _this.cloneModel(obj, -34, 0, 141.25, 0);
          _this.cloneModel(obj, 85.5, 0, 73.25, 0);
          _this.cloneModel(obj, -30.5, 0, 15.25, -Math.PI);
          _this.cloneModel(obj, 205.5, 0, 73.25, 0);
          _this.cloneModel(obj, 90.5, 0, 15.25, -Math.PI);
        });
        this.scene.add(_this.groupBox);
      });
      new MTLLoader().load(
        `${_this.publicPath}models/table/desk1200.mtl`,
        (materials) => {
          materials.preload();
          new OBJLoader()
            .setMaterials(materials)
            .load(`${_this.publicPath}models/table/desk1200.obj`, (obj) => {
              obj.scale.set(0.05, 0.05, 0.05);
              obj.position.set(85.5, 0, 190.25);
              obj.rotateY(Math.PI / 2);
              _this.groupBox1.add(obj);

              _this.cloneModel(obj, 85.5, 0, 130.25, 0);
              _this.cloneModel(obj, -30.5, 0, 66.25, -Math.PI);
              _this.cloneModel(obj, -30.5, 0, 126.25, -Math.PI);
              _this.cloneModel(obj, 205.5, 0, 190.25, 0);
              _this.cloneModel(obj, 205.5, 0, 130.25, 0);
              _this.cloneModel(obj, 90.5, 0, 66.25, -Math.PI);
              _this.cloneModel(obj, 90.5, 0, 126.25, -Math.PI);
              //财务室
              _this.cloneModel(obj, -110, 0, -64, -Math.PI / 2);
              _this.cloneModel(obj, -46, 0, -180, Math.PI / 2);
            });
          this.scene.add(_this.groupBox1);
        }
      );
      new MTLLoader().load(
        `${_this.publicPath}models/table/meeting.mtl`,
        (materials) => {
          materials.preload();
          new OBJLoader()
            .setMaterials(materials)
            .load(`${_this.publicPath}models/table/meeting.obj`, (obj) => {
              obj.scale.set(0.05, 0.05, 0.05);
              obj.position.set(20, 0, -80);
              //obj.rotateY(Math.PI/2);
              this.scene.add(obj);
            });
        }
      );
    },
    //复制模型
    cloneModel(obj, x, y, z, route) {
      //params: 模型， 坐标xyz，自定义数据
      const cloneObj = obj.clone();
      // cloneObj.$data = {
      //   name: '亚托克斯 ' + num + '号'
      // }
      cloneObj.position.set(x, y, z);
      if (route != 0) {
        cloneObj.rotateY(route);
      }
      this.groupBox.add(cloneObj);
      /**增加文字标签 */
      // const sprite = this.createSprite(cloneObj.$data); //前面文章有讲,createSprite函数是自定义的，用于给模型增加文字标签
      // sprite.position.set(x, y + 2, z);
      // this.this.scene.add(sprite);
    },
    loadObj() {
      let self = this;
      let loader = new GLTFLoader();
      loader.load(
        `${self.publicPath}models/Soldier/Soldier.glb`,
        function (gltf) {
          self.mesh = gltf.scene.children[0];
          self.mesh.scale.set(0.3, 0.3, 0.3);
          self.mesh.position.set(-90.5, 0, 127.5);
          self.scene.add(self.mesh); // 将模型引入three

          self.mixer = new THREE.AnimationMixer(self.mesh);
          var action = self.mixer.clipAction(gltf.animations[3]);
          action.stop().setDuration(4).play();
        }
      );
      self.scene.add(loader);

      this.walk();
    },
    walk() {
      //绘制曲线
      var curve = new THREE.CatmullRomCurve3(
        [
          //new THREE.Vector3(-105.5, 0, 127.5),
          new THREE.Vector3(-200.5, 0, -151),
          new THREE.Vector3(-200.5, 0, 0),
          new THREE.Vector3(0, 0, 0),
        ],
        false /*是否闭合*/
      );

      var points = curve.getPoints(50);

      let _i = 0;
      let _this = this;
      this.timer = setInterval(() => {
        if (_this.mesh) {
          _this.mesh.position.set(points[_i].x, points[_i].y, points[_i].z);
          _this.mesh.lookAt(
            points[_i + 1].x,
            points[_i + 1].y,
            points[_i + 1].z
          );
          // _this.mesh.lookAt(0, 0, 0)
          _this.mesh.rotateZ(Math.PI);
          _this.mesh.rotateX(Math.PI / 2);
          _i++;
          if (_i > 50 - 1) _i = 0;
        }
      }, 500);
    },
  },
};
</script>
<style scoped>
</style>
