export const tableOption = {
  border: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 200,
  align: 'center',
  refreshBtn: true,
  searchSize: 'mini',
  addBtn: false,
  delBtn: false,
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
      label: '商品名称',
      prop: 'prodName',
      slot: true,
      search: true
    }, {
      label: '商品图片',
      prop: 'pic',
      slot: true
    }, {
      label: '商品价格',
      prop: 'price',
      slot: true
    }, {
      label: '门店佣金比例',
      prop: 'storeProp',
      slot: true
    }, {
      label: '分销员佣金比例',
      prop: 'staffProp',
      slot: true
    }, {
      label: '平台佣金比例',
      prop: 'platformPrice',
      slot: true
    }, {
      label: '产品分类',
      prop: 'proType',
      slot: true
    }, {
      width: 100,
      label: '佣金状态',
      search: true,
      type: 'select',
      prop: 'state',
      dicData: [
        {
          label: '佣金不收益',
          value: 2
        }, {
          label: '佣金收益',
          value: 1
        }
      ]
    }
  ]
}
