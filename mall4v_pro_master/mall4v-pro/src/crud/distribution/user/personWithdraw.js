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
    label: '流水账号',
    prop: 'withdrawCashId',
    search: true
  },
  {
    label: '姓名',
    prop: 'nickName',
    search: true,
    slot: true
  },
  {
    label: '手机号',
    prop: 'userMobile',
    slot: true,
    search: true
  },
  {
    label: '银行卡号',
    slot: true,
    prop: 'bankNumber'
  },
  {
    label: '开户银行',
    slot: true,
    prop: 'bankName'
  },
  {
    label: '提现金额',
    prop: 'amount'
  },
  {
    label: '申请时间',
    prop: 'createTime'
  },
  {
    label: '审核状态',
    prop: 'state',
    search: true,
    type: 'select',
    dicData: [
      {
        label: '回退',
        value: -1
      }, {
        label: '提现中',
        value: 0
      },
      {
        label: '提现成功',
        value: 1
      }, {
        label: '拒绝',
        value: 2
      },
      {
        label: '审核通过',
        value: 3
      },
      {
        label: '打款中',
        value: 4
      }
    ]
  },
  {
    label: '所属门店',
    slot: true,
    prop: 'name'
  },
  {
    label: '所属租户',
    slot: true,
    prop: 'tenantName'
  },
  {
    label: '不通过原因',
    prop: 'refuseReason'
  },
  {
    label: '更新时间',
    prop: 'updateTime'
  }]
}
