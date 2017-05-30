
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