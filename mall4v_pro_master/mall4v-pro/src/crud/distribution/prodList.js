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
      label: '产品名称',
      prop: 'prodName',
      slot: true,
      search: true
    }, {
      label: '产品图片',
      prop: 'pic',
      slot: true
    }, {
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
