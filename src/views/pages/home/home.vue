<template>
  <div>
    <div class="name">{{msg}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '60'
    }
  },
  mounted(){

  },
}
</script>
<style scoped>
.name {
  font-size: 37px;
  color: #007acc;
  font-weight: 600;
  font-family: 'Trendy';
  font-style:italic;
}
</style>
