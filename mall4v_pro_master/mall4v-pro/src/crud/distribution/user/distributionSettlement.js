export const tableOption = {
  border: true,
  stripe: true,
  menuAlign: 'center',
  menuWidth: 350,
  align: 'center',
  refreshBtn: true,
  searchSize: 'mini',
  addBtn: false,
  delBtn: false,
  editBtn: false,
  menu: true,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '订单号',
    prop: 'orderNumber'
  }, {
    label: '订单状态',
    prop: 'status',
    search: true,
    type: 'select',
    dicData: [
      {
        label: '待付款',
        value: 0
      }, {
        label: '待发货',
        value: 1
      }, {
        label: '待收货',
        value: 2
      }, {
        label: '已完成',
        value: 3
      }, {
        label: '已取消',
        value: -1
      }
    ]

  }, {
    label: '订单总金额',
    prop: 'sumAmount'
  }]
}
