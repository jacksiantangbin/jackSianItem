export const tableOption = {
  menu: false,
  border: true,
  index: true,
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
  column: [
    // 搜索数据
    {
      label: '客户',
      prop: 'userName',
      search: true,
      hide: true
    }, {
      label: '分销员',
      prop: 'parentName',
      search: true,
      hide: true
    },
    {
      label: '客户',
      prop: 'nickName',
      slot: true
    }, {
      label: '分销员',
      prop: 'parentNickName',
      slot: true
    }, {
      label: '绑定关系时间',
      prop: 'bindTime',
      sortable: true
    }, {
      label: '关系结束时间',
      prop: 'invalidTime',
      sortable: true,
      dicData: [
        {
          label: '无',
          value: ''
        }
      ]
    }, {
      width: 150,
      label: '当前关系',
      prop: 'state',
      search: true,
      type: 'select',
      dicData: [
        {
          label: '失效',
          value: -1
        }, {
          label: '待绑定',
          value: 0
        }, {
          label: '绑定中',
          value: 1
        }
      ]
    }]
}
