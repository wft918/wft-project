<template>
  <div class="el-tree-transfer-page">
    <div class="el-tree-transfer-container">
      <TreeTransfer
        :title="title"
        :from_data="fromData"
        :to_data="toData"
        :defaultProps="{ label: 'label',children: 'children', disabled: 'disabled' }"
        node_key="id"
        pid="pid"
        @add-btn="add"
        @remove-btn="remove"
        :mode="mode"
        height="100%"
        filter
        openAll
      />
    </div>
  </div>
</template>
<script>
import TreeTransfer from "el-tree-transfer"; // 引入
export default {
  data() {
    return {
      mode: "transfer", // transfer addressList
      title: ['组外人员', '组内人员'],
      fromData: [
        {
          id: "1",
          pid: 0,
          label: "一级 1",
          children: [
            {
              id: "1-1",
              pid: "1",
              label: "二级 1-1",
              disabled: true,
              children: []
            },
            {
              id: "1-2",
              pid: "1",
              label: "二级 1-2",
              children: [
                {
                  id: "1-2-1",
                  pid: "1-2",
                  children: [],
                  label: "二级 1-2-1"
                },
                {
                  id: "1-2-2",
                  pid: "1-2",
                  children: [],
                  label: "二级 1-2-2"
                }
              ]
            }
          ]
        }
      ],
      toData: []
    }
  },
  components: { TreeTransfer },
  methods: {
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode() {
      if (this.mode == "transfer") {
        this.mode = "addressList";
      } else {
        this.mode = "transfer";
      }
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
  },
};
</script>
<style scoped>
.el-tree-transfer-page {
  width: 100%;
  height: 100%;
  position: relative;
}
.el-tree-transfer-container {
  width: 60%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  border: 1px solid #f5f7fa;
}
</style>
