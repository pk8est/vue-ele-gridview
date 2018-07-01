<template>
    <el-table-column v-bind="$attrs" v-if="$scopedSlots.default != undefined">
      <template slot-scope="scope">
        <slot v-bind="scope"></slot>
      </template>
    </el-table-column>
    <el-table-column v-else v-bind="$attrs"></el-table-column>
</template>

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

  },
  created() {

  },
  methods: {

  }
}
</script>
