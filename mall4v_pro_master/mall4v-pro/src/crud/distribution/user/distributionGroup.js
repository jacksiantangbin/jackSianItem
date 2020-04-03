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
      label: '分组名称',
      prop: 'groupName'
    }, {
      label: '修改时间',
      prop: 'updateTime',
      sortable: true
    }, {
      label: '操作人',
      prop: 'username',
      slot: true
    }
  ]
}
