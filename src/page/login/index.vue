<!-- 登录页 -->
<template>
  <div class="login">
    <div class="center">
      <div class="cen-lt">
        <img src="../../assets/img/login/loginPz.png" alt="">
      </div>
      <div class="cen-rt">
        <div class="form-title">
          <span>DEMO测试</span>
        </div>
        <div class="from">
          <el-form :model="inputForm" ref="inputForm" class="demo-form-inline">
            <el-row>
              <el-col :span="24">
                <el-form-item prop="username" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
                  <el-input autocomplete="off" v-model="inputForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                  <el-input autocomplete="new-password" v-model="inputForm.password" placeholder="请输入密码" show-password>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' },{ validator: validateCode, trigger: 'blur' }]">
                  <el-input v-model="inputForm.code" placeholder="请输入验证码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <!-- 验证码 -->
                <div @click="changeCode()">
                  <sidentify :identifyCode="identifyCode" :contentHeight="40" :contentWidth="140"></sidentify>
                </div>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button style="width: 100%;" @click="login()" type="primary" size="small">登 录</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '@/utils/flexible'
  import sidentify from '@/components/sidentify/sidentify'  //引入验证码组件
  export default {
    data() {
      return {
        //验证码校验
        validateCode:(rule, value, callback) => {  //验证码校验
          if (this.identifyCode !== value) {
            this.inputForm.code = ''  //校验不通过将
            this.changeCode()
            callback(new Error('请输入正确的验证码'))
          } else {
            callback()
          }
        },
        inputForm: {
          username: '',
          password: '',
          code: ''
        },
        // 验证码初始值
        identifyCode: 'm6a8',// 这个就是随机生成的验证码
        // 验证码的随机取值范围
        identifyCodes: '123456789abcdefghjkmnpqrstuvwxyz',
      }
    },
    components: {
      sidentify
    },
    mounted() {
      this.changeCode()
    },
    methods: {
      // 点击验证码刷新验证码
      changeCode() {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
      randomNum(min, max) {
        max = max + 1
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 随机生成验证码字符串
      makeCode(data, len) {
        for (let i = 0; i < len; i++) {
          this.identifyCode += data[this.randomNum(0, data.length - 1)]
        }
      },
      login() {
        this.$refs['inputForm'].validate((valid) => {
          if (valid) {
            console.log('form验证通过！！！------------>>>>>>>')
          }
        })
      }
    }
  }
</script>
<style scoped>
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-image: url('../../assets/img/login/loginBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .center {
    width: 100%;
    /* height: 65%; */
    padding: 0 12%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cen-lt {
    width: 4.130208rem;
    height: 3.359375rem;
  }

  .cen-lt img {
    width: 100%;
    height: 100%;
  }

  .cen-rt {
    width: 2.677083rem;
    height: 2.572917rem;
    background-image: url('../../assets/img/login/loginKuang.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 3%;
  }

  .form-title {
    width: 100%;
    height: .208333rem;
    line-height: .208333rem;
    text-align: center;
    color: #fff;
    font-size: .208333rem;
  }

  .form-title>span {
    font-family: 'ysbth';
  }

  .from {
    width: 100%;
    height: calc(100% - .208333rem);
    display: flex;
    align-items: center;
  }

  /deep/ .el-input__inner {
    background: linear-gradient(to right, #053c6b, #06558d, #0773b8);
    border: .002604rem
      /* 0.5/192 */
      solid #27C3E2;
    color: #fff;
  }
</style>