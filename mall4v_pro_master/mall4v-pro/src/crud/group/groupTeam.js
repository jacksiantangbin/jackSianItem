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
      label: '开团时间',
      prop: 'startTime'
    },
    {
      label: '参团人数',
      prop: 'groupNumber',
      slot: true
    },
    {
      label: '订单总金额',
      prop: 'totalPrice'
    },
    {
      label: '订单状态',
      prop: 'status',
      dicData: [
        {
          label: '待成团',
          value: 0
        }, {
          label: '拼团中',
          value: 1
        }, {
          label: '拼团成功',
          value: 2
        }, {
          label: '拼团失败',
          value: 3
        }
      ]
    }
  ]
}
