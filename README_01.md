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
3. Service Worker 请求了 /ngsw.json 文件，这是 Service Worker 正在检查更新。
## 3. 应用外壳
1. 应用外壳是一种在构建期间借助路由渲染部分应用的方法。它可以通过快速启动一个静态渲染页面（所有页面的公共骨架）来改善用户体验。与此同时，浏览器会下载完整的客户端版本，并在代码加载后自动切换到完整版。这能让用户快速看到应用中第一个有意义的画面，因为浏览器可以渲染出 HTML 和 CSS，而无需初始化任何 JavaScript。 https://developers.google.com/web/fundamentals/architecture/app-shell
## 4. 与 Service Worker 通讯
1. 把 ServiceWorkerModule 导入到你的 AppModule 中不仅会注册 Service Worker，还会提供一些服务，让你能和 Service Worker 通讯，并控制你的应用缓存。
2. SwUpdate 服务
    1. 获取出现可用更新的通知。如果要刷新页面，这些就是可加载的新版本。
    2. 获取更新被激活的通知。这时候 Service Worker 就可以立即使用这些新版本提供服务了。
    3. 要求 Service Worker 向服务器查询是否有新版本。
    4. 要求 Service Worker 为当前标签页激活该应用的最新版本。 
3. 可以要求 Service Worker 检查是否有任何更新已经发布到了服务器上。 Service Worker 会在初始化和每次导航请求（也就是用户导航到应用中的另一个地址）时检查更新。 
## 5. 生产环境下的 Service Worker
1. 从概念上说，你可以把 Angular Service Worker 想象成一个转发式缓存或装在最终用户浏览器中的 CDN 边缘。 Service Worker 的工作是从本地缓存中满足 Angular 应用对资源或数据的请求，而不用等待网络。
2. 在任何一个给定的时间，Service Worker 可能会在它的缓存中拥有此应用的多个版本，这几个版本也都能用于提供服务。
3. 每当用户打开或刷新应用程序时，Angular Service Worker 都会通过查看清单（manifest）文件 “ngsw.json” 的更新来检查该应用程序的更新。 如果它找到了更新，就会自动下载并缓存这个版本，并在下次加载应用程序时提供。
4. Angular Service Worker 会在虚拟目录 ```ngsw/``` 下暴露出调试信息。 目前，它暴露的唯一的 URL 是 ```ngsw/state```。
5. 要停用 Service Worker，请删除或重命名 ngsw.json 文件。 当 Service Worker 对 ngsw.json 的请求返回 404 时，Service Worker 就会删除它的所有缓存并注销自己，本质上就是自毁。
6. 要停用 Service Worker，您只需要在产品中重命名ngsw-worker.js，且重命名safety-worker.js为ngsw-worker.js。并将其保留一段时间。
7. 重要的是，要记住 Service Worker 无法在重定向后工作。为了解决这个问题，你可能需要用上述技巧5或6杀死老的 Worker。
## Service Worker 配置
1. 配置文件 ngsw-config.json 指定了 Angular Service Worker 应该缓存哪些文件和数据的 URL，以及如何更新缓存的文件和数据。 Angular CLI 会在 ng build 期间处理配置文件。 如果想手动处理，你可以使用 ngsw-config 工具。
2. 当 ServiceWorker 处理请求时，它将按照资源组在 ngsw-config.json 中出现的顺序对其进行检查。与所请求的资源匹配的第一个资源组将处理该请求。
