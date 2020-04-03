export const tableOption = {
  border: true,
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
  column: [
    {
      label: '手机号',
      search: true,
      hide: true,
      prop: 'mobile'
    }, {
      label: '申请时间',
      hide: true,
      type: 'datetimerange',
      prop: 'dateRange'
    },
    // 列表数据
    {
      label: '昵称',
      prop: 'nickName'
    }, {
      label: '手机号',
      prop: 'userMobile'
    }, {
      label: '邀请人',
      prop: 'parentNickName',
      slot: true
    }, {
      label: '积累消费金额',
      prop: 'sumOfConsumption',
      sortable: true,
      slot: true
    }, {
      label: '积累消费笔数',
      prop: 'expenseNumber',
      sortable: true,
      slot: true
    }, {
      label: '申请时间',
      prop: 'auditingTime',
      type: 'datetimerange',
      sortable: true
    }, {
      width: 150,
      label: '审核状态',
      search: true,
      type: 'select',
      prop: 'state',
      dicData: [
        {
          label: '待审核',
          value: 0
        }, {
          label: '审核通过',
          value: 1
        }, {
          label: '审核未通过',
          value: -1
        }
      ]
    }, {
      label: '操作人',
      prop: 'sysUsername'
    }
  ]
}
