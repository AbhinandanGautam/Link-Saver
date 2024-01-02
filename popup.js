var saveBtn = document.getElementById("savebtn");
var showBtn = document.getElementById("showbtn");

saveBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var url = tabs[0].url;
        chrome.runtime.sendMessage({ action: 'saveLink', url: url });
    });
});

showBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openLinksPage' });
});