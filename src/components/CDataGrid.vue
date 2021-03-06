<script>
import Vue from 'vue'
import CTable from './CTable'
import CSetting from './CSetting'
import CPagination from './CPagination'
export default {
    name: 'CDataGrid',
    components: { CTable, CPagination},
    props: {
        defaultColumnProps: {},
        defaultDisplay: true,
        paginations: {
            default: () => {}
        },
        columns: {
            default: () => []
        },
        dataLoadHandler: {

        },
        searchQueryHandler: {
            default: () => (query) => query
        },
        formatRowData: {
            default: () => (data) => data
        },
        sortChangeHandler: undefined
    },
    data() {
        return {
            sort: '',
            tableBodyColumns: [],
            resetTable: false,
            listLoading: false,
            tableData: [],
            //scopedSlots: {},
            //slotColumns: []
        }
    },
    computed: {
        mPaginations: function (){
            return Object.assign({
                page: 1,
                total: 0,
                currentPage: 1,
                pageSize: 5,
            }, this.$props.paginations)
        },
        computedDefaultColumnProps(){
            return Object.assign({}, {
                display: true
            }, this.defaultColumnProps)
        },
        computedScopedSlots(){
            let scopedSlots = Object.assign({}, this.$scopedSlots)
            let tableBodySlots = []
            this.tableBodyColumns.map(({ column, slotName, vNode }) => {
                if(vNode && column.display){
                    if(slotName){
                        scopedSlots[slotName] = vNode
                    }else{
                        tableBodySlots.push(vNode)
                    }
                }
            })
            if(tableBodySlots.length > 0){
                scopedSlots.tableBody = props => tableBodySlots
            }
            return scopedSlots
        },
        mSortChangeHandler: function(){
            if(this.$props.sortChangeHandler !== undefined){
                return this.$props.sortChangeHandler
            }else{
                return ({column, prop, order}) => {
                    if(prop){
                        this.sort = prop + '.' + (order == 'descending' ? 'desc' : 'asc')
                    }else{
                        this.sort = ''
                    }
                    this.fetchData();
                }
            }
        }
    },
    beforeCreate(){

    },
    created() {
      this.tableBodyColumns = this.initTableBodyColumns()
      this.fetchData()
    },
    render(h){
      return h('div', {}, [
          this.renderSetting(h),
          //this.renderJson(h),
          this.renderTable(h),
          this.renderPagination(h)
      ])
    },
    methods: {
      initTableBodyColumns(columns){
        let index = 0
        let tableBodyColumns = []
        const defaultColumn = {column: {}, template: undefined, component: undefined, slotName: undefined, vNode: undefined}

        if(this.$slots.hasOwnProperty("tableBody")){
            this.$slots.tableBody.map((vNode, index) => {
              if(vNode.data != undefined && vNode.data.hasOwnProperty("attrs")){
                let column = Object.assign({}, this.computedDefaultColumnProps, vNode.data.attrs)
                tableBodyColumns.push(Object.assign({}, defaultColumn, { vNode, column, index: index++, display: column.display}))
              }
            })
        }

        this.columns.map(column => {
          column = Object.assign({}, this.computedDefaultColumnProps, column)
          let vNode = undefined
          let slotName = column.slotName || column.prop || undefined
          let template = column.template || undefined
          let render = column.render  || undefined
          let component = column.component || undefined
          if(template){
            const { $data, $options } = this.$parent;
            template = Object.assign({}, typeof template == 'string' ? {
                template: template,
                data: () => $data,
                props: ["$index", "$value", "$scope", "$row", "$column"],
                computed: $options.computed,
                components: $options.components,
                methods: $options.methods,
                filters: $options.filters
            } : template)
          }
          if(slotName !== undefined && render){
              vNode = (props) => render(this.$createElement, props)
          }

          tableBodyColumns.push(Object.assign({}, defaultColumn, { column, template, component, slotName, vNode, index: index++, display: column.display}))
        })
        return tableBodyColumns
      },
      renderSetting(h){
        return h(CSetting, {
          props: {
            columns: this.tableBodyColumns
          },
          on: {
            'columnsOrdering': this.columnsOrdering,
            'handleCheckAllChange': this.handleCheckAllChange,
            'handleReset': this.handleReset,
          }
        })
      },
      renderJson(h){
        return h("tree-view", {
          props: {
            data: this.tableData
          }
        })
      },
      renderTable(h){
        return h(CTable, {
          attrs:{
          },
          props: {
            resetTable: this.resetTable,
            tableData: this.tableData,
            listLoading: this.listLoading,
            columns: this.tableBodyColumns
          },
          on: {
            "sort-change": this.mSortChangeHandler
          },
          scopedSlots: this.computedScopedSlots
        })
      },
      renderPagination(h){
        return h(CPagination, {
          props: { ...this.mPaginations },
          on: {
            "current-change": this.handleCurrentChange,
            "size-change": this.handleSizeChange
          },
        })
      },
      handleCheckAllChange($event){
        this.tableBodyColumns = this.tableBodyColumns.filter(({ column }, index) => {
          column.display = $event
          return true
        })
      },
      handleReset(){
        let tableBodyColumns = []
        this.tableBodyColumns.map((column) => {
          column.column.display = column.display
          tableBodyColumns[column.index] = column
        })
        this.tableBodyColumns = tableBodyColumns
      },
      columnsOrdering(value){
        this.resetTable = true
        this.tableBodyColumns = value
        this.$nextTick(() => {
          this.resetTable = false
        })
      },
      getDefaultSearchQuery(){
          return {
              sort: this.sort,
              page: this.mPaginations.currentPage,
              size: this.mPaginations.pageSize,
          }
      },
      fetchData() {
          this.listLoading = true
          this.$emit("fetch-data-start")
          this.$props.dataLoadHandler(this.$props.searchQueryHandler(this.getDefaultSearchQuery()))
          .then(({ data }) => {
              this.tableData = data.data.map(item => this.$props.formatRowData(item))
              this.mPaginations.total = data.total;
              this.listLoading = false
              this.$emit("fetch-data-end", true)
          }).catch(() => {
              this.listLoading = false
              this.$emit("fetch-data-end", false)
          })
      },
      handleCurrentChange(currentPage) {
          this.$emit("current-change", currentPage)
          this.mPaginations.currentPage = currentPage
          this.fetchData();
      },
      handleSizeChange(pageSize) {
          this.$emit("size-page", pageSize)
          this.mPaginations.pageSize = pageSize
          this.fetchData();
      },
    }
}
</script>
