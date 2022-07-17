<template>
  <div style="width: 100%;height: 100%;">
    <el-form :inline="true" class="query-form" ref="searchForm" :model="searchForm" @keyup.enter.native="refreshList()"
      @submit.native.prevent>
      <!-- 搜索框-->
      <el-form-item prop="name">
        <el-input size="small" v-model="searchForm.name" placeholder="姓名" clearable></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input size="small" v-model="searchForm.code" placeholder="编号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="age">
        <el-input size="small" v-model="searchForm.age" placeholder="年龄" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="refreshList()" size="small">查询</el-button>
        <el-button @click="resetSearch()" size="small">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="add()">新建</el-button>
        <el-button type="warning" size="small" icon="el-icon-edit-outline" @click="edit()" :disabled="dataListSelections.length != 1" plain>修改</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="del()" :disabled="dataListSelections.length <= 0" plain>删除
        </el-button>
        <el-button icon="el-icon-download" @click="downloadTpl()" size="small">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      id="myTable"
      :data="dataList"
      size="medium"
      border
      @selection-change="selectionChangeHandle"
      v-loading="loading"
      class="table"
    >
      <template slot="empty">
        <img src="/svg/empty.svg" alt style="margin: 120px auto 8px auto; height: 50; width: 78px; display: block" />
        <p style="line-height: 22px; font-size: 14px; margin-bottom: 60px;">说了人家没数据呢</p>
      </template>
      <el-table-column 
        type="selection"
        header-align="center"
        align="center"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        show-overflow-tooltip
        label="姓名"
      >
        <template slot-scope="scope">
          <el-link type="primary" :underline="false"
            @click="edit(scope.row.id)">{{scope.row.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        show-overflow-tooltip
        label="性别"
      >
      </el-table-column>
      <el-table-column
        prop="code"
        show-overflow-tooltip
        label="编号"
      >
      </el-table-column>
      <el-table-column
        prop="height"
        show-overflow-tooltip
        label="身高"
      >
      </el-table-column>
      <el-table-column
        prop="shape"
        show-overflow-tooltip
        label="体型"
      >
      </el-table-column>
      <el-table-column
        prop="remarks"
        show-overflow-tooltip
        label="备注"
      >
      </el-table-column>
      <el-table-column 
        header-align="center"
        align="center"
        fixed="right"
        width="200"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-view" size="small" @click="view(scope.row.id)">查看</el-button>
          <el-button type="text" icon="el-icon-edit" size="small" @click="edit(scope.row.id)">修改</el-button>
          <el-button type="text" icon="el-icon-delete" size="small" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNo"
      :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total" background
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>


    <!-- 弹窗 -->
    <crud-form ref="crudForm"></crud-form>
  </div>
</template>
<script>
import crudForm from './crudForm'
import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'
export default {
  data() {
    return {
      searchForm: {
        name: '',//姓名
        code: '',//编号
        age: '',//年龄
      },
      dataListSelections:[],//多选
      pageNo: 1,
      pageSize: 10,
      total: 0,
      dataList: [
        {
          name: 'wft',
          sex: '男',
          code: '1212112',
          height: '1.88',
          shape: '偏瘦',
          remarks: '备注123'
        }
      ],
      loading: false,
    }
  },
  components: {
    crudForm
  },
  mounted() {
    this.refreshList()
  },
  methods: {
    // 获取列表数据
    refreshList() {

    },
    // 重置
    resetSearch() {
      this.$refs.searchForm.resetFields()
      this.refreshList()
    },
    // 多选
    selectionChangeHandle(val) {

    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageNo = 1
      this.refreshList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageNo = val
      this.refreshList()
    },
    // 新增
    add() {
      this.$refs.crudForm.init('add','')
    },
    // 修改
    edit(id) {
      id = id || this.dataListSelections.map(item => item.id)[0]
      this.$refs.crudForm.init('edit',id)
    },
    // 查看
    view(id) {
      this.$refs.crudForm.init('view',id)
    },
    // 删除
    del(id) {
      let ids = id || this.dataListSelections.map(item => item.id).join(',')
      this.$confirm(`确定删除所选项吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
      })
    },
    // 导出
    downloadTpl() {
      let wb = XLSX.utils.table_to_book(document.getElementById('myTable'), { raw: true })
      wb.Sheets.Sheet1 = this.delRepeat(wb.Sheets.Sheet1) // 去掉wb.Sheets.Sheet1对象中重复的value的属性
      // console.log(wb, '----->>>')
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      // console.log(wbout, 'wbout----->>>')
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "订单.xlsx"
        );
      } catch(e) {
        console.error(e, wbout, '----->>>')
      }
      // return wbout
    },
    // 对象去重
    delRepeat(obj) {
      let noRepeat = {}
      for(let key in obj) {
        let flag = true
        for(let k in noRepeat) {
          if(JSON.stringify(noRepeat[k]) == JSON.stringify(obj[key])) {
            flag = false
          }
        }
        if(flag) {
          noRepeat[key] = obj[key]
        }
      }
      return noRepeat
    }
  }
}
</script>