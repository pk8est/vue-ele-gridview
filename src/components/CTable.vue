<template>
  <el-table
    :data="tableData" 
  >
    <slot></slot>
  </el-table>
</template>

<script>
import Vue from 'vue'
import CTd from './CTd'

export default{
 name: 'CTable',
 components: { CTd },
 props:{
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
