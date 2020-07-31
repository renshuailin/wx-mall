// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray: [],
    money: '0.00', //总价
    count: 0, //个数
    selectAll: false,
    x: 0,
    y: 0
  },
  getCount(e) {
    console.log();

    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray
    cartArray[index].total = e.detail.val
    //更新data
    this.setData({
      cartArray
    })
  },
  switchGoodDetail(e) {
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray
    wx.navigateTo({
      url: `/pages/detail/index?id=${cartArray[index].id}`,
    })
  },
  selectGood(e) {
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray

    let money = Number(this.data.money)
    let count = this.data.count

    let selectAll = this.data.selectAll

    // 选中or 不选中
    cartArray[index].select = !cartArray[index].select
    if (cartArray[index].select) {
      money += Number(cartArray[index].price) * cartArray[index].total
      count++

    } else { //没有选中
      money -= Number(cartArray[index].price) * cartArray[index].total
      count--
      selectAll = false


    }
    //更新数据
    this.setData({
      cartArray,
      money: String(money.toFixed(2)),
      count,
      selectAll

    })



  },
  sub(e) {
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray
    let money = Number(this.data.money)
    if (cartArray[index].total < 1) {
      return
    }
    if (cartArray[index].select) {
      money -= Number(cartArray[index].price)

    }
    this.setData({
      // cartArray,
      money: String(money.toFixed(2)),

    })
    // console.log(money);


  },
  setAccount() {
    let list = []
    this.data.cartArray.forEach((item) => {
      if (item.select) {
        list.push(item)
      }
    
    })
    //totalprice
    const info={
      list:list,
      totalmoney:this.data.money
    }
    wx.navigateTo({
      url: '/pages/order/index?Info='+JSON.stringify(info),
    })
  },
  add(e) {
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray
    let money = Number(this.data.money)
    if (cartArray[index].select) {
      money += Number(cartArray[index].price) 

    }
    this.setData({
      // cartArray,
      money: String(money.toFixed(2)),

    })
  },
  selectAll() {
    const cartArray = this.data.cartArray
    let money = 0
    let count = 0
    let selectAll = this.data.selectAll
    selectAll = !selectAll

    cartArray.forEach((item) => {
      //设置选中不选中
      item.select = selectAll

      //
      if (item.select) {
        money += Number(item.price) * item.total
        count++
      } else {
        money = 0
        count = 0
      }
    })
    this.setData({
      cartArray,
      money: String(money.toFixed(2)),
      count,
      selectAll
    })

  },
  touchstart(e) {
    //当一个触摸时，其他恢复
    this.data.cartArray.forEach((item) => {
      if (this.isMove) {
        item.isMove = false
      }
    })

    this.setData({
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      cartArray: this.data.cartArray
    })

  },
  touchmove(e) {
    let index = e.currentTarget.dataset.index
    let x = this.data.x
    let y = this.data.y
    // 移动x
    let moveX = e.changedTouches[0].clientX
    let moveY = e.changedTouches[0].clientY
    let angle = this.angle({
      x: x,
      y: y
    }, {
      x: moveX,
      y: moveY
    })
    // console.log(x,moveY);
    this.data.cartArray.forEach((item, i) => {
      item.isMove = false
      if (Math.abs(angle > 30)) return
      if (i == index) {
        if (moveX > x) {
          item.isMove = false
        } else {
          item.isMove = true
        }
      }
    })
    this.setData({
      cartArray: this.data.cartArray
    })
  },

  del(e) {
    let index = e.currentTarget.dataset.index
    wx.getStorage({
      key: 'cartInfo',
      success: (res) => {
        const data = res.data
        data.forEach((item, i) => {
          if (item.title == this.data.cartArray[index].title) {
            data.splice(i, 1)
          }
        })
        wx.setStorage({
          data: data,
          key: 'cartInfo',
        })
        this.update(index)
      }
    })
  },
  update(index) {
    let cartArray = this.data.cartArray
    let money = Number(this.data.money)
    let count = this.data.count

    if (cartArray[index].select) {
      money -= Number(cartArray[index].price) * cartArray[index].total
      count--
    }
    // 删除现有数组
    cartArray.splice(index, 1)
    this.setData({
      cartArray: this.data.cartArray,
      money: String(money.toFixed(2)),
      count
    })
    //下标
    cartArray.length > 0 ? wx.setTabBarBadge({
      index: 2,
      text: String(cartArray.length),
    }) : wx.removeTabBarBadge({
      index: 2,
    })
  },
  angle(start, end) {
    let _x = end.x - start.x
    let _y = end.y - start.y
    //使用三角函数 
    return 360 * Math.atan(_y / _x) / (2 * Math.PI)
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
      success: (res) => {
        const cartArray = res.data

        cartArray.forEach((item) => {
          item.select = false
          item.isMove = false
        })

        this.setData({
          cartArray,
          selectAll: false,
          money: '0.00',
          count: 0
        })
        //  设置tabbar下标
        cartArray.length > 0 ? wx.setTabBarBadge({
          index: 2,
          text: String(cartArray.length),
        }) : wx.removeTabBarBadge({
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
    const cartArray = this.data.cartArray
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