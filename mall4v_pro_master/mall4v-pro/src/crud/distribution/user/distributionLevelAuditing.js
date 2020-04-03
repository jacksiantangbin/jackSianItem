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
    // 搜索数据
    {
      label: '手机号',
      search: true,
      hide: true,
      prop: 'mobile'
    }, {
      label: '申请时间',
      search: true,
      hide: true,
      type: 'datetimerange',
      prop: 'dateRange'
    },
    // 列表数据
    {
      label: '昵称',
      prop: 'nickName',
      slot: true
    }, {
      label: '手机号',
      prop: 'userMobile',
      slot: true
    }, {
      label: '申请时间',
      prop: 'createTime',
      type: 'datetimerange',
      sortable: true
    }, {
      label: '申请等级',
      prop: 'levelName',
      dicData: [
        {
          label: '等级已失效',
          value: ''
        }
      ]
    }, {
      label: '当前等级',
      prop: 'nowLevel',
      slot: true
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
        }, {
          label: '已失效',
          value: 2
        }
      ]
    }, {
      label: '操作人',
      prop: 'username',
      slot: true
    }
  ]
}
