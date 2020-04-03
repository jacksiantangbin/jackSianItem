export const tableOption = {
  menu: false,
  border: true,
  selection: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 90,
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
    label: '昵称',
    prop: 'userNickName',
    search: true
  },
  {
    label: '分销员',
    prop: 'nickName',
    search: true
  },
  {
    label: '门店名称',
    prop: 'storeName',
    search: true
  },
  {
    label: '租户名称',
    prop: 'tenantName',
    search: true
  },
  {
    label: '绑定时间',
    prop: 'bindTime'
  }]
}
