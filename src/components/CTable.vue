<template>
  <el-table
     v-if="!resetTable"
    :data="tableData"
  >
    <slot name="tableBody">
    <!-- <slot name="tableColumns"> -->
      <c-td
        v-if="column.display"
        v-for="({ column, template, component, slotName, vNode }, key) in computedColumns"
        v-bind="column"
        :component="component"
        :template="template"
        :vNode="vNode"
        :slotName="slotName"
        :key="key"
        :index="key"
        v-on="$listeners"
        >
          <template :slot="slotName && typeof $scopedSlots[slotName] !== 'undefined' ? slotName : ''" slot-scope="scope">
              <slot :name="slotName" v-bind="scope"></slot>
          </template>
      </c-td>
    </slot>
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
   computedColumns: {
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
