<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    disabled() {
      if(this.disabled) {
        document.querySelector(this.to).appendChild(this.$el)
      }
    }
  },

  mounted(){
    // console.log(this.to, '----->>>')
    // console.log(document.querySelector(this.to), '----->>>')
    if(this.disabled) document.querySelector(this.to).appendChild(this.$el)
  },
  /**
   *  render方法中，如果有变量得使用{}
   *  this.$scopedSlots.default() 表示预留一个插槽
   */
  render() {
    return <div>{this.$scopedSlots.default()}</div>
  }
}
</script>
