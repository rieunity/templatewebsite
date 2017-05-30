---
layout: post
title: Math Environment Implements in html Document
categories: computer
---
由于MathJax没有提供相应的环境而只是提供数学符号的书写，所以需要我们建立定理环境。我用javascript对html文档的“blockquote”元素进行控制进而实现定理环境的呈现。

## html中blockquote元素作为定理环境
下面分别是一个定理和定义的blockquote示例
```html
<blockquote class="theorem">
It is an example of theorem environment.
</blockquote>
<blockquote class="definition">
It is an example of definition environment. 
\[
    a^2 + b^2= c^2
\]
</blockquote>
```
它的样式由下面的css代码控制
```css
.theorem, .definition, .property, .exercise{
    border: thin solid #000;
    padding: 10px;
    margin-left:20px;
    margin-right: 20px;
    margin-top: 20px;
    margin-block-start: 20px;
 }
```

## javascript对环境进行控制
下面是javascript代码
```javascript

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function mathEnvironment() {
    var quoteblocks = document.getElementsByTagName("blockquote");
    var len = quoteblocks.length;
    var theorem = 0;
    var property = 0;
    var definition = 0;
    var exercise = 0;
    for (var i = 0; i < len; i++) {
        var element = quoteblocks[i].getAttribute("class");
        if (element == "theorem") {
            theorem ++;
            var placeholder = document.createElement("span");
            placeholder.style.fontWeight = "bold";
            var desctext = document.createTextNode("Theorem "+ theorem+" ");
            placeholder.appendChild(desctext);
            quoteblocks[i].insertBefore(placeholder, quoteblocks[i].firstChild);
        }
            if (element == "property") {
            property ++;
            var placeholder = document.createElement("span");
            placeholder.style.fontWeight = "bold";
            var desctext = document.createTextNode("Property "+ property+" ");
            placeholder.appendChild(desctext);
            quoteblocks[i].insertBefore(placeholder, quoteblocks[i].firstChild);
        }
            if (element == "definition") {
            definition ++;
            var placeholder = document.createElement("span");
            placeholder.style.fontWeight = "bold";
            var desctext = document.createTextNode("Definition "+ definition+" ");
            placeholder.appendChild(desctext);
            quoteblocks[i].insertBefore(placeholder, quoteblocks[i].firstChild);
        }
            if (element == "exercise") {
            exercise ++;
            var placeholder = document.createElement("span");
            placeholder.style.fontWeight = "bold";
            var desctext = document.createTextNode("Exercise "+ exercise+" ");
            placeholder.appendChild(desctext);
            quoteblocks[i].insertBefore(placeholder, quoteblocks[i].firstChild);
        }
    }
}

addLoadEvent(mathEnvironment);
```
最后生成效果如下
<blockquote class="theorem">
It is an example of theorem environment.
</blockquote>
<blockquote class="definition">
It is an example of definition environment. 
\[
    a^2 + b^2= c^2
\]
</blockquote>