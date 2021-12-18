<template>
  <div>
    <el-dialog v-dialogDrag :title="title" :visible.sync="dialogVisible" width="50%" :close-on-press-escape="false" :close-on-click-modal="false">
      <el-form :model="inputForm" ref="inputForm" v-loading="loading" :class="method === 'view'?'readonly':''"
        :disabled="method==='view'" label-width="80px">
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name" :rules="[{required: true, message:'姓名不能为空', trigger:'blur'}]">
              <el-input size="small" v-model="inputForm.name" placeholder="请填写姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex" :rules="[{required: true, message:'性别不能为空', trigger:'blur'}]">
              <el-input size="small" v-model="inputForm.sex" placeholder="请填写性别"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编号" prop="code" :rules="[{required: true, message:'编号不能为空', trigger:'blur'}]">
              <el-input size="small" v-model="inputForm.code" placeholder="请填写编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身高" prop="height" :rules="[{required: true, message:'身高不能为空', trigger:'blur'}]">
              <el-input size="small" v-model="inputForm.height" placeholder="请填写联系人身高"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="体型" prop="shape" :rules="[{required: true, message:'体型不能为空', trigger:'blur'}]">
              <el-select size="small " v-model="inputForm.shape" placeholder="请选择体型" style="width: 100%;">
                <el-option 
                  v-for="item in shapeList"
                  :key="item.value" 
                  :label="item.label" 
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注信息" prop="remarks" :rules="[]">
              <el-input size="small" type="textarea" v-model="inputForm.remarks" placeholder="请填写备注信息"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细内容" prop="contents" :rules="[{required: true, message:'详细内容不能为空', trigger:'blur'}]">
              <wang-editor ref="editor" v-model="inputForm.contents" @change="editorChange"></wang-editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import WangEditor from '@/components/editor/WangEditor'
  export default {
    data() {
      return {
        title: '',
        dialogVisible:false,
        loading:false,
        method:'',
        shapeList:[
          {
            label:'超级瘦',
            value:'0'
          },
          {
            label:'偏瘦',
            value:'1'
          },
          {
            label:'正常',
            value:'2'
          },
          {
            label:'偏胖',
            value:'3'
          },
          {
            label:'超级胖',
            value:'4'
          },
        ],
        inputForm: {
          id:'',
          name:'',
          sex:'',
          code:'',
          height:'',
          shape:'',
          remarks:'',
          contents:''
        }
      }
    },
    components: {
      WangEditor
    },
    methods: {
      init(method, id) {
        this.method = method
        this.inputForm.id = id
        if(method == 'add') {
          this.title = '新增人员信息'
        }else if(method == 'edit') {
          this.title = '修改人员信息'
        }else if(method == 'view') {
          this.title = '查看人员信息'
        }
        this.dialogVisible = true
        this.loading = false
        this.$nextTick(() => {//等弹窗dom元素渲染完之后第一回调
          this.$refs.inputForm.resetFields()
          this.$nextTick(() => { //等富文本渲染完第一次回调    要不然报错
            this.$refs.editor.setHtml('')  //设置值 这里初始化
          })
        })
      },
      // 富文本改变触发
      editorChange(val) {
        console.log(val,'富文本改变----------->>>>>>>')
      },
      doSubmit() {
        console.log(this.inputForm,'inputForm---->>>')
        this.$refs['inputForm'].validate((valid) => {
          if (valid) {
            
          }
        })
      }
    }
  }
</script>