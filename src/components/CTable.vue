<template>
  <el-table
     v-if="!resetTable"
    :data="tableData"
  >
    <slot name="tableBody"></slot>
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
 },
 data(){
    return {

    }
 },
 created(){

 },
 computed: {

 },
 methods: {

 }
}
</script>
