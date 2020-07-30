// components/amount/amount.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count:{
      type:Number,
      value:1
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
    change(e){
      // console.log(e);
      let value=e.detail.value
      let myEvent={
        val:value
      }
      this.triggerEvent('change',myEvent)
      
    },
    sub(e){
      let count=this.data.count
      count>1?count--:1
      this.setData({
        count:count
      })
      let myEvent={
        val:count
      }
      this.triggerEvent('change',myEvent)
      this.triggerEvent('sub')

    },
    add(e){
      let count=this.data.count
      this.setData({
        count:++count
      })
      let myEvent={
        val:count
      }
      this.triggerEvent('change',myEvent)
      this.triggerEvent('add')
    }
  }
})
