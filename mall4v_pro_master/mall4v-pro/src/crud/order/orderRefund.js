export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [
    {
      label: '退款编号',
      prop: 'refundSn',
      search: true
    },
    {
      label: '申请方式',
      prop: 'applyType',
      type: 'select',
      select: true,
      dicData: [
        {
          label: '仅退款',
          value: 1
        }, {
          label: '退款退货',
          value: 2
        }
      ]
    },
    {
      label: '订单编号',
      prop: 'orderNumber',
      search: true
    },
    {
      label: '订单金额',
      prop: 'orderAmount'
    },
    {
      label: '退款金额',
      prop: 'refundAmount'
    },
    {
      label: '申请时间',
      prop: 'applyTime',
      type: 'datetimerange',
      search: true
    },
    {
      label: '退款状态',
      prop: 'returnMoneySts',
      search: true,
      type: 'select',
      dicData: [
        {
          label: '退款申请',
          value: 1
        }, {
          label: '处理退款',
          value: 2
        }, {
          label: '买家已发货',
          value: 3
        }, {
          label: '等待退款',
          value: 4
        }, {
          label: '退款成功',
          value: 5
        }, {
          label: '买家撤销申请',
          value: 6
        }, {
          label: '商家拒绝退款',
          value: 7
        }, {
          label: '退款关闭',
          value: -1
        }
      ]
    }
  ]
}
