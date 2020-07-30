// pages/detail/index.js
import {
  detail
} from "../../utils/network";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemData: {},
    baitiao: [],
    selectItem: {
      desc: '【白条支付】首单享立减优惠'
    },
    hideShow: true,
    hideBuy: true,
    badge:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    const id = options.id

    wx.showLoading({
      title: '正在加载中',
    })
    wx.request({
      url: detail,
      success: (res) => {
        // console.log(res.data);
        let result = null
        res.data.forEach((item) => {
          if (item.partData.id == id) {
            result = item
          }
        })
        this.setData({
          itemData: result.partData,
          baitiao: result.baitiao

        })

        wx.hideLoading()

        console.log(result.partData);
      }
    })
  },
  popbaitiao() {
    // console.log(123);
    this.setData({
      hideShow: false
    })

  },
  update(e) {
    // console.log(e);
    this.setData({
      selectItem: e.detail
    })

  },
  popbuy() {
    // console.log(321);

    this.setData({
      hideBuy: false

    })
  },
  upDateCount(e) {
    let data = this.data.itemData
    data.count = e.detail.val
    this.setData({
      itemData: data
    })
  },
  addCart() {
    // console.log(123);
   wx.getStorage({
      key: 'cartInfo',
      success: (res) => {
        const cartArray = res.data //查到已有数据
       
        const data = this.data.itemData //现有数据
        let have = false //判断是否存在改商品

        cartArray.forEach((item)=>{
          if(item.id==data.id){
            have=true
            item.total+=this.data.itemData.count
            wx.setStorage({
              data: cartArray,
              key: 'cartInfo',
            })
          }
        })
        if(!have){//不存在商品
          data.total=this.data.itemData.count
          cartArray.push(data)
          wx.setStorage({
            data: cartArray,
            key: 'cartInfo',
          })
        }
        this.setbadge(cartArray)


      },
      fail: () => {
        let data = this.data.itemData
        data.total = this.data.itemData.count
        // console.log(data);
        let cartArray = []
        cartArray.push(data)
        wx.setStorage({
          data: cartArray,
          key: 'cartInfo',
        })
        this.setbadge(cartArray)

      },

      complete: (res) => {},
    }),
    wx.showToast({
      title: '加入购物车成功 ',
      icon:'success',
      duration:3000
      
    })

  },
  setbadge(cartArray){
      this.setData({
        badge:cartArray.length
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
    wx.getStorage({
      key: 'cartInfo',
      success:(res)=>{
        const cartArray=res.data
        this.setbadge(cartArray)
      }
    })
  },
  showCart(){wx.switchTab({
    url: '/pages/cart/index',
  })},

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