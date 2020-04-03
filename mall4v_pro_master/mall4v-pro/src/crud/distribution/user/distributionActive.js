export const tableOption = {
  border: true,
  stripe: true,
  menuAlign: 'center',
  menuWidth: 350,
  align: 'center',
  refreshBtn: true,
  addBtn: false,
  searchSize: 'mini',
  menu: false,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '分销员昵称',
    prop: 'nickName',
    slot: true
  }, {
    label: '分销员手机号',
    prop: 'userMobile',
    slot: true,
    search: true
  }, {
    label: '最后登陆IP',
    prop: 'lastIp'

  }, {
    label: '最后登陆时间',
    prop: 'lastTime',
    sortable: true

  }]
}
