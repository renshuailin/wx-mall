// pages/list/index.js
// import { list } from '../../utils/network.js';
import { list as _list } from '../../utils/network.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1,
    size:5,
    noData:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
   wx.setNavigationBarTitle({
    //  设置页面title
     title: options.title,
   })
   wx.showLoading({
    title: '正在加载中',
  })
   wx.request({
     url: _list,
     success:(res)=>{
      // console.log(res.data);
      this.setData({
        list:res.data
      })
      wx.hideLoading()  
      }   
    })
    
  },
  Detail(e){
    let index=e.currentTarget.dataset.index
    // console.log(index);
    wx.navigateTo({
      url: `/pages/detail/index?id=${this.data.list[index].id}`,
      data:{}
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
    //显示加载状态
    wx.showNavigationBarLoading()

   
    this.setData({
      page: 1,
      noData: false
    })
    
    wx.request({
      url: _list,
      success:(res)=> {
        this.setData({
          list: res.data
        })
        // 隐藏加载状态
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(123);
    wx.showNavigationBarLoading()
    const list = this.data.list
    let page = this.data.page
    this.setData({ // 每次下拉 page+1
      page: ++page
    })
    wx.request({
      url:_list+`/${this.data.page}/${this.data.size}` ,
      
      success:(res)=>{
       if(res.data.length !=0){
        res.data.forEach((item)=>{
          list.push(item)
          
        })
        // console.log(this.data.list);
        this.setData({
          list:list
        })
       }else{
         this.setData({noData:true})
       }
        wx.hideNavigationBarLoading()
      }
    })

   
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})