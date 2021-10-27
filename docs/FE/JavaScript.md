---
title: JavaScript
order: 3
toc: menu
---

## 数据类型

有八种数据类型

Number、String、Boolean、Null、Undefined、Object、Symbol、BigInt。

- undefined 和 null

  undefined 表示为缺少值，未定义；null 表示为正常的或在意料之中的值的空缺

- Symbol

  Symbol 类型的对象永远不相等，即便创建的时候传入相同的值，可用于解决命名冲突问题。

```js
Symbol.for('helllo') === Symbol.for('helllo');
const a = new Symbol();
const b = new Symbol();
// a !== b
```

- BigInt

  BigInt 可以表示任意大的整数;

### 基本数据类型和引用数据类型

基本类型值指的是简单的数据段；引用类型值指那些可能由多个值构成的对象

基本类型：Number、String、Null、Undefined、Boolean、Symbol

引用类型：Object、Fuction、Array、Date 等

js 的变量的存储方式--栈（stack）和堆（heap）

栈：自动分配内存空间，系统自动释放，里面存放的是基本类型的值和引用类型的地址

堆：动态分配的内存，大小不定，也不会自动释放。里面存放引用类型的值。

基本类型的比较是值比较；引用类型的比较是引用的比较。

### 如何判断

主要有以下几种方法：typeof、instanceof 、Objeact.prototype.toString.call()。

- typeof

  返回一个表示数据类型的字符串，返回结果包含：number、boolean、string、symbol、object、undefined、function、bigint 等

  **不能判断 null 和 array**

- instanceof

  > instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。其意思就是判断对象是否是某一数据类型的实例

  **instanceof 可以精准判断引用数据类型（Array，Function，Object），而基本数据类型不能被 instanceof 精准判断。**

  ```js
  function newInstanceof(l, r) {
    var o = r.prototype;
    l = l.__proto__;
    while (true) {
      if (l === null) {
        return false;
      }
      if (o === l) {
        return true;
      }
      l = l.__proto__;
    }
  }
  ```

- Objeact.prototype.toString.call()

  最准确的判断方法

  ```js
  Object.prototype.toString.call(''); // [object String]
  Object.prototype.toString.call(1); // [object Number]
  Object.prototype.toString.call(true); // [object Boolean]
  Object.prototype.toString.call(Symbol()); // [object Symbol]
  Object.prototype.toString.call(undefined); // [object Undefined]
  Object.prototype.toString.call(null); // [object Null]
  Object.prototype.toString.call(new Function()); // [object Function]
  Object.prototype.toString.call(new Date()); // [object Date]
  Object.prototype.toString.call([]); // [object Array]
  Object.prototype.toString.call(new RegExp()); // [object RegExp]
  Object.prototype.toString.call(new Error()); // [object Error]
  Object.prototype.toString.call(document); // [object HTMLDocument]
  Object.prototype.toString.call(window); // [object global] window 是全局对象 global 的引用
  ```

## 原型和原型链

- 所有引用类型（函数、数组、对象）都拥有`__proto__`属性（隐式原型）
- 所有函数拥有`prototype`属性（显式原型）（仅限构造函数）
- 原型对象：拥有 prototype 属性的对象，在定义函数时被创建

![Index_01](../../assets/image/javaScript/prototype.png)

## this

【 默认绑定】严格模式下，不能将全局对象用于默认绑定，this 会绑定到 undefined。只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。

【隐式绑定】函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的形式为 XXX.fun()，谁调用指向谁。

【显式绑定 】通过 call,apply,bind 的方式，显式的指定 this 所指向的对象

【new 绑定】使用 new 来调用函数，会自动执行下面的操作：

1. 创建（或者说构造）一个新对象。

2. 这个新对象会被执行[[Prototype]]连接。

3. 这个新对象会绑定到函数调用的 this。

4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

   将 null 或者是 undefined 作为 this 的绑定对象传入 call、apply 或者是 bind,这些值在调用时会被忽略，实际应用的是默认绑定规则

箭头函数，箭头函数无法使用上述四条规则，而是根据外层（函数或者全局）作用域（词法作用域）来决定 this。

优先级：new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定

## 作用域

## 闭包

## 事件循环

## 柯里化

## 事件流

## promise、generator、async await

## 0.1 + 0.2 为什么不等于 0.3 (IEEE754)

## 浮点精度
