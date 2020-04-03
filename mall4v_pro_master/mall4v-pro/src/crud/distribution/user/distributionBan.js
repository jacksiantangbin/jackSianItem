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
    width: 150,
    label: '原因',
    prop: 'banReason',
    type: 'select',
    search: true,
    dicData: [
      {
        label: '失去联系',
        value: 0
      }, {
        label: '恶意刷单',
        value: 1
      }, {
        label: '开挂',
        value: 2
      }, {
        label: '其他',
        value: 3
      }
    ]
  },
  {
    label: '备注',
    prop: 'remarks',
    dicData: [
      {
        label: '无',
        value: ''
      }
    ]
  }, {
    label: '操作人',
    prop: 'username',
    slot: true
  }, {
    label: '操作时间',
    prop: 'updateTime',
    sortable: true
  }, {
    width: 150,
    label: '类型',
    prop: 'state',
    type: 'select',
    search: true,
    dicData: [
      {
        label: '封禁',
        value: -1
      }, {
        label: '解除封禁',
        value: 0
      }, {
        label: '清退',
        value: 1
      }, {
        label: '其他',
        value: 2
      }
    ]
  }
  ]
}
