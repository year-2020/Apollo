// pages/personal/cooper.js
const { $Toast } = require('../../dist/base/index');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow: false,
    organizationName: '',
    name: '',
    position: '',
    contactNumber: '',
    contactEmail: '',
    timeNode: '',
    cooperationNeeds: '',
    projectType: [{
      id: '开发套件购买',
      name: '开发套件购买',
    }, {
      id: '低速微型套件购买',
      name: '低速微型套件购买'
    }, {
      id: '教育合作',
      name: '教育合作'
    }, {
      id: '商业合作',
      name: '商业合作',
    }, {
      id: '其他',
      name: '其他',
    }],
    activeNames: ['1'],
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 显示模态对话框
   */
  showModal: function () {
    this.setData({
      modalShow: true
    });
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      modalShow: false
    });
  },
  handleChange(event) {
    this.setData({
      result: event.detail
    });
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  changeVanField (data) {
    let curid = data.currentTarget.id;
    let val = data.detail;
    this.setData({
      [curid]: val
    });
  },
  handleSubmit () {
    let result = ''
    if (!this.data.result.length) {
      result = '请选择 项目类型'
    } else if (!this.data.organizationName.length) {
      result = '请填写 组织名称'
    } else if (!this.data.name.length) {
      result = '请填写 姓名'
    } else if (!this.data.position.length) {
      result = '请填写 职位'
    } else if (!this.data.contactNumber.length) {
      result = '请填写 联系电话'
    } else if (!this.data.contactEmail.length) {
      result = '请填写 联系邮箱'
    }
    if (!result) {
      let param = {
        projectType: this.data.result,
        organizationName: this.data.organizationName,
        name: this.data.name,
        position: this.data.position,
        contactNumber: this.data.contactNumber,
        contactEmail: this.data.contactEmail,
        timeNode: this.data.timeNode,
        cooperationNeeds: this.data.cooperationNeeds
      }
      app.api._fetch({
        url: '/community/cooperateRegiste/add',
        method: 'post',
        data: param,
      }).then((res) => {
        this.showModal()
      }).catch((error) => {
        console.log(error);
      });
    } else {
      $Toast({
        content: result,
        icon: 'close',
        duration: 1
      });
    }
  }
})