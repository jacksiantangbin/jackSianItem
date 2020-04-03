export const tableOption = {
  border: true,
  stripe: true,
  menuAlign: 'center',
  menuWidth: 350,
  align: 'center',
  refreshBtn: true,
  searchSize: 'mini',
  addBtn: false,
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
    label: '积累收益',
    prop: 'addupAmount',
    slot: true

  }, {
    label: '一代佣金',
    prop: 'aGenerationCommission',
    sortable: true,
    slot: true

  }, {
    label: '二代佣金',
    prop: 'secondGenerationCommission',
    sortable: true,
    slot: true
  }, {
    label: '邀请奖励',
    prop: 'invitationRewards',
    sortable: true,
    slot: true
  }, {
    label: '待结算金额',
    prop: 'unsettledAmount',
    sortable: true,
    slot: true
  }, {
    label: '可提现金额',
    prop: 'settledAmount',
    sortable: true,
    slot: true
  }, {
    label: '已失效金额',
    prop: 'invalidAmount',
    sortable: true,
    slot: true
  }]
}
