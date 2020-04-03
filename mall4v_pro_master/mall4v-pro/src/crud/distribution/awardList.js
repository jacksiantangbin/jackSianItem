export const tableOption = {
  border: true,
  stripe: true,
  menuAlign: 'center',
  menuWidth: 350,
  align: 'center',
  refreshBtn: true,
  searchSize: 'mini',
  addBtn: false,
  delBtn: true,
  editBtn: false,
  viewBtn: false,
  selection: true,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [
    // 列表数据
    {
      label: '奖励名称',
      prop: 'awardName',
      search: true
    }, {
      width: 150,
      label: '状态',
      search: true,
      type: 'select',
      prop: 'awardType',
      dicData: [
        {
          label: '无',
          value: -1
        },
        {
          label: '佣金',
          value: 0
        }, {
          label: '积分',
          value: 1
        }, {
          label: '实物',
          value: 2
        }, {
          label: '其他',
          value: 3
        }
      ]
    },
    {
      label: '奖励数额',
      prop: 'awardNumber',
      sortable: true
    },
    {
      label: '操作人',
      prop: 'username',
      slot: true
    },
    {
      label: '操作时间',
      prop: 'updateTime',
      sortable: true
    },
    {
      width: 150,
      label: '状态',
      search: true,
      type: 'select',
      prop: 'state',
      dicData: [
        {
          label: '未上架',
          value: 0
        }, {
          label: '上架',
          value: 1
        }
      ]
    }
  ]
}
