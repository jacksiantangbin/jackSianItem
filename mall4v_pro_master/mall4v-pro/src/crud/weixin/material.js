export const tableOption = {
  border: true,
  selection: true,
  index: false,
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
  column: [{
    label: '素材名称',
    prop: 'mediaName',
    search: true
  }, {
    label: '素材类型',
    prop: 'mediaType',
    type: 'select',
    search: true,
    dicData: [
      {
        label: '图片',
        value: 'image'
      }, {
        label: '语音',
        value: 'voice'
      }, {
        label: '视频',
        value: 'video'
      }, {
        label: '图文素材',
        value: 'news'
      }
    ]
  }, {
    label: '素材内容',
    prop: 'content',
    slot: true
  }, {
    label: '更新时间',
    prop: 'updateTime'
  }]
}
