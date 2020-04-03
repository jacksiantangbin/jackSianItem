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
  viewBtn: false,
  selection: false,
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
    label: '订单号',
    prop: 'orderNumber',
    search: true
  }, {
    label: '佣金',
    prop: 'incomeAmount',
    sortable: true

  }, {
    label: '创建时间',
    prop: 'createTime',
    sortable: true

  }, {
    label: '更新时间',
    prop: 'updateTime',
    sortable: true

  }, {
    width: 150,
    label: '奖励类型',
    prop: 'incomeType',
    dicData: [{
      label: '一级奖励',
      value: 1
    }, {
      label: '二级奖励',
      value: 2
    }, {
      label: '邀请奖励',
      value: 3
    }
    ]
  }, {
    width: 150,
    label: '订单状态',
    prop: 'status',
    slot: true
  }, {
    width: 150,
    label: '佣金状态',
    prop: 'state',
    search: true,
    type: 'select',
    dicData: [
      {
        label: '待用户付款',
        value: 0
      }, {
        label: '待结算',
        value: 1
      }, {
        label: '可提现',
        value: 2
      }, {
        label: '冻结',
        value: 3
      }, {
        label: '失效',
        value: -1
      }
    ]
  }
  ]
}
