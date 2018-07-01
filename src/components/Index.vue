<template>
  <div class="app-container calendar-list-container">
    <div class="app-container">
      <c-data-grid
        :dataLoadHandler="dataLoadHandler"
      >
        <template slot="tableBody">
          <c-td key="expand"  type="expand" label="详细" ></c-td>
          <c-td key="selection"  type="selection" ></c-td>
          <c-td key="index"  type="index" label="序号" ></c-td>
          <c-td key="id"  prop="id" label="ID" ></c-td>
          <c-td key="uid"  prop="uid" label="UID" ></c-td>
          <c-td key="title" prop="title" label="Title" ></c-td>
        </template>
      </c-data-grid>
    </div>
  </div>
</template>

<script>

import CDataGrid from './CDataGrid'
import CTd from './CTd'
import { list } from './data'

export default {
  name: 'Index',
  components: { CDataGrid, CTd },
  props: {

  },
  data() {
    return {
      list: list
    }
  },
  methods: {
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
