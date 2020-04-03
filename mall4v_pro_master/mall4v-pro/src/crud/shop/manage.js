export const tableOption = {
  border: true,
  selection: true,
  index: true,
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
    value: 'value',
  },
  column: [
    {
      label: '门店名称',
      prop: 'name',
      search: true,
      slot: true
    },
    {
      label: '店长手机号',
      prop: 'shopownerPhone',
      search: true,
      slot: true
    },
    {
      label: '店长姓名',
      prop: 'shopownerName',
      search: true,
      slot: true
    },
    {
      label: '登录账号',
      prop: 'userAccount',
      slot: true
    },
    {
      label: '已结算佣金',
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
    },
  ]
}
