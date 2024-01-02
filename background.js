chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ links: [] });
});

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    if (request.action === "saveLink") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            var url = tabs[0].url;
            // console.log(url);
            chrome.storage.local.get({ links: [] }, (result) => {
                var links = result.links || [];
                // console.log(links);
                links.push(url);
                chrome.storage.local.set({ links: links });
            });
        });
    } 
    else if (request.action === "openLinksPage") {
        chrome.tabs.create({ url: chrome.runtime.getURL("links.html") });
    }
});
