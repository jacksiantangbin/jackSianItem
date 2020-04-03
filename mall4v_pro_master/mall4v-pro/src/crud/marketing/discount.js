export const tableOption = {
  border: true,
  selection: false,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 350,
  align: 'center',
  refreshBtn: true,
  searchSize: 'mini',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '活动名称',
    prop: 'discountName',
    search: true
  }, {
    label: '开始时间',
    prop: 'startTime'
  }, {
    label: '结束时间',
    prop: 'endTime'
  }, {
    width: 150,
    label: '状态',
    prop: 'status',
    search: true,
    slot: true,
    type: 'select',
    dicData: [
      {
        label: '关闭',
        value: 0
      }, {
        label: '开启',
        value: 1
      }
    ]
  }
  ]
}
