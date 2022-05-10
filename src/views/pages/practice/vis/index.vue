<template>
  <div style="width: 100%;height: 100%;">
    <div class="vis-container">
      <VisTopology :id="'VisTopology'" :nodes="nodes" />
    </div>
  </div>
</template>
<script>
import VisTopology from './vis.vue'
export default {
  data() {
    return {
      nodes: []
    }
  },
  components: { VisTopology },
  mounted() {
    setTimeout(() => {
      this.nodes = [
        { id: 1, label: "Wft 1" },
        { id: 2, label: "Wft 2" },
        { id: 3, label: "Wft 3" },
        { id: 4, label: "Wft 4" },
        { id: 5, label: "Wft 5" }
      ]
    }, 2000)
  }
}
</script>
<style scoped>
.vis-container {
  width: 500px;
  height: 500px;
  border: 1px solid red;
}
</style>
