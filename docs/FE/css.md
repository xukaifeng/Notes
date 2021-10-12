---
title: CSS
order: 2
toc: menu
---

## 盒模型

标准盒模型：width = content

怪异盒模型(IE) width = content + padding + border

两者可以通过 box-sizing 进行切换

box-sizing:

- content-box 默认值，只计算内容的宽度，border 和 padding 不计算入宽度之内
- padding-box padding 计算宽度之内(火狐特有)
- border-box border 和 padding 计算入宽度之内

## 选择器、优先级

1. 标签选择器 如：body div 等

2. 类选择器

3. id 选择器

4. 全局选择器 如： \*号

5. 组合选择器 如：.head .head-logo

6. 后代选择器

7. 群组选择器

8. 继承选择器

9. 伪类选择器 如：a:link,a:hover

10. 字符串匹配的属性选择符(^ \$ \*三种，分别对应开始、结尾、包含)

11. 子选择器 如：div > p

12. 相邻兄弟选择器 如：h1 + p

13. 属性选择器

    | 类型         | 描述                                       |
    | :----------- | :----------------------------------------- |
    | [abc^="def"] | 选择 abc 属性值以 "def" 开头的所有元素     |
    | [abc$="def"] | 选择 abc 属性值以 "def" 结尾的所有元素     |
    | [abc*="def"] | 选择 abc 属性值中包含子串 "def" 的所有元素 |

**权重**

| 选择器       | 权重 |
| :----------- | ---- |
| 元素选择器   | 0001 |
| class 选择器 | 0010 |
| id 选择器    | 0100 |
| 内联样式表   | 1000 |

1. !important 声明的样式优先级最高，如果冲突再进行计算。
2. 如果优先级相同，则选择最后出现的样式。
3. 继承得到的样式的优先级最低。

## 单位

### 绝对单位

- px: Pixel 像素
- pt: Points 磅
- pc: Picas 派卡
- in: Inches 英寸
- mm: Millimeter 毫米
- cm: Centimeter 厘米
- q: Quarter millimeters 1/4 毫米

### 相对单位

- %: 百分比
- em: Element meter 根据文档字体计算尺寸
- rem: Root element meter 根据根文档（ body/html ）字体计算尺寸
- ex: 文档字符“x”的高度
- ch: 文档数字“0”的的宽度
- vh: View height 可视范围高度
- vw: View width 可视范围宽度
- vmin: View min 可视范围的宽度或高度中较小的那个尺寸
- vmax: View max 可视范围的宽度或高度中较大的那个尺寸

### 运算

使用 calc

### 比例关系

1. 1in = 2.54cm = 25.4 mm = 101.6q = 72pt = 6pc = 96px
2. 1px=0.75pt

### 常用单位

- px 像素

像素 px 相对于设备显示器屏幕分辨率而言

- 百分比 %

相对于父元素宽度

- em

相对于当前文档对象内文本的字体尺寸而言，若未指定字体大小则继承自上级元素，以此类推，直至 body，若 body 未指定则为浏览器大小。

- rem

相对于根文档对象内文本的字体尺寸的字体尺寸而言，若未指定字体大小则继承为浏览器默认字体大小

```css
1 html {
  font-size: 100px;
}
3 div {
  font-size: 1rem;
}
```

- vh、vw

相对于可是范围的高度和宽度，可视范围被均分为 100 单位的 vh/vw;可视范围是指屏幕可见范围，不是父元素的，百分比是相对于包含它的最近的父元素的高度和宽度。

## 层叠上下文

元素提升为一个比较特殊的图层，在三维空间中（z 轴）高出普通元素

### 触发条件

- 根层叠上下文 html
- 定位 position 属性为非 static 并且设置 z-index 属性值
- css3 属性
  - flex
  - transfrom
  - opacity
  - filter

### 层叠等级

层叠上下文在 z 轴的排列顺序

1. 普通元素的层叠等级优先由其所在的层叠上下文决定。
2. 层叠等级的比较只有在当前层叠上下文元素中才有意义。不同层叠上下文中比较层叠等级是没有意义的。

## BFC

## 居中

## 省略号

```css
/*单行*/
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

/*多行*/
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 5;
-webkit-box-orient: vertical;
```

## 伪类和伪元素

## link 与@import 的区别

- 从属关系区别

@import 是 css 提供的语法规则，只导入样式表的作用；

link 是 HTML 标签，不仅可以加载 css 文件，还可以定义 RSS、rel 连接属性等

- 加载顺序区别

加载页面时，link 标签引入的 css 被同时加载

@import 引入的 css 将在页面被加载完成后被加载

- 兼容性区别

@import 是 css2.1 才有的属性，所以可以在 ie5 以上被识别

link 作为 HTML 标签，不存在兼容性

- DOM 可控性区别

可以通过 JS 来控制插入 link 标签来改变样式；由于 DOM 方法是基于文档的，无法使用@import 的方式来插入标签

## 动画

css 实现动画效果可以通过 transition、tansform、animation 等 3 个属性。

### transition

使用语法：`transition: property duration timing-function delay`; 默认值：all 0 ease 0。

1. transition-property

设置过渡效果的 css 属性名称，具有以下等值。

- none 表示没有属性获得过渡效果
- all 表示所有属性都将获得过渡效果
- property 表示 css 属性列表，多个属性用逗号隔开

2. transition-duration

规定完成过渡效果需要多少秒或毫秒(s/ms)。

3. transition-timing-funtion

规定速度效果的速度曲线。默认 ease 还有 linear、ease-in、ease-out、ease-in-out 和 cubic-bezier 等

4. transition-delay

定义过渡效果何时开始。

### transform

transform 属性应用于 2D 或 3D 转换。该属性允许我们能够对元素进行旋转、缩放、倾斜、移动等操作

使用语法：`transform: none|transform-functions`

#### 旋转

roate(): 通过指定的角度参数对原元素指定一个 2D rotation （2D 旋转），需先有 transfrom-origin 属性的定义。transform-origin 定义的是旋转的基点，其中 angle 是指旋转角度，如果设置的值为正数表示顺时针旋转，如果设置的值为负数表示逆时针旋转。例如：`transform:rotate(30deg)`

#### 缩放

用法：transform: scale(0.5) 或者 transform: scale(0.5, 2);

一个参数时：表示水平和垂直同时缩放该倍率；

两个参数时：第一个参数指定水平方向的缩放倍率，第二个参数指定垂直方向的缩放倍率

#### 倾斜

transform: skew(30deg) 或者 transform: skew(30deg, 30deg);

一个参数时：表示水平方向的倾斜角度；

两个参数时：第一个参数表示水平方向的倾斜角度，第二个参数表示垂直方向的倾斜角度。

#### 移动

transform: translate(45px) 或者 transform: translate(45px, 150px);

一个参数时：表示水平方向的移动距离；

两个参数时：第一个参数表示水平方向的移动距离，第二个参数表示垂直方向的移动距离。

### 基准点 transform-origin

在使用 transform 方法进行文字或图像的变形时，是以元素的中心点为基准点进行的。使用 transform-origin 属性，可以改变变形的基准点。

用法：

```css
transform-origin: 10px 10px;
```

共两个参数，表示相对左上角原点的距离，单位 px

第一个参数表示相对左上角原点水平方向的距离，第二个参数表示相对左上角原点垂直方向的距离；

其中第一个参数也可以指定为 left、center、right，第二个参数也可以指定为 top、center、bottom。

这四种变形方法顺序可以随意，但不同的顺序导致变形结果不同，原因是变形的顺序是从左到右依次进行。

### animation

- animation-name 规定需要绑定到选择器的 keyframe 名称
- animation-duration 规定完成动画所花费的时间，以秒或毫秒计。
- animation-timing-function 规定动画的速度曲线。
- animation-delay 规定在动画开始之前的延迟。
- animation-iteration-count 规定动画应该播放的次数
- animation-direction 规定是否应该轮流反向播放动画

```css
@-webkit-keyframes anim1 {
  0% {
    opacity: 0;
    font-size: 12px;
  }
  100% {
    opacity: 1;
    font-size: 24px;
  }
}
.anim1Div {
  -webkit-animation-name: anim1;
  -webkit-animation-duration: 1.5s;
  -webkit-animation-iteration-count: 4;
  -webkit-animation-direction: alternate;
  -webkit-animation-timing-function: ease-in-out;
}
```

### 三者区别

transition 和 animation 区别 transition 需要触发事件。

## position

共有 5 个属性值：static、relative、absolute、fixed、sticky

**static：** 默认值、没有定位；

**relative**： 相对于其正常位置进行定位；

**absolute**： 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位；

**fixed：**生成固定定位的元素，相对于浏览器窗口进行定位；

**sticky：**粘性定位，该定位基于用户滚动的位置；

## flex

## 其他
