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
      label: '拼团活动商品规格id',
      prop: 'groupSkuId'
    },
    {
      label: '拼团活动商品id',
      prop: 'groupProdId'
    },
    {
      label: '商品规格id',
      prop: 'skuId'
    },
    {
      label: '活动价格',
      prop: 'actPrice'
    },
    {
      label: '团长价格',
      prop: 'leaderPrice'
    },
    {
      label: '已售数量',
      prop: 'sellNum'
    }
  ]
}
