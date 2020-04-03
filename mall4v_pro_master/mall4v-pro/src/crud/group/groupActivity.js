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
      label: '活动名称',
      prop: 'activityName',
      search: true
    },
    {
      label: '拼团类型',
      prop: 'groupNumber',
      slot: true
    },
    {
      label: '成团订单数',
      prop: 'groupOrderCount'
    },
    {
      label: '活动开始时间',
      prop: 'startTime'
    },
    {
      label: '活动结束时间',
      prop: 'endTime'
    },
    {
      label: '活动状态',
      prop: 'activityStatus',
      slot: true
    }
  ]
}
