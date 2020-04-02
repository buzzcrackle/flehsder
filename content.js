chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        message.innerText = request.source;
    }
});

function download(data, filename, type) {
    // window.alert(`->${data}<-`)
    var file = new Blob([data], {type: type});
    if (data === "" || data === undefined) {
        return;
    }
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function onWindowLoad() {
    if (window.location.href.includes("platform.virdocs.com/private/manifest_item_content/")) {
        var els = document.getElementsByClassName("pagebreak")
        var name;
        // alert(els)
        if (els.length === 0) {
            var lastKnown = localStorage.getItem("lastKnownPage");
            if (lastKnown !== "start") {
                var num = parseInt(lastKnown);
                num++
                name = "" + num;
                localStorage.setItem("lastKnownPage", name)
            } else {
                name = lastKnown;
            }
        } else {
            if (els.length === 1) {
                name = els[0].title;
                localStorage.setItem("lastKnownPage", name)
            } else {
                name = els[0].title + "-" + els[els.length-1].title;
                localStorage.setItem("lastKnownPage", els[els.length-1].title)
            }
        }

        download(document.body.innerHTML, `${name}.html`, "text/html");
        window.close();
    }
}
  
window.onload = onWindowLoad;