// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray:[],
    money:'0.00', //总价
    count:0,  //个数
    selectAll:false
  },
  getCount(e){
    console.log();
    
    const index=e.currentTarget.dataset.index
    const cartArray=this.data.cartArray
    cartArray[index].total=e.detail.val
    //更新data
    this.setData({
      cartArray
    })
  },
  switchGoodDetail(e){
    const index=e.currentTarget.dataset.index
    const cartArray=this.data.cartArray
    wx.navigateTo({
      url: `/pages/detail/index?id=${cartArray[index].id}`,
    })
  },
  selectGood(e){
    const index=e.currentTarget.dataset.index
    const cartArray=this.data.cartArray

    let money=Number( this.data.money)
    let count= this.data.count

    // 选中or 不选中
    cartArray[index].select=!cartArray[index].select
    if(cartArray[index].select){
      money+=Number(cartArray[index].price)*cartArray[index].total
      count++

    }else{//没有选中
      money-=Number(cartArray[index].price)*cartArray[index].total
      count--


    }
    //更新数据
    this.setData({
      cartArray,
      money:String(money.toFixed(2)),
      count
    })

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
    wx.getStorage({
      key: 'cartInfo',
      success:(res)=>{
        const cartArray=res.data

        cartArray.forEach((item)=>{
          item.select=false
        })

        this.setData({
          cartArray
        })
         //  设置tabbar下标
        cartArray.length>0? wx.setTabBarBadge({
          index: 2,
          text: String(cartArray.length),
        }):wx.removeTabBarBadge({
          index: 2,
        })
        console.log(cartArray);
        
      }
    })
 
  
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    const cartArray=this.data.cartArray
    wx.setStorage({
      data: cartArray,
      key: 'cartInfo',
    })
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