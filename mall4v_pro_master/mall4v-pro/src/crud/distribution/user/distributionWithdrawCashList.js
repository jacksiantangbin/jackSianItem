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
    label: '流水号',
    prop: 'merchantOrderId',
    search: true
  }, {
    label: '金额',
    prop: 'amount',
    sortable: true

  }, {
    label: '手续费',
    prop: 'fee',
    sortable: true,
    dicData: [
      {
        label: '0.0',
        value: ''
      }
    ]
  }, {
    label: '提现时间',
    prop: 'createTime',
    sortable: true
  }, {
    width: 150,
    label: '提现类型',
    prop: 'type',
    dicData: [
      {
        label: '手动提现',
        value: 0
      }, {
        label: '自动提现',
        value: 1
      }
    ]
  }, {
    width: 150,
    label: '提现状态',
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
      }, {
        label: '已到账',
        value: 1
      }, {
        label: '其他',
        value: 2
      }
    ]
  }, {
    label: '更新时间',
    prop: 'updateTime',
    sortable: true,
    dicData: [
      {
        label: '无',
        value: ''
      }
    ]
  }]
}
