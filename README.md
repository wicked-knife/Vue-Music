# 基于Vue的音乐播放器

--------
## 概述
本项目基于Vue.js,是一个仿移动端nativeApp的webApp。项目的大致开发流程是:     
1.需求分析 → 2.设计图分析 → 3.模块化构思 → 4. 项目目录规划 → 5.静态资源准备 → 6.编码   

## 在线预览
[项目演示地址](https://ghostratel.github.io/portfolio/Music/index.html#/recommend)      

移动端体验更佳     

![二维码](http://i4.bvimg.com/632724/b3bf4fbb735667d6.png)

### 用户界面
* 歌单推荐页
* 歌手列表页
	* 歌手详情页
* 歌曲榜单页
	* 榜单详情页
* 搜索页
* 用户中心页

### 数据来源
本项目所有数据均来自QQ音乐,使用`JSONP`进行获取。部分接口因服务器限制请求头`host`和`reffer`信息，无法直接使用`JSONP`的方式获取数据。采取的措施是使用本地服务进行`正向代理`。大致方法是：配置webpack dev-server 的 `proxyTable` , 利用本地服务向QQ音乐服务器进行请求(伪造请求头的`reffer` 和 `host` 信息,前端无法直接修改请求头信息),再在项目前端请求本地服务以获取数据。详细代码请查看`/config/index.js`。

### 技术栈

* [x] Vue
* [x] Vuex
* [x] Vue-Router
* [x] Vue-cli
* [x] SCSS
* [x] Axios
* [x] VUX
* [x] JSONP
* [x] ESlint

### 项目目录
![](http://i2.bvimg.com/632724/52603b6f87991740.png)

### 开始
#### 开发环境
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```
#### 生产环境

``` bash
# build for production with minification
npm run build

```