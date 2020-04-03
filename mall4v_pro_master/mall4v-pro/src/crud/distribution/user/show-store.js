export const tableOption = {
  menu:false,
  border: true,
  selection: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 200,
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
    label: '原门店名称',
    prop: 'fromStoreName'
  }, {
    label: '新门店名称',
    prop: 'toStoreName'
  },
  {
    label: '转店时间',
    prop: 'changeDate'
  }]
}
