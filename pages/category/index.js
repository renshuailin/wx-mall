// pages/category/index.js
import {
  product
} from '../../utils/network.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeft: [],
    navRight: [],
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载中',
    })
    wx.request({
      url: product,
      success: (res) => {
        console.log(res.data);
        this.setData({
          navLeft: res.data.navLeftItems,
          navRight: res.data.navRightItems,
        })
        wx.hideLoading()
      }
    })
  },
  current(e) {
    let index = e.currentTarget.dataset.index
    // console.log(index);
    this.setData({
      currentIndex: index
    })

  },
  showListView(e) {
    // console.log(e);
    let txt = e.currentTarget.dataset.txt
    wx.navigateTo({
      url: '/pages/list/index?title=' + txt,
    })
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

  }
})