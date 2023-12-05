chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => console.log("Inscription Helper Loaded...")
      });
    }
  });
  
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.request) {
        // Perform the requested action, e.g., an HTTP request
        fetch(message.request.url)
            .then(response => response.json())
            .then(data => sendResponse({data: data}))
            .catch(error => sendResponse({error: error}));
        return true; // Indicates that the response is sent asynchronously
    }
});
