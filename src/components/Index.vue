<template>
  <div class="app-container calendar-list-container">
    <div class="app-container">
      <c-data-grid>
        <template slot="tableBody">
          <c-td key="expand"  type="expand" label="详细" ></c-td>
          <c-td key="selection"  type="selection" ></c-td>
          <c-td key="index"  type="index" label="序号" ></c-td>
          <c-td key="managerId"  prop="managerId" label="ID" ></c-td>
          <c-td key="udb"  prop="udb" label="UDB" ></c-td>
          <c-td key="realname" prop="realname" label="Name" ></c-td>
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
  }
}
</script>
