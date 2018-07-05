<script>
import Vue from 'vue'
export default{
  name: 'CTd',
  components: { },
  props:{
    index: {}
  },
  data(){
    return {

    }
  },
  mounted(){

  },
  computed: {
    isScopedSlot(){
      return this.$slots.default
          || this.$attrs.hasOwnProperty("template")
          || this.$attrs.hasOwnProperty("value")
    }
  },
  created() {

  },
  render(h){
    let scopedSlots = {}
    console.info(this)
    if(this.$attrs.template){
      const compile = Vue.compile(this.$attrs.template)
      scopedSlots['default'] = props => h(compile)
    }
    return h("el-table-column", {
      props: this.$props,
      attrs: this.$attrs,
      scopedSlots: scopedSlots
    }, [

    ])
  },
  methods: {
    renderTemplate(template){
      return {
        template: '<div>' + template + '</div>',
        props: ["$index", "$value", "$scope", "$row", "$column"]
      }
      //return Vue.compile("<div>" + template + "</div>").render
      //console.info(this.$createElement(Vue.compile("<div>" + template + "</div>"), {value: 123}))
    }
  }
}
</script>
