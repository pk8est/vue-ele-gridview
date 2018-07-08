<template>
    <el-table-column v-bind="$attrs" v-if="isScopedSlot">
      <template slot-scope="scope">
      <slot v-bind="scope"></slot>
        <slot v-bind="scope" :name="slotName">
          <template v-if="$attrs.value">
            {{
              typeof $attrs.value == 'function' ? $attrs.value(scope.row[$attrs.prop], scope.$index, scope.row) : $attrs.value
            }}
          </template>
          <component
            v-else-if="template"
            :is="template"
            :$index="scope.$index"
            :$value="scope.row[$attrs.prop]"
            :$scope="scope"
            :$row="scope.row"
            :$column="scope.column"
            v-on="$listeners"
          ></component>
          <component
            v-else-if="component"
            :is="component"
          ></component>
        </slot>
      </template>
    </el-table-column>
    <el-table-column v-else v-bind="$attrs"></el-table-column>
</template>

<script>
import Vue from 'vue'
import VRuntimeTemplate from "v-runtime-template";
export default{
  name: 'CTd',
  components: { VRuntimeTemplate },
  props: [ 'template', 'component', 'slotName', 'vNode'],
  data(){
    return {

    }
  },
  mounted(){

  },
  computed: {
    isScopedSlot(){
      const flag = this.$slots.default
          || this.$scopedSlots.default
          || this.$scopedSlots.hasOwnProperty(this.slotName)
          || this.vNode
          || this.template
          || this.component
      return flag
    },
    isRender(){
      return this.$attrs.hasOwnProperty("render")
    }
  },
  created() {

  },
  methods: {
    renderTemplate(template){
      if(typeof template == 'string'){
        template = {template}
      }
      return Object.assign({}, {
        template: '<div></div>',
        props: ["$index", "$value", "$scope", "$row", "$column"]
      }, template)
      // return {
      //   template: '<div>' + template + '</div>',
      //   props: ["$index", "$value", "$scope", "$row", "$column"]
      // }
      //return Vue.compile("<div>" + template + "</div>").render
      //console.info(this.$createElement(Vue.compile("<div>" + template + "</div>"), {value: 123}))
    }
  }
}
</script>
