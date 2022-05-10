<template>
  <div style="width: 100%;height: 100%;">
    <div class="vis-container">
      <VisTopology :nodes="nodes" :id="'VisTopology'" />
    </div>
  </div>
</template>
<script>
import VisTopology from './vis.vue'
export default {
  data() {
    return {
      nodes: [
        { id: 1, label: "Node 1" },
        { id: 2, label: "Node 2" },
        { id: 3, label: "Node 3" },
        { id: 4, label: "Node 4" },
        { id: 5, label: "Node 5" },
      ]
    }
  },
  components: { VisTopology },
  mounted() {
    setTimeout(() => {
      this.nodes = [
        { id: 1, label: "wft 1" },
        { id: 2, label: "wft 2" },
        { id: 3, label: "wft 3" },
        { id: 4, label: "wft 4" },
        { id: 5, label: "wft 5" },
      ]
    }, 3000)
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
