// components/cart/cart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBuy:{
      type:Boolean,
      value:true
    },
    data:{
      type:Object
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
    hide(e){
      if(e.target.dataset.target=='self'){
        this.setData({
          hideBuy:true
        })
      }
      
    },
    getCount(e){
      // console.log(e);
      this.triggerEvent('ongetCount',e.detail)
      
    },
    buy(){
      this.setData({
        hideBuy:true
      })
      this.triggerEvent('buyEvent')
    }
  }
})
