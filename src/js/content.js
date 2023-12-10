async function replaceIPFSProtocol(node) {
    try {
        const data = await chrome.storage.local.get('ipfsGateway');
        const gateway = data.ipfsGateway || 'https://ipfs.io/ipfs/';
        
        if (node.nodeType === Node.ELEMENT_NODE && node.hasAttributes()) {
            const attributes = node.attributes;
            for (let attr of attributes) {
                if (attr.value.includes('ipfs://')) {
                    attr.value = attr.value.replace(/ipfs:\/\//g, gateway);
                }
            }
        }
    } catch (error) {
        console.error('Error in replaceIPFSProtocol:', error);
    }
}

function handleMutations(mutations) {
    for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
            // Existing IPFS protocol replacement
            replaceIPFSProtocol(node);

            // Check for the addition of the inscribe button or its container
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.id === 'inscribe-button' || node.querySelector('#inscribe-button')) {
                    setupInscribeButtonListener();
                }
            }
        }
    }
}

function setupInscribeButtonListener() {
    const inscribeButton = document.getElementById('inscribe-button');
    const verifyButton = document.getElementById('verify-button');
    if (inscribeButton && verifyButton) {
        inscribeButton.addEventListener('click', handleInscribeClick);
        verifyButton.addEventListener('click', handleInscribeClick);
    } else {
        console.log('Inscribe or Verify button not found');
    }
}

function handleInscribeClick() {
    console.log('Inscribe or Verify clicked');
    const modalImageSrc = document.querySelector('#modal-image-container img').src;

    getImageAsBase64(modalImageSrc)
        .then(base64data => {
            // Inject the base64 data into the page
            window.postMessage({
                type: 'SET_BASE64_DATA',
                base64data: base64data
            }, '*');

            console.log('window.currentBase64data has been set in the page context.');
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}

async function getImageAsBase64(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result); // Base64 string
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error fetching image:', error);
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