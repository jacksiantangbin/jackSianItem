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
  column: [
    {
      label: '流水账号',
      prop: 'id'
    },
    {
      label: '租户名称',
      prop: 'tenantName',
      slot:true
    },
    {
      label: '银行卡号',
      prop: 'bankCard',
      search: true,
      slot:true
    },
    {
      label: '开户银行',
      prop: 'bankName',
      slot:true
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
      type: 'select',
      search: true,
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
      label: '审核备注',
      prop: 'refuseReason'
    },
    {
      label: '更新时间',
      prop: 'updateTime'
    }
  ]
}
