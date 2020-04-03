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
    label: '登录账号',
    prop: 'userAccount',
    slot: true
  },
  {
    label: '门店名称',
    prop: 'name',
    search: true,
    slot: true
  },
  {
    label: '店长电话',
    prop: 'shopownerPhone',
    slot: true
  },
  {
    label: '租户名称',
    prop: 'tenantName',
    search: true
  },
  {
    label: '分销员总数',
    prop: 'userCount'
  },
  {
    label: '可提现佣金',
    prop: 'addAmount',
    slot: true
  },
  {
    label: '待结算佣金',
    prop: 'unsettledAmount',
    slot: true
  },
  {
    label: '门店总佣金',
    prop: 'storeAmount',
    slot: true
  }]
}
