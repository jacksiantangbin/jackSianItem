export const tableOption = {
  border: true,
  stripe: true,
  menuAlign: 'center',
  menuWidth: 350,
  align: 'center',
  refreshBtn: true,
  searchSize: 'mini',
  addBtn: false,
  delBtn: true,
  editBtn: false,
  viewBtn: false,
  selection: true,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [
    // 列表数据
    {
      search: true,
      label: '通知标题',
      prop: 'msgTitle'
    }, {
      label: '生效时间',
      prop: 'startTime',
      sortable: true
    }, {
      label: '失效时间',
      prop: 'endTime',
      sortable: true
    }, {
      label: '操作人',
      prop: 'username',
      slot: true
    }
  ]
}
