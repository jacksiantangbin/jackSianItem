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
    prop: 'userAccount'
  },
  {
    label: '租户名称',
    prop: 'tenantName',
    search: true
  },
  {
    label: '手机号',
    prop: 'tenantPhone',
    search: true
  },
  {
    label: '门店总数',
    prop: 'storeCount',
    slot: true
  },
  {
    label: '可提现佣金',
    prop: 'settledAmount',
    slot: true,
  },
  {
    label: '待结算佣金',
    prop: 'unsettledAmount',
    slot: true
  },
  {
    label: '租户总佣金',
    prop: 'tenantAmount',
    slot: true
  }]
}
