<template>
  <div class="app-container calendar-list-container">
    <div class="app-container">
      <c-data-grid
        :columns="columns"
        :dataLoadHandler="dataLoadHandler"
      >
        <!-- <template slot="tableBody">
          <c-td key="expand"  type="expand" label="详细" ></c-td>
          <c-td key="selection"  type="selection" ></c-td>
          <c-td key="index"  type="index" label="序号" ></c-td>
          <c-td key="id"  prop="id" label="ID" ></c-td>
          <c-td key="uid"  prop="uid" label="UID" ></c-td>
          <c-td key="title" prop="title" label="Title" ></c-td>
          <c-td key="mark_time" prop="mark_time" label="MarkTime" >
            <el-button size="mini" slot-scope="scope">
              {{scope.row.mark_time * 1000 | parseTime('{y}-{m}-{d} {h}:{i}')}}
            </el-button>
          </c-td>
          <c-td key="cover" prop="cover" label="封面" noDisplay="true">
            <img :src="row.cover" slot-scope="{ row }"/>
          </c-td>
          <c-td label="操作" >
            <el-button @click="clickHandler" size="mini" slot-scope="scope">
              {{ scope.row.live_id }}
            </el-button>
          </c-td>
        </template> -->

        <template slot="handerSlot" scope="{ $row, $index }">
          <el-button type="primary" size="mini" @click="clickHandler($row, $index)">编辑</el-button>
        </template>

      </c-data-grid>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import CDataGrid from './CDataGrid'
import CTd from './CTd'
import { list } from './data'
import { parseTime } from './util'

export default {
  name: 'Index',
  components: { CDataGrid, CTd },
  props: {

  },
  data() {
    let that = this
    return {
      list: list,
      columns: [
        {type: 'selection'},
        {type: 'expand', noDisplay: true},
        {type: 'index'},
        {prop: 'id', label: 'ID', sortable: 'custom'},
        {prop: 'uid', label: 'UID', render: (h, props) => {
            return h('el-button', {
              props: {size: 'mini'},
              on: {
                click: this.clickHandler
              }
            }, props.row.uid)
          }
        },
        {prop: 'title', label: 'Title', value: (value, index) => '#' + value},
        {prop: 'mark_time', label: '标记时间', template: `<el-button @click="clickHandler" size="mini">{{$value | parseTime}}</el-button>`},
        {prop: 'mark_time2', label: '标记时间', component: {
            template: `<el-button size="mini">是</el-button>`
          }
        },
        {prop: 'cover', label: '封面', template: `<img :src="$value"/>`, noDisplay: true},
        {prop: 'hander', label: '操作', fixed: "right", slotName: 'handerSlot'}
      ]
    }
  },
  filters: {
    parseTime
  },
  methods: {
    clickHandler(){
      //this.columns = []
      //console.info(this.columns)
      console.info("clickHandler")
    },
    dataLoadHandler(query){
      const total = this.list.length
      const start = Math.max(Math.min((query.page - 1) * query.size , total), 0);
      const end = start + query.size;
      const data = list.slice(start, end)

      return Promise.resolve({
        code:1,
        data: {
          total,
          data
        }
      });
    }
  }
}
</script>
