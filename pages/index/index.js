//index.js
//获取应用实例
var app = getApp()
Page({
  data:{
      select:"index",
      navIndex:0,
      nav:[{title:"足球现场"},
            {title:"足球生活"},
            {title:"足球美女"}],
      lists:null,
      hidden:false,
      hasRefesh:false,
      hasMore:true,
      kg:false,
      scrolltop:0
  },
  swiperChange(event){
    //console.log(event.detail.current)
    this.setData({
      navIndex:event.detail.current     
    })
  },
  handleChange(event){
    this.setData({
      navIndex:event.target.dataset.index
    })
  },
  onLoad(){
    this.fetchList()
  },
  fetchList(){
    var _this = this;
    wx.request({
      url:app.globalData.globalUrl + '/api/list',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
        _this.setData({
          lists:res.data.data,
          hidden:true        
        });
        wx.setStorage({
          key:'lists',
          data:res.data.data
        })
      }
    })
  },
  loadMore:function(e){
    var _this=this;
    _this.setData({
      hasRefesh:true
    });
    setTimeout(function(){
      _this.setData({
        kg:true
      });
    },1000)
    if(_this.data.kg){
      wx.request({
        url: app.globalData.globalUrl + '/api/list',
        data: {},
        method: 'GET',
        success: function(res){
          _this.setData({
            lists:_this.data.lists.concat(res.data.data),
            hasRefesh:false,
            kg:false,
            scrolltop:_this.data.scrolltop-10
          })
        }
      });
    }
      
  },
  refesh:function(e){
    var _this = this;
    _this.setData({
      hasRefesh:true
    });
    wx.request({
      url: app.globalData.globalUrl + '/api/list',
      data: {},
      method: 'GET',
      success: function(res){
        _this.setData({
          lists:_this.data.lists.concat(res.data.data),
          hidden:true,
          hasRefesh:false
        })
      }
    });
  },
  getScroll(event){
    this.setData({
      scrolltop:event.detail.scrollTop     
    })   
  }
})

