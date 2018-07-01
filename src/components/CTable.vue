<template>
  <el-table>
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
