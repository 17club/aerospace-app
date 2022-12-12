import { request, ApiPath } from '../../../../utils/api'
Component({
  properties: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data: {
    pdfUrl: ''
  },
  methods: {
    toJump(e) {
      const info = e.currentTarget.dataset.info
      const that = this
      wx.downloadFile({
        url: info.material.url,  // 请求后端接口拿到的pdf链接
        success: function (res) {
          if(res.statusCode != 200) { return false }
          var path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
          wx.openDocument({
            filePath: path,
            showMenu: true,
            success: () => {
              request(ApiPath.updateUserRelatedMaterial, {
                course_material_employee_id: info.id,
                status: 3
              }).then(() => {
                that.triggerEvent('updatematerial')
              })
              wx.showToast({
                title: '打开成功',
                icon: 'warning',
                duration: 2000
              })
            }
          })
        },
        fail: ()=> {
          wx.showToast({
            title: '打开失败',
            icon: 'warning',
            duration: 2000
          })   
        }
      })   
    }
  }
})
