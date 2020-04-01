var counter = 0;
chrome.browserAction.onClicked.addListener(function (tab) {
    counter++;
    if (counter == 5) {
        counter = 0;
        alert("Hey !!! You have clicked five times");
    }
});
var mSet = new Set();
var pageCount = 0;

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        pageCount++;
        
        // chrome.downloads.download({
        //     url: details.url,
        //     filename: `textbook/${pageCount}.xhtml`
        // });
        chrome.tabs.getSelected(null,function(tab) {
            var tablink = tab.url;
            // alert(tablink);
            var arr = tablink.split("/");
            var id = arr[arr.length - 2] === "mi" ? arr[arr.length - 1] : arr[arr.length - 2];
            // alert(id);

            var arr2 = details.url.split("/");
            var currId = arr2[5];
            // alert(currId + " " + id)
            if (currId === id && !mSet.has(currId)) {
                mSet.add(currId);
                chrome.tabs.create({ url: details.url, active: false});
                // alert(details.url)
                // chrome.downloads.download({
                //     url: details.url,
                //     filename: `textbook/${pageCount}.xhtml`
                // });
            }
        });

        
    },
    {urls: [`*://platform.virdocs.com/private/manifest_item_content/*`]}
)

chrome.tabs.onCreated.addListener(
    function(tab) {
        // chrome.tabs.query({}, tabs => {
        //     let url = tabs[tabs.length-1].url;
        //     alert(url)
        // });
        // alert(tab.url)
        if (tab.url.includes("://platform.virdocs.com/private/manifest_item_content/")) {
            // alert("new tab")
            chrome.pageCapture.saveAsMHTML(
                {tabId: tab.id},
                function(mhtmlData) {
                    var blob = new Blob([mhtmlData], {type: "text/html"})
                    var url = URL.createObjectURL(blob);
                    chrome.downloads.download({
                        url: url // The object URL can be used as download URL
                        //...
                    });
                }
            )
        }
    }
)