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