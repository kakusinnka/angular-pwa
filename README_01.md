# angular-pwa 官方解说  
https://angular.cn/guide/service-worker-intro
## 1. 简介
### 概念
1. 为 Angular 应用添加 [Service Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) 是把应用转换成[渐进式应用（PWA）](https://web.dev/progressive-web-apps/ "PWA")的步骤之一。  
2. 简单来说，Service Worker 就是一段运行在 Web 浏览器中，并为应用管理缓存的脚本。  
3. Service Worker 的功能就像一个网络代理。它们会拦截所有由应用发出的 HTTP 请求，并选择如何给出响应。 比如，它们可以查询局部缓存，如果有缓存的响应数据，就用它做出响应。基于 Service Worker 的缓存是完全可编程的，并且不依赖于服务端指定的那些控制缓存策略的头。  
4. Service Worker 在用户关闭浏览器页标签时仍然会被保留。 下次浏览器加载本应用时，Service Worker 会首先加载，然后拦截加载本应用时的对每一项资源的请求。
### 特性
1. 像安装原生应用一样缓存应用。该应用作为整体被缓存，它的所有文件作为整体进行更新。正在运行的应用使用所有文件的同一版本继续运行。  
2. 当用户刷新本应用时，他们会看到最新的被完全缓存的版本。
### 前提条件
1. 为了注册 Service Worker，必须通过 HTTPS 而非 HTTP 访问该应用程序。浏览器会忽略通过不安全连接访问的页面上的 Service Worker。
### 其他
1. 浏览器支持信息： https://caniuse.com/serviceworkers &nbsp;&nbsp; https://jakearchibald.github.io/isserviceworkerready/
3. Service Worker简介： https://developers.google.com/web/fundamentals/primers/service-workers/
## 2. 快速上手
1. 如果没有使用 HTTPS，那么 Service Worker 只会在 localhost 上的应用中进行注册。
2. 由于 ng serve 对 Service Worker 无效，所以必须用一个独立的 HTTP 服务器在本地测试你的项目。 你可以使用任何 HTTP 服务器。下面这个例子使用来自 npm 中的 [http-server](https://www.npmjs.com/package/http-server) 包。
