<template>
  <el-table
     v-if="!resetTable"
    :data="tableData"
  >
    <slot name="tableBody"></slot>
    <!-- <slot name="tableColumns"> -->
      <c-td
        v-if="!column.noDisplay"
        v-for="({ column, component, slotName }, key) in columnsList"
        v-bind="column"
        :component="component"
        :slotName="slotName"
        :key="key"
        :index="key"
        v-on="$listeners"
        >
          <!-- <template v-if="slotName && typeof $scopedSlots[slotName] !== 'undefined'" :slot="slotName" slot-scope="scope">
              <slot :name="slotName" v-bind="scope"></slot>
          </template> -->
          <template :slot="slotName && typeof $scopedSlots[slotName] !== 'undefined' ? slotName : ''" slot-scope="scope">
              <slot :name="slotName" v-bind="scope"></slot>
          </template>
      </c-td>
    <!-- </slot> -->
  </el-table>
</template>

<script>
import Vue from 'vue'
import CTd from './CTd'

export default{
 name: 'CTable',
 components: { CTd },
 props:{
    resetTable: false,
    tableData: {
      default: () => []
    },
    columns: {
      default: () => []
    }
 },
 data(){
    return {

    }
 },
 created(){
   
 },
 computed: {
   columnsList: {
        get(){
          return this.columns.map((column, index) => {
            return column
          })
        },
        set(value){

        }
    },
 },
 methods: {

 }
}
</script>
