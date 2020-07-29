// pages/home/index.js
//引入网络接口
import { homepage } from '../../utils/network.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:[],
    logo:[],
    page:[],
    quick:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载中',
    })
    wx.request({
      url: homepage,
      // header:{
      //   'content-type':'application/json',

      // },
      success:(res)=>{
          // console.log(res);
          this.setData({
            swiper:res.data.swipers,
            logo:res.data.logos,
            page:res.data.pageRow,
            quick:res.data.quicks
          })
          wx.hideLoading()  
      }
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