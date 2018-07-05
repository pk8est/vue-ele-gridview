<template>
  <el-table
     v-if="!resetTable"
    :data="tableData"
  >
    <slot name="tableBody"></slot>
    <slot name="tableColumn">
      <c-td
        v-if="!column.noDisplay"
        v-for="(column, key) in columnsList"
        v-bind="column"
        :key="key"
        :index="key"
        v-on="$listeners"
        >
          <template :slot="typeof $scopedSlots[column.prop] !== 'undefined' ? column.prop : ''" slot-scope="scope">
              <slot :name="column.prop" v-bind="scope"></slot>
          </template>
      </c-td>
    </slot>
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
          return this.columns.filter(v => {
              return v
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
