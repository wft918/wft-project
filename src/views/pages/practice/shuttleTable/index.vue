<template>
  <div style="width: 100%;height: 100%;display: flex;">
    <div style="width: 47%;height: 100%;">  
      <el-table
        :data="leftData"
        size="medium"
        @selection-change="leftSelectionChangeHandle"
        style="width: 100%">
        <el-table-column
          header-align="center"
          align="center"
          type="selection">
        </el-table-column>
        <el-table-column
          prop="date"
          show-overflow-tooltip
          label="日期">
        </el-table-column>
        <el-table-column
          prop="name"
          show-overflow-tooltip
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          show-overflow-tooltip
          label="地址">
        </el-table-column>
      </el-table>
    </div>
    <div style="width: 6%;height: 100%;display: flex;justify-content: center;align-items: center;">
      <div>
        <div style="margin-bottom: 10px;">
          <el-button @click="ltTort" :disabled="!leftSelectData.length" size="medium" type="primary" icon="el-icon-arrow-right" circle></el-button>
        </div>
        <div>
          <el-button @click="rtTolt" :disabled="!rightSelectData.length" size="medium" type="primary" icon="el-icon-arrow-left" circle></el-button>
        </div>
      </div>
    </div>
    <div style="width: 47%;height: 100%;">
      <el-table
        :data="rightData"
        size="medium"
        @selection-change="rightSelectionChangeHandle"
        style="width: 100%">
        <el-table-column
          header-align="center"
          align="center"
          type="selection">
        </el-table-column>
        <el-table-column
          prop="date"
          show-overflow-tooltip
          label="日期">
        </el-table-column>
        <el-table-column
          prop="name"
          show-overflow-tooltip
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          show-overflow-tooltip
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  const leftData = [
    {
      date:'2022-01-13',
      name:'王福太1',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太2',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太3',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太4',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太5',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太6',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太7',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太8',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太9',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太10',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太11',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太12',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太13',
      address:'济南市历下区'
    },
    {
      date:'2022-01-13',
      name:'王福太14',
      address:'济南市历下区'
    },
  ]
  export default {
    data() {
      return {
        leftData,
        rightData:[],
        leftSelectData:[],
        rightSelectData:[]
      }
    },
    mounted() {

    },
    methods: {
      // 左边多选操作
      leftSelectionChangeHandle(val) {
        this.leftSelectData = val
      },
      // 右边多选操作
      rightSelectionChangeHandle(val) {
        this.rightSelectData = val
      },
      // 左边移到右边
      ltTort() {
        this.rightData.push(...this.leftSelectData)
        for(let i = 0; i < this.leftData.length; i++) {
          for(let j = 0; j < this.leftSelectData.length; j++) {
            if(this.leftData[i].name === this.leftSelectData[j].name) {
              this.leftData.splice(i,1)
            }
          }
        }
        this.leftSelectData = []
        this.rightSelectData = []
      },
      // 右边移到左边
      rtTolt() {
        this.leftData.push(...this.rightSelectData)
        for(let i = 0; i < this.rightData.length; i++) {
          for(let j = 0; j < this.rightSelectData.length; j++) {
            if(this.rightData[i].name === this.rightSelectData[j].name) {
              this.rightData.splice(i,1)
            }
          }
        }
        this.leftSelectData = []
        this.rightSelectData = []
      }
    }
  }
</script>