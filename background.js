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
                chrome.tabs.create({ url: details.url, active: true});
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