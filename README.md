# uniapp-frame
使用uniapp写的小程序前端框架，适用多端。
写了一个包括不限于http，network等封装后形成一个基础的项目框架配置。
NetWork.js文件是定义了当前网络状态的构造函数。
http.js文件内部是请求request的构造函数 通过Vue.prototype.$ysHttp = http;绑定到Vue，可以通过this.$ysHttp请求接口。

# 注意：DOMAIN域名常量：
在h5页面打开或者打包时 DOMAIN :""；开发时通过vue.config.js进行代理设置解决跨域问题（或者使用xbuilder内置浏览器）
在微信小程序打开或打包时 域名改为相对应的域名地址。
[文档](https://chensanr.gitee.io/2019/07/10/miniPro/)
