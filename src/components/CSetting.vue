<template>
  <div>
    <el-dropdown trigger="click" :hide-on-click="false">
      <el-button type="primary">
        设置<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <draggable v-model="mountedColumns">
          <el-dropdown-item v-for="({ column }, key) in mountedColumns"><el-checkbox
            :label="column.label || column.type"
            v-model="column.display"
            :style="{display: 'block'}"
            :key="'setting-'+key">
          </el-checkbox></el-dropdown-item>
        </draggable>
        <el-dropdown-item divided>
          <el-checkbox @change="$emit('handleCheckAllChange', $event)">全选</el-checkbox>
          <el-button v-bind:style="{marginLeft: '5px'}" size="mini" @click="$emit('handleReset')">重置</el-button>
          <!-- <el-checkbox v-bind:style="{marginLeft: '5px'}" @change="$emit('handleReset')">重置</el-checkbox> -->
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <el-popover
      placement="bottom"
      ref="settingPopover"
      width="40"
      trigger="click">
        <draggable v-model="mountedColumns">
          <el-checkbox
            :label="column.label || column.type"
            v-for="({ column }, key) in mountedColumns"
            v-model="!column.noDisplay"
            :style="{margin: '8px 0', display: 'block'}"
            @change="$emit('switchDisplay', key, $event)"
            :key="'setting-'+key">
          </el-checkbox>
        </draggable>
        <el-checkbox @change="$emit('handleCheckAllChange', $event)">全选</el-checkbox>
    </el-popover>
    <el-button v-popover:settingPopover class="pull-right">设置</el-button> -->
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
    mountedColumns: {
      get(){
        return this.columns
      },
      set(value){
        this.$emit("columnsOrdering", value)
      }
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
