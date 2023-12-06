chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
        // Execute your content script instead of just logging a message
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js'] // Ensure this path is correct
        });
    }
});