// components/rule/rule.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm: function () {
      this.hideModal();
    },
    preventTouchMove: function () { },
    hideModal: function () {
      this.setData({
        showModal: false
      })
    },
  }
})
