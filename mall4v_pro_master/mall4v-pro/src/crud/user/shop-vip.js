export const tableOption = {
  menu: false,
  selection: true,
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 0,
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
    label: '用户昵称',
    prop: 'userNickName',
    search: true
  },
  {
    label: '分销员',
    prop: 'nickName',
    search: true
  },{
    label: '绑定时间',
    prop: 'bindTime'
  }]
}
