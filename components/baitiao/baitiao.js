// components/baitiao/baitiao.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideShow:{
      type:Boolean,
      value:true
    },
    baitiao:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hide(e){
      if(e.target.dataset.target=='self'){
        this.setData({
          hideShow:true
        })
      }
      
    },
    select(e){
      let index=e.currentTarget.dataset.index 
      let baitiao=this.data.baitiao
      for (let i = 0; i < baitiao.length; i++) {
        baitiao[i].select=false
        
      }
      baitiao[index].select=!baitiao[index].select
      this.setData({
        baitiao:baitiao,
        index:index
      })
    },
    make(){


      this.setData({
        hideShow:true
      })
      const select=this.data.baitiao[this.data.index]
      //事件传递
      this.triggerEvent('update',select)
    }
  }
})
