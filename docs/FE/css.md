---
title: CSS
order: 2
toc: content
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

2. 类选择器 .class

3. id 选择器 #id

4. 全局选择器 如： \*号

5. 组合选择器 如：.head .head-logo

6. 后代选择器 .parent .child

7. 群组选择器 .parent1, .parent2

8. 伪类选择器 如：a:link,a:hover

9. 字符串匹配的属性选择符(^ \$ \*三种，分别对应开始、结尾、包含)

10. 子选择器 如：div > p

11. 相邻兄弟选择器 如：h1 + p

12. 属性选择器

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

**块格式化上下文（Block Formatting Context，BFC）**

**BFC 是一个独立的布局环境，BFC 内部的元素布局与外部互不影响**

一个 BFC 的范围包含创建该上下文元素的所有子元素，但**不包括**创建了新 BFC 的子元素的内部元素。这从另一方角度说明，一个元素不能同时存在于两个 BFC 中。两个 BFC 是互相隔离的。

### 触发条件

- 根元素（`<html>）`）
- 浮动元素（元素的 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 不是 `none`）
- 绝对定位元素（元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 为 `absolute` 或 `fixed`）
- 行内块元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `inline-block`）
- 表格单元格（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-cell`，HTML 表格单元格默认为该值）
- 表格标题（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-caption`，HTML 表格标题默认为该值）
- 匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table`、`table-row`、`table-row-group`、`table-header-group`、`table-footer-group`（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 `inline-table`）
- [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 计算值(Computed)不为 `visible` 的块元素
- [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
- [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content`或 paint 的元素
- 弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `flex` 或 `inline-flex`元素的直接子元素）
- 网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width) 不为 ` auto，包括 ``column-count ` 为 `1`）
- `column-span` 为 `all` 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中（[标准变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)，[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)）

### 布局规则

- 内部的 Box 会在垂直方向一个接着一个地放置。
- Box 垂直方向上的距离由 margin 决定。属于同一个 BFC 的两个相邻的 Box 的 margin 会发生重叠。
- 每个盒子的左外边框紧挨着包含块的左边框，即使浮动元素也是如此。
- BFC 的区域不会与 float box 重叠。
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。
- 计算 BFC 的高度时，浮动子元素也参与计算。

### 解决的问题

1. 浮动元素的高度塌陷
2. 上下 margin 重叠问题
3. 非浮动元素被浮动元素覆盖

## 居中

### 水平方向

#### 行内元素

```css
.container {
  text-align: center;
}
```

#### 块状元素

```css
/* 方法1 已知宽度 */
.container {
  margin: 0 auto;
}
```

```css
/* 方法1 未知宽度 */
.container {
    text-align: center;
}
.inline-block {
    display: inline-block;
}
/* 方法2 未知宽度 */
.flex-center {
    display: flex;
    justify-content: center;
}

/* 方法3 未知宽度 */
使用定位等方式
```

### 水平垂直居中

```less
/* 方法1 已知宽高*/
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
}

/* 方法2 已知宽高*/
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

/* 方法3 已知宽高 */
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}

/* 方法4 未知宽高 */
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 方法5 未知宽高 */
.parent {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.child {
  display: inline-block;
}

/* 方法6 未知宽高 */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 方法7 未知宽高 */
.parent {
  display: grid;
}
.child {
  align-self: center;
  justify-self: center;
}
```

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

伪类用于当已有元素处于某种状态时，为其添加对应的样式，这个状态是用户行为而动态变化的

伪元素用于创建一些不在文档中的元素，并为其添加样式。

区别在于：有没有创建一个文档树之外的元素。

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

## flex 弹性布局

Flex 是 Flexible Box 的缩写，意为"弹性布局"

任何一个容器都可以指定为 Flex 布局。 使用`display:flex` 行内元素也可以使用`display:inline-flex`

### 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

**容器**默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。

**项目**默认沿主轴排列。

### 容器的属性

#### flex-direction

flex-direction 属性决定主轴的方向，即项目的排列方向。具有 4 个属性值。

- row: 默认值。主轴为水平方向，起点在左端。
- row-reverse: 主轴为水平方向，起点在右端。
- column: 主轴为垂直方向，起点在上沿。
- column-reverse: 主轴为垂直方向，起点在下沿。

#### flex-warp

flex-warp 属性定义，项目在主轴方向上排列不下的时候，如何换行。

- nowarp：默认值 不换行
- warp: 换行，第一行在上面
- warp-reverse: 换行，第一行在下面

#### flex-flow

flex-flow 属性是 flex-direction 和 flex-warp 的简写形式，默认值为 row nowarp。

#### justifly-content

justifly-content 属性定义了项目在主轴的对齐方式。

- flex-start: 默认值，起点对齐
- flex-end: 终点对齐
- center: 居中
- space-between: 两端对齐，项目之间的间隔都相等。
- space-around: 每个项目两侧的间隔相等。所以项目之间的间隔比项目与边框的间隔大一倍。

#### align-items 属性

align-items 属性定义项目在交叉轴上如何对齐。

- flex-start: 起点对齐
- flex-end: 终点对齐
- center: 居中
- baseline: 项目的第一行文字的基线对齐
- stretch: 默认值 如果项目未设置高度或者为 auto，将占满整个容器的高度

#### align-content

align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的终点对齐。
- center：与交叉轴的中点对齐。
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个交叉轴。

### 项目的属性

#### order

order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

#### flex-grow

flex-grow 属性 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间（如果有的话）。如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍

#### flex-shrink

flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

#### flex-basis

flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。默认是值 auto，即本来项目的大小。

它可以设为跟 width 或 height 属性一样的值（比如 350px），则项目将占据固定空间。

#### flex

flex 是 flex-grow、flex-shrink、flex-basis 的简写。默认值 0 1 auto。

注意 flex: 1 代表的值是 flex-grow: 1、flex-shrink: 1、flex-basis: 0%。

#### align-self

align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。

默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

属性值与 align-items 值相同，多增加了 auto 属性值。

### 其他

设为 Flex 布局后，子元素的 float、clear 和 vertical-align 属性将失效。

## 其他

### 滚动条自定义

```less
// 覆盖默认滚动条
.ant-table-wrapper .ant-table-scroll-horizontal .ant-table-container {
  .ant-table-body,
  .ant-table-tbody,
  .ant-table-content {
    overflow: overlay !important;
  }

  &:hover {
    // ::-webkit-scrollbar-track {
    //   -webkit-box-shadow: inset 0 0 6px #FAFAFA;
    // }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0);
      background-color: #e5e5e5;
      &:hover {
        background-color: rgba(85, 85, 85, 0.4);
      }
    }
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px transparent;
    background-color: transparent;
  }

  /* 滚动条的内层滑轨背景颜色 */
  ::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px transparent;
    background-color: transparent;
  }
}
```
