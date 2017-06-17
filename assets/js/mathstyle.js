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
            if (element == "proposition") {
            theorem ++;
            var placeholder = document.createElement("span");
            placeholder.style.fontWeight = "bold";
            var desctext = document.createTextNode("Proposition "+ theorem +" ");
            placeholder.appendChild(desctext);
            quoteblocks[i].insertBefore(placeholder, quoteblocks[i].firstChild);
        }
            if (element == "definition") {
            theorem ++;
            var placeholder = document.createElement("span");
            placeholder.style.fontWeight = "bold";
            var desctext = document.createTextNode("Definition "+ theorem +" ");
            placeholder.appendChild(desctext);
            quoteblocks[i].insertBefore(placeholder, quoteblocks[i].firstChild);
        }
            if (element == "exercise") {
            theorem ++;
            var placeholder = document.createElement("span");
            placeholder.style.fontWeight = "bold";
            var desctext = document.createTextNode("Exercise "+ theorem +" ");
            placeholder.appendChild(desctext);
            quoteblocks[i].insertBefore(placeholder, quoteblocks[i].firstChild);
        }
            if (element == "proof") {
            var placeholder = document.createElement("span");
            placeholder.style.fontStyle = "italic";
            var desctext = document.createTextNode("Proof: ");
            placeholder.appendChild(desctext);
            quoteblocks[i].insertBefore(placeholder, quoteblocks[i].firstChild);
            }
    }
}

addLoadEvent(mathEnvironment);