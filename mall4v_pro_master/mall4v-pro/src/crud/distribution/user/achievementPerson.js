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
    label: '分销员姓名',
    prop: 'nickName',
    search: true,
    slot:true
  },
  {
    label: '手机号',
    prop: 'userMobile',
    search: true,
    slot:true
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
    label: '可提现佣金',
    prop: 'settledAmount',
    slot:true
  },
  {
    label: '待结算佣金',
    prop: 'unsettledAmount',
    slot:true
  },
  {
    label: '分销员总佣金',
    prop: 'personAmount',
    slot: true
  }]
}
