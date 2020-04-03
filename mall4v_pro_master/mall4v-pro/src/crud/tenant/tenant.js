export const tableOption = {
  border: true,
  selection: false,
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
    value: 'value'
  },
  column: [{
    label: '租户名称',
    prop: 'tenantName',
    search: true
  }, {
    label: '租户手机号',
    prop: 'tenantPhone',
    search: true
  }, {
    label: '姓名',
    prop: 'name',
    search: true
  }, {
    label: '登录账号',
    prop: 'userAccount'
  }, {
    label: '统一社会信用代码',
    prop: 'unifiedSocialCreditCode'
  }]
}
