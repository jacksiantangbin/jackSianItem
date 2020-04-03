export const groupOrderOption = {
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
    {
      label: '团单ID',
      prop: 'groupOrderId'
    },
    {
      label: '拼团ID',
      prop: 'groupBuyId'
    },
    {
      label: '活动商品ID',
      prop: 'groupGoodsId'
    },
    {
      label: '规格名称',
      prop: 'goodsName',
      select: true
    },
    {
      label: '产品图片',
      prop: 'prodPic',
      type: 'upload',
      imgWidth: 150,
      listType: 'picture-img'

    },
    {
      label: '拼单状态',
      prop: 'status',
      select: true,
      slot: true
    },
    {
      label: '参团人数',
      prop: 'joinNum'
    },
    {
      label: '成团人数',
      prop: 'groupNum'
    },
    {
      label: '成团人数',
      prop: 'groupNum'
    },
    {
      label: '拼团开始时间',
      prop: 'startTime'
    },
    {
      label: '拼团结束时间',
      prop: 'endTime'
    }
  ]
}
