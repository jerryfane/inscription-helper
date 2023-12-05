document.addEventListener('DOMContentLoaded', function() {
    // Get the current value from storage and set it as the input's placeholder
    chrome.storage.local.get('ipfsGateway', function(data) {
        const currentGateway = data.ipfsGateway || 'https://ipfs.io/ipfs/'; // Default gateway if none saved
        document.getElementById('gateway').placeholder = currentGateway;
    });

    // Save button event listener
    document.getElementById('save').addEventListener('click', function() {
        const gateway = document.getElementById('gateway').value;
        if (gateway) {
        // Save the user's preferred gateway to storage
        chrome.storage.local.set({ 'ipfsGateway': gateway }, function() {
            console.log('Gateway URL saved: ' + gateway);
            // Optionally, you can provide user feedback here, like updating the placeholder to the new value
            document.getElementById('gateway').placeholder = gateway;
        });
        }
    });
});