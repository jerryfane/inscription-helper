function replaceIPFSProtocol(node) {
    chrome.storage.local.get('ipfsGateway', function(data) {
        const gateway = data.ipfsGateway || 'https://ipfs.io/ipfs/'; // Default gateway
        
        // Check if the node is an element node and has attributes
        if (node.nodeType === Node.ELEMENT_NODE && node.hasAttributes()) {
            // Get all attributes of the node
            const attributes = node.attributes;
            for (let attr of attributes) {
                if (attr.value.includes('ipfs://')) {
                    attr.value = attr.value.replace(/ipfs:\/\//g, gateway);
                }
            }
        }
    })
}

// Use the existing handleMutations function
function handleMutations(mutations) {
    for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
            replaceIPFSProtocol(node); // Existing function for IPFS
        }
    }
}

// Existing code to inject script and create observer
var s = document.createElement('script');
s.src = chrome.runtime.getURL('./src/js/inject.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

// Existing MutationObserver setup
const observer = new MutationObserver(handleMutations);
observer.observe(document, {
    childList: true,
    subtree: true
});

// Replace protocols for existing nodes on the page
document.querySelectorAll('*').forEach(node => {
    replaceIPFSProtocol(node);
});