---
layout: post
title:  "sass预处理器"  
categories: computer
---
 Sass(Syntactically Awesome StyleSheets)是一种CSS语言的辅助工具，通过Sass来扩展CSS的功能。
 Sass有两种语法:
 * 一种是SCSS(Sassy CSS)，这种语法仅在CSS的基础上进行扩展，所有CSS的语法在SCSS中均可以使用，以.scss作为扩展名。
 * 另一种是Sass，这种是缩进格式，它使用缩进代替花括号，换行代替分号，以.sass作为扩展名。
 这里介绍对Sass的介绍都是用的第一种语法。

 ## Sass安装
 Sass是由Ruby语言开发的，所以需要先安装Ruby，安装完成使用Ruby自带的RubyGems系统进行Sass的安装，在Linux终端输入以下命令：
 ```
 gem install sass
 gem install compass
 ```
 安装完成后可以输入以下命令确认安装成功
 ```
 sass -v
 compass -v
 ```
 安装完成后可以使用更新和帮助命令
 ```
 gem update sass //更新命令
 sass -h //帮助命令
 ```
可以使用sass本身对scss文件进行编译和调试，也可以使用我们之前安装的compass进行编译，这里用compass进行工程的创建和编译。首先创建一个项目，项目名为project：
```
compass create project
```
这时我们就创建好了一个名为project的文件夹，文件夹中的目录如下所示：
```
.
|-- config.rb
|-- sass
|   |-- ie.scss
|   |-- print.scss
|   `-- screen.scss
`-- stylesheets
       |-- ie.css
       |-- print.css
       `-- screen.css
```
sass文件夹就是放置scss文件的地方，stylesheets文件夹就是放置编译后的css文件的地方，这些设置可以通过命令行修改，也可以通过文件夹下的config.rb文件进行修改，打开该文件可以看到相关设置，如果需要修改就直接对该文件按照指示修改即可。

## Sass语法扩展
### 1.嵌套规则(Nested Rules)
Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器，例如：
```scss
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```
编译为
```scss
#main p {
  color: #00ff00;
  width: 97%; }
  #main p .redbox {
    background-color: #ff0000;
    color: #000000; }

```
嵌套功能避免了重复输入父选择器，而且令复杂的 CSS 结构更易于管理：
```scss
#main {
  width: 97%;

  p, div {
    font-size: 2em;
    a { font-weight: bold; }
  }

  pre { font-size: 3em; }
}
```
编译为
```scss
#main {
  width: 97%; }
  #main p, #main div {
    font-size: 2em; }
    #main p a, #main div a {
      font-weight: bold; }
  #main pre {
    font-size: 3em; }
```
### 2. 父选择器 (Referencing Parent Selectors: )

在嵌套 CSS 规则时，有时也需要直接使用嵌套外层的父选择器，例如，当给某个元素设定 hover 样式时，或者当 body 元素有某个 classname 时，可以用 & 代表嵌套规则外层的父选择器。
```scss
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  body.firefox & { font-weight: normal; }
}
```
编译为
```scss
a {
  font-weight: bold;
  text-decoration: none; }
  a:hover {
    text-decoration: underline; }
  body.firefox a {
    font-weight: normal; }
```
编译后的 CSS 文件中 & 将被替换成嵌套外层的父选择器，如果含有多层嵌套，最外层的父选择器会一层一层向下传递：
```scss
#main {
  color: black;
  a {
    font-weight: bold;
    &:hover { color: red; }
  }
}
```
编译为
```scss
#main {
  color: black; }
  #main a {
    font-weight: bold; }
    #main a:hover {
      color: red; }
```
& 必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器，例如
```scss
#main {
  color: black;
  &-sidebar { border: 1px solid; }
}

```
编译为
```scss
#main {
  color: black; }
  #main-sidebar {
    border: 1px solid; }
```
当父选择器含有不合适的后缀时，Sass 将会报错。

### 3.属性嵌套 (Nested Properties)
有些 CSS 属性遵循相同的命名空间 (namespace)，比如 font-family, font-size, font-weight 都以 font 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中，例如：
```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```
编译为
```scss
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold; }
```
命名空间也可以包含自己的属性值，例如：
```scss
.funky {
  font: 20px/24px {
    family: fantasy;
    weight: bold;
  }
}
```
编译为
```scss
.funky {
  font: 20px/24px;
    font-family: fantasy;
    font-weight: bold; }
```

### 4.占位符选择器(Placeholder Selectors)
Sass 额外提供了一种特殊类型的选择器：占位符选择器 (placeholder selector)。与常用的 id 与 class 选择器写法相似，只是 # 或 . 替换成了 %。必须通过 @extend 指令调用，例如
```scss
%box {
    padding: 2em;
    color: $color10;
    background-color: $color11;
}
.warning-box {
    @extend %box;
    border: 2px dotted $color1;
}
.success-box {
    @extend %box;
    border: 2px dotted $color4;
}
.info-box {
    @extend %box;
    border: 2px dotted $color7;
}
```
编译为
```scss
.warning-box, .success-box, .info-box {
    padding: 2em;
    color: black;
    background-color: white;
}
.warning-box {
    border: 2px dotted red;
}
.success-box {
    border: 2px dotted chartreuse;
}
.info-box {
    border: 2px dotted blue;
}
```
也可以用扩展符`@extend`直接对已经存在的内容进行扩展例如
```scss
.box {
    padding: 2em;
    color: $color10;
    background-color: $color11;
}
.warning-box {
    @extend .box;
    border: 2px dotted $color1;
}
.success-box {
    @extend .box;
    border: 2px dotted $color4;
}
.info-box {
    @extend .box;
    border: 2px dotted $color7;
}
```
编译为
```scss
.box, .warning-box, .success-box, .info-box {
    padding: 2em;
    color: black;
    background-color: white;
}
.warning-box {
    border: 2px dotted red;
}
.success-box {
    border: 2px dotted chartreuse;
}
.info-box {
    border: 2px dotted blue;
}
```
可以看到第二种扩展的是已经存在的内容，而第一种被扩展的 部分不会单独存在而只是为了扩展用。

### 5.mixins
mixins的用法很像函数，定义一个mixins
```scss
@mixin bs($bs-type) {
    -webkit-box-sizing: $bs-type;
    -moz-box-sizing: $bs-type;
    box-sizing: $bs-type;
}
```
在别处引用之
```scss
* {
    @include bs(border-box);
}
```
编译为
```scss
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}   
```

### 6.变量定义!default
可以在变量的结尾添加 !default 给一个未通过 !default 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。
```scss
$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;

#main {
    content: $content;
    new-content: $new_content;
}
```
编译为
```scss
#main {
  content: "First content";
  new-content: "First time reference"; }
```
变量是 null 空值时将视为未被 !default 赋值
```scss
$content: null;
$content: "Non-null content" !default;

#main {
  content: $content;
}
```
编译为
```scss
#main {
  content: "Non-null content"; }
```
#### 资料来源
http://sassandcompass.com/

https://www.sass.hk/docs/
