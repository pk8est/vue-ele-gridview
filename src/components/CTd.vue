<template>
    <el-table-column v-bind="$attrs" v-if="isScopedSlot">
      <template slot-scope="scope">
        <slot v-bind="scope" :name="slotName">
        <!-- <slot v-bind="scope" :name="$attrs.scopedSlotName"> -->
          <template v-if="$attrs.value">
            {{
              typeof $attrs.value == 'function' ? $attrs.value(scope.row[$attrs.prop], scope.$index, scope.row) : $attrs.value
            }}
          </template>
          <component
            v-else-if="component"
            :is="component"
            :$index="scope.$index"
            :$value="scope.row[$attrs.prop]"
            :$scope="scope"
            :$row="scope.row"
            :$column="scope.column"
            v-on="$listeners"
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
  props: [ 'component', 'slotName'],
  data(){
    return {

    }
  },
  mounted(){

  },
  computed: {
    isScopedSlot(){

      const flag = this.$slots.default
          || this.$scopedSlots.hasOwnProperty(this.slotName)
          || this.$attrs.hasOwnProperty("template")
          || this.$attrs.hasOwnProperty("value")
          || this.$attrs.hasOwnProperty("render")
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
