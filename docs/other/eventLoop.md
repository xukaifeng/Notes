---
title: EvnetLoop
order: 3
nav:
  title: Other
  order: 1
---

## 浏览器与 node 的事件循环

### 浏览器

- macro-task（宏任务） 大概包括：

  - script（整体代码）
  - setTimeout
  - setInterval
  - setImmediate
  - I / O
  - UI render

- micro-task（微任务） 大概包括：
  - process.nextTick
  - Promise.then
  - async / await （等价于 Promise.then）
  - MutationObserver（HTML5 新特性）

**整体顺序**

1. 执行宏任务

2. 然后执行宏任务产生的微任务

3. 若微任务在执行过程中产生了新的微任务，则继续执行微任务

4. 微任务执行完毕，再回到宏任务中进行下一轮循环

**浏览器里的时间循环，遇到宏任务，会立即执行对应的微任务队列**

**关于 async / await 执行顺序** <br/>
async 隐式地返回一个 promise，可以看成是是 promise 的语法糖，await 后面产生一个微任务

**旧版 chrome：**
​ 在执行到 await 时，会将 await 后面代码放到本轮循环最后执行；

**新版 chrome**：<br/>
​ 分两种情况（优化 await 的运行速度）<br/>
​ 如果 await 后不是异步任务，将 await 后看成是一个微任务<br/>
​ 如果 await 后是异步任务，将 await 后面代码放到本轮循环最后执行

### Node

事件循环机制被分成好多个阶段，每个阶段执行特定的任务

- macro-task（宏任务）包括：
  - setTimeout
  - setInterval
  - setImmediate
  - script（整体代码）
  - I / O 操作
- micro-task（微任务）包括：
  - process.nextTick（与普通微任务有区别，在微任务队列执行之前执行）
  - Promise.then 回调

process.nextTick 是独立于事件循环的任务队列，在每一个事件循环阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行。

**Node11 之前：**

​ 会执行所有的宏任务，再执行微任务，其中 process.nextTick 优先于其他微任务先执行
**Node11 ：**

​ 如果是 node11 版本一旦执行一个阶段里的一个宏任务（setTimeout、setInterval、setImmediate）就会立刻执行对应的微任务队列，nextTick 也会优先其他微任务先执行。
​ Node11 之后它的特性向浏览器看齐！

### 总结

两者主要的区别在于浏览器中的微任务是在每个相应的宏任务中执行的，而 nodejs 中的微任务则是在不同阶段之间执行的。可以理解 node 中存在着优先级的执行顺序
