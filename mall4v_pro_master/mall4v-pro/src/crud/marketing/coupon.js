export const tableOption = {
  border: true,
  selection: false,
  index: false,
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
    label: '优惠券名',
    prop: 'couponName',
    search: true
  }, {
    label: '优惠券类型',
    prop: 'couponType',
    type: 'select',
    slot: true,
    dicData: [
      {
        value: 1,
        label: '代金券'
      }, {
        value: 2,
        label: '折扣券'
      }, {
        value: 3,
        label: '兑换券'
      }
    ]
  }, {
    label: '开始时间',
    prop: 'startTime'
  }, {
    label: '结束时间',
    prop: 'endTime'
  }, {
    label: '过期状态',
    prop: 'overdueStatus',
    search: true,
    type: 'select',
    slot: true,
    dicData: [
      {
        value: 1,
        label: '未过期'
      }, {
        value: 0,
        label: '过期'
      }
    ]
  }, {
    label: '投放状态',
    prop: 'putonStatus',
    search: true,
    type: 'select',
    slot: true,
    dicData: [
      {
        value: 1,
        label: '已投放'
      }, {
        value: 0,
        label: '等待投放'
      }, {
        value: 2,
        label: '取消投放'
      }
    ]
  }, {
    label: '库存',
    prop: 'stocks'
  }]
}
