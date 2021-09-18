# angular-pwa
## 1. 运行命令 【ng add @angular/pwa】
### 【angular.json】文件的变化
> projects --> build  
![image](https://user-images.githubusercontent.com/57317985/128032445-d8921e24-61e3-4dfe-b026-7c5a22360816.png)  
> projects --> test  
![image](https://user-images.githubusercontent.com/57317985/132937365-4fb7216e-6af1-4ee2-98f9-07d1ada581be.png)
> 1.**manifest.webmanifest**：[Web应用程序清单](https://developer.mozilla.org/zh-CN/docs/Web/Manifest "Web应用程序清单")在一个JSON文本文件中提供有关应用程序的信息（如名称，作者，图标和描述）。manifest 的目的是将Web应用程序安装到设备的主屏幕，为用户提供更快的访问和更丰富的体验。  
> 2.**"serviceWorker": true,**:此标志将导致生产版本在输出 dist 文件夹中包含几个额外的文件。Angular Service Worker 主体文件 **ngsw-worker.js**, Angular Service Worker 配置文件 **ngsw.json**。  
> 3.**"ngswConfigPath": "ngsw-config.json"**:指定**ngsw-config.json**文件相对于工作区目录的路径。
### 新增 【ngsw-config.json】文件
> 1.Service Worker 配置文件，用于配置 Angular Service Worker 运行时行为，并且生成的文件带有一些智能默认值（它会用来指定缓存的行为以及其它设定）。  
> 2.所有文件路径都必须以 / 开头，也就是相应的部署目录。  
> 3.如果在生成了配置文件之后修改了 resourcesOutputPath 或 assets 的路径，那么就要在 ngsw-config.json 中手动修改这些路径。
```
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
        ]
      }
    }
  ]
}

```
### 【package.json】文件的变化
> 把 @angular/service-worker 添加到你的项目中。
![image](https://user-images.githubusercontent.com/57317985/128033727-86527d5d-18a5-4729-9bf4-fad6a04446da.png)
### 【index.html】文件的变化
> 1.添加 manifest.webmanifest 文件链接标记。  
> 2.为 theme-color 添加 meta 标签,设置状态栏等的颜色。  
![image](https://user-images.githubusercontent.com/57317985/132948077-985b950f-f556-4d29-8ea6-d9af4810bae3.png)
### 新增 [manifest.webmanifest](https://developer.mozilla.org/zh-CN/docs/Web/Manifest "Web应用程序清单") 文件
> 
```
{
  "name": "pwa",
  "short_name": "pwa",
  "theme_color": "#1976d2",
  "background_color": "#fafafa",
  "display": "standalone",
  "scope": "./",
  "start_url": "./",
  "icons": [
    {
      "src": "assets/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ]
}
```
### 【app.module.ts】文件的变化
> 1.在跟模块中导入并注册 Angular Service Worker到生产环境中。
> 2.[ServiceWorkerModule.register();](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register "")  
![image](https://user-images.githubusercontent.com/57317985/128036084-57a36afe-854f-47ef-9679-e2022cc7e613.png)
### 创建图标文件
> ![image](https://user-images.githubusercontent.com/57317985/128036182-b0f60539-e6d0-4808-ac34-bdf46c9d2412.png)
<br><br>
## 生产构建文件夹
> ![image](https://user-images.githubusercontent.com/57317985/132971128-7a344fb2-38a9-4317-b96e-a915626f1af3.png)
### ngsw-worker.js
> 这个文件就是 Angular Service Worker 本身。 与所有 Service Worker 一样，它通过自己单独的 HTTP 请求进行交付，以便浏览器可以跟踪它是否发生了变化，并将其应用于 Service Worker 生命周期。
### ngsw.json
> 这是 Angular Service Worker 将使用的运行时配置文件。 该文件基于 ngsw-config.json 文件构建，包含 Angular Service Worker 在运行时了解需要缓存哪些文件以及何时缓存所需的所有信息。  
## 总结
### 知识点1
> 服务器和前台部署根目录的关系。  
> 服务器：```https://www.hzh.com:8080```  
> 前台部署跟目录：```/front/v1/index.html```  
> 服务启动在服务器跟目录的话，需要加```<base href="/front/v1/"/>```链接到前台部署跟目录。服务器启动在前台部署跟目录下面的话，就不需要```base href```了。
### 知识点2
> 命令配置```ngsw.json```中的文件路径。
> 例子：```ngsw-config": "./node_modules/.bin/ngsw-config ./dist/front/v1 ./ngsw-config.json /front/v1```  
> 执行：```npm run ngsw-config```  
> 语法：```./node_modules/.bin/ngsw-config ./dist/<project-name> ./ngsw-config.json [/base/href]```
### 知识点3
> ```<base href="/front/v1/"/>```相对于```<link rel="icon" type="image/x-icon" href="favicon.ico">```和```<link rel="manifest" href="manifest.webmanifest">```中的href也管用。
### 知识点4
> PWA的build命令
> ```ng build --prod --output-path=./dist/front/v3/ --base-href=/front/v3/``` ```--base-herf```同时会配置```ngsw.json```中的路径，同时也会影响```manifest```文件的“scope”和“start_url”
