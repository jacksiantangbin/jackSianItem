export const tableOption = {
  border: true,
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  menu: false,
  column: [
    {
      label: '分销员手机号',
      prop: 'userMobile',
      slot: true,
      search: true,
      searchLabelWidth: '120',
      hide: true
    },
    {
      label: '分销员昵称',
      prop: 'nickName',
      slot: true
    },
    {
      label: '待结算金额变更数额',
      prop: 'unsettledAmount'
    },
    {
      label: '可提现金额变更数额',
      prop: 'settledAmount'
    },
    {
      label: '失效金额变更数额',
      prop: 'invalidAmount'
    },
    {
      label: '积累收益变更数额',
      prop: 'addupAmount'
    },
    {
      label: '备注',
      prop: 'remarks'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    }

  ]
}
