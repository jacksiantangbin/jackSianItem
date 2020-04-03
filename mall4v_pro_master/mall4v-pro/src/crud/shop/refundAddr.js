export const tableOption = {
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [
    {
      label: '收货人',
      prop: 'receiverName'
    },
    {
      label: '手机号码',
      prop: 'receiverMobile'
    },
    {
      label: '公司座机',
      prop: 'receiverTelephone'
    },
    {
      label: '邮政编码',
      prop: 'postCode'
    },
    {
      label: '身份',
      prop: 'province'
    },
    {
      label: '城市',
      prop: 'city'
    },
    {
      label: '区/镇',
      prop: 'area'
    },
    {
      label: '详细地址',
      prop: 'addr'
    },
    {
      label: '默认',
      prop: 'defaultAddr',
      type: 'select',
      dicData: [
        {
          label: '否',
          value: 0
        }, {
          label: '是',
          value: 1
        }
      ]
    },
    {
      label: '状态',
      prop: 'status',
      type: 'select',
      dicData: [
        {
          label: '禁用',
          value: 0
        }, {
          label: '可用',
          value: 1
        }
      ]
    }
  ]
}
