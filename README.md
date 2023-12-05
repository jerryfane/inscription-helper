
# Inscription Helper Chrome Extension

## Overview

Inscription Helper is a Chrome extension designed to seamlessly load IPFS (InterPlanetary File System) files directly from Bitcoin Ordinals inscriptions. This extension is especially useful for those interacting with Bitcoin Ordinals, as it automatically recognizes inscriptions requesting files with `ipfs://` protocol and retrieves them using IPFS.

## Features

-   **IPFS Integration**: Automatically detects `ipfs://` links in Bitcoin Ordinals inscriptions and loads the associated files.
-   **Customizable IPFS Gateway**: Users can configure their preferred IPFS gateway. The default gateway is `https://ipfs.io/ipfs/`.
-   **User-Friendly Interface**: Simple and easy-to-use interface, enhancing the user experience in interacting with Bitcoin Ordinals and IPFS.

## Installation

Follow these steps to install Inscription Helper:

1.  **Clone the Repository**
    
    -   Open your terminal.
    -   Run the command: `git clone https://github.com/jerryfane/inscription-helper.git`
    -   This will download the code to your local machine.
2.  **Enable Developer Mode in Chrome**
    
    -   Open the Chrome browser.
    -   Go to `chrome://extensions/` in your browser.
    -   Enable 'Developer mode' at the top-right corner.
3.  **Load the Extension**
    
    -   Click on 'Load unpacked' button on the top-left corner.
    -   Navigate to the directory where you cloned the Inscription Helper repository.
    -   Select the folder and click 'Open'.

The Inscription Helper Chrome Extension should now be added to your Chrome browser and ready to use.

## Configuration

To configure a different IPFS gateway:

-   Click on the Inscription Helper icon in your Chrome toolbar.
-   Go to the settings page in the extension.
-   Enter the URL of your preferred IPFS gateway.
-   Save the changes.

The extension will now use your specified gateway to load IPFS files.

## Usage

Simply browse Bitcoin Ordinals and when an inscription with an `ipfs://` link is detected, Inscription Helper will automatically retrieve the file via the configured IPFS gateway.

## Donations

If you find Inscription Helper useful and would like to support its development, consider making a donation. Any amount is greatly appreciated and will help further development and maintenance.

Bitcoin Address for Donations: `bc1pqgxx27urevpvtxrnfdahgfxcn55vhv63sv7v9xujy3mraykhcf9q7xlumn`

## Support

For support, feature requests, or bug reports, please open an issue on the [GitHub repository page](https://github.com/jerryfane/inscription-helper/issues).

## License

Inscription Helper is licensed under [MIT License](https://opensource.org/licenses/MIT).