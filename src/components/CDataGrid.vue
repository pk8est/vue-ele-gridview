<script>
import Vue from 'vue'
import CTable from './CTable'
import CSetting from './CSetting'
import CPagination from './CPagination'
export default {
    name: 'CDataGrid',
    components: { CTable, CPagination},
    props: {
        events: {
            default: () => {}
        },
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
            resetTable: false,
            listLoading: false,
            tableData: [],
            slotColumns: this.columns
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
        mColumns: {
          get(){
            return this.slotColumns.filter((column, index) => {
              column.noDisplay = column.noDisplay ? column.noDisplay : false;
              return column
            })
          },
          set(value, index){}
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
    created() {
      if(this.$slots.hasOwnProperty("tableBody")){
          this.$slots.tableBody.map((slot, index) => {
              if(slot.data != undefined && slot.data.hasOwnProperty("attrs")){
                  this.slotColumns.push(Object.assign({slot, index, sort: index}, slot.data.attrs))
              }
          })
      }

      this.fetchData()
    },
    render(h){
      return h('div', {}, [
          this.renderSetting(h),
          this.renderTable(h),
          this.renderPagination(h)
      ])
    },
    methods: {
      renderSetting(h){
        return h(CSetting, {
          props: {
            columns: this.mColumns
          },
          on: {
            'isDisplay': this.isDisplay,
            'ordering': this.ordering,
            'orderEnd': this.orderEnd
          }
        })
      },
      renderTable(h){
        const tableBodySlots = this.slotColumns.map((column, index) => {
          if(!column.noDisplay && column.slot != undefined){
            return column.slot
          }
        })
        return h(CTable, {
          attrs:{
            random: new Date().getTime()
          },
          props: {
            resetTable: this.resetTable,
            tableData: this.tableData,
            listLoading: this.listLoading,
            columns: this.mColumns
          },
          on: {
            "sort-change": this.mSortChangeHandler
          },
          scopedSlots: {
            tableBody: props => tableBodySlots
          }
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
      isDisplay (key, $event){
        let column = this.slotColumns[key]
        column.noDisplay = !$event;
        Vue.set(this.slotColumns, key, column)
      },
      ordering(value){
        this.resetTable = true
        this.slotColumns = value
        this.$nextTick(() => {
          this.resetTable = false
        })
      },
      orderEnd(event){

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
