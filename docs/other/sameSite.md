---
title: Cookie及SameSite
order: 2
---

### Cookie 及 SameSite

cookie 可分为第一方 cookie 和第三方 cookie，第一方 cookie 由用户访问的站点决定，第三方 cookie 是用户访问站点时，站点中含有其他站点资源，由这些其他站点创的 cookie。所以第一方和第三方是相对的概率。<br />
<br />cookie 在浏览器中有个 sameSite 属性，该属性的值由服务端控制，它决定着**浏览器是否可在后续的“同一站点”或“跨站点”请求中携带这些 cookie**<br />**sameSite**有以下值：

- Lax ： 对同源、顶级域的请求才可以携带 cookie （等价于 same-site） chrome80 默认为 Lax
- Strict: 对同源请求才可以使携带 cookie （等价于 same-origin）
- None： 对于 cookie 的使用无限制，随便使用

<br />由于 Chrome 将 sameSite 默认值改为 Lax，对于一些需要跨域且未设置 sameSite 值的接口将会带来严重的影响。<br />
<br />[第一方 cookie 和第三方 cookie](http://www.woshipm.com/pd/1492501.html)<br />[最新版 Chrome 跟进的 Cookie SameSite 策略，你真的了解吗？](https://blog.csdn.net/qq_30236895/article/details/104699706)<br />
<br />
<br />
