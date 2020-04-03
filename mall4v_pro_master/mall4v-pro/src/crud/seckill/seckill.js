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
      label: '秒杀活动id',
      prop: 'seckillId'
    },
    {
      label: '活动名称',
      prop: 'seckillName'
    },
    {
      label: '开始时间',
      prop: 'startTime'
    },
    {
      label: '结束时间',
      prop: 'endTime'
    },
    {
      label: '活动标签',
      prop: 'seckillTag'
    },
    {
      label: '限购数量',
      prop: 'maxNum'
    },
    {
      label: '取消订单时间',
      prop: 'maxCancelTime'
    }
  ]
}
