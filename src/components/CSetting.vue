<template>
  <div>
    <el-popover
      placement="bottom"
      ref="settingPopover"
      width="40"
      trigger="click">
        <draggable v-model="ordering" @end="$emit('orderEnd', $event)">
          <el-checkbox
            :label="column.label || column.type"
            v-for="(column, key) in ordering"
            :checked="!column.noDisplay"
            :style="{margin: '8px 0', display: 'block'}"
            @change="$emit('isDisplay', key, $event)"
            :key="'setting-'+key">
          </el-checkbox>
        </draggable>
    </el-popover>
    <el-button v-popover:settingPopover class="pull-right">设置</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import Draggable from 'vuedraggable'
export default{
  name: 'CSetting',
  components: { Draggable },
  props:{
    columns: {
        default: () => []
    }
  },
  data(){
    return {

    }
  },
  mounted(){

  },
  computed: {
    ordering: {
      get(){
        return this.columns
      },
      set(value){
        this.$emit("ordering", value)
      }
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
