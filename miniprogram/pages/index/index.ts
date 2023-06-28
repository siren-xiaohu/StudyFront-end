// index.ts
// 获取应用实例
const app = getApp<IAppOption>()


const initialLat = 33.82261
const initialLng = 108.37345

Page({
  data: {
    setting: {
      skew: 0,
      rotate: 0,
      showLocation: true,
      showScale: true,
      subKey: '',
      layerStyle: -1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: true,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,
    },
    location: {
      latitude: initialLat,
      longitude: initialLng,
    },
    scale: 16,
    markers: [
      {
        iconPath:"/resources/car.png",
        id: 0,
        latitude: initialLat,
        longitude: initialLng,
        width: 50,
        height: 50
      },
      {
        iconPath:"/resources/car.png",
        id: 1,
        latitude: initialLat,
        longitude: initialLng,
        width: 50,
        height: 50
      },
    ],

    motto: '有人的地方就有江湖',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false



  },

  onMyLocatationTap() {
    wx.getLocation({
      type: 'gcj02', // 返回坐标类型：GCJ02
      success: res => {
        // 使用经纬度打开微信地图
        this.setData(
            {
              location: {
                latitude:  res.latitude,
                longitude: res.longitude
              },
            }
        )
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: "请前往设计页进行设置允许"
        })
        console.error('获取地理位置失败', err);
      }
    })
  },
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs',
  //   })
  // },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }



})
