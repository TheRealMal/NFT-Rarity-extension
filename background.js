chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
        for (header of details.responseHeaders){
            if (header.name === "access-control-allow-origin")
                return details.responseHeaders;
        }
        const newHeader = {name:"access-control-allow-origin", value:"*"};
        const responseHeaders = details.responseHeaders.concat(newHeader);
        return { responseHeaders };
    },
    {
        urls: [
          "https://projects.rarity.tools/*"
        ],
    },
    ["blocking","responseHeaders", "extraHeaders"]
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.message){
            case "changeDisplay":
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    var currentTab = tabs[0];
                    if (currentTab) {
                        chrome.tabs.executeScript(currentTab.tabId, {code: `document.documentElement.style.setProperty('--${request.class}-disp', "${request.show ? "block" : "none"}");`}, function(){})
                        sendResponse('success')
                    }
                });
                return true;
            default:
                break;
        };
    }
);