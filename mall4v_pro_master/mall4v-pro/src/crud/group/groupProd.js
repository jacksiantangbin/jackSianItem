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
    // {
    //   label: '活动商品id',
    //   prop: 'groupProdId'
    // },
    // {
    //   label: '店铺id',
    //   prop: 'shopId'
    // },
    // {
    //   label: '活动id',
    //   prop: 'groupActivityId'
    // },
    // {
    //   label: '商品id',
    //   prop: 'prodId'
    // },
    // {
    //   label: '创建时间',
    //   prop: 'createTime'
    // }
    {
      label: '活动商品名称',
      prop: 'prodName'
    },
    {
      label: '商品图片',
      prop: 'pic',
      slot: true
    },
    {
      label: '商品活动状态',
      prop: 'groupProdStatus',
      slot: true
    }
  ]
}
