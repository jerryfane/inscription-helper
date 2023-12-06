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

    // Create a new Image object
    const image = new Image();
    image.crossOrigin = 'anonymous'; // Set cross-origin to anonymous
    image.onload = function() {
        // Image is loaded, now we can convert it to base64
        convertImageToBase64(image)
            .then(base64data => {
                // Inject the base64 data into the page
                window.postMessage({
                    type: 'SET_BASE64_DATA',
                    base64data: base64data
                }, '*');

                console.log('window.currentBase64data has been set in the page context.');
            })
            .catch(error => {
                console.error('Error converting image to base64:', error);
            });
    };
    image.onerror = function() {
        console.error('Error loading image with CORS enabled.');
    };
    // Set the source to the image to trigger the load
    image.src = modalImageSrc;
}

async function convertImageToBase64(imgElement) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imgElement.naturalWidth || imgElement.width;
        canvas.height = imgElement.naturalHeight || imgElement.height;
        try {
            ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL());
        } catch (error) {
            reject(error); // Reject the promise if drawing the image fails
        }
    });
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