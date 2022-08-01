<template>
  <div>
    <el-cascader
      v-model="value"
      :options="options"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
<script>
import * as elementchinaareadata from 'element-china-area-data'
// import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  data() {
    return {
      options: elementchinaareadata.regionData,
      value: ''
    }
  },
  mounted(){
   
  },
  computed:{

  },
  methods:{
    handleChange(val) {
      console.log(val, '----->>>')
    }
  },
}
</script>
<style scoped>

</style>
