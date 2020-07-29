// pages/detail/index.js
import { detail } from "../../utils/network";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemData:{},
    baitiao:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    const id=options.id
    
    wx.showLoading({
      title: '正在加载中',
    })
    wx.request({
      url:detail ,
      success:(res)=>{
        // console.log(res.data);
        let result=null
        res.data.forEach((item)=>{
          if(item.partData.id==id){
            result=item
          }        
        })
        this.setData({
          itemData:result.partData,
          baitiao:result.baitiao

        })
        
        wx.hideLoading()
        
        console.log(result.partData);
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