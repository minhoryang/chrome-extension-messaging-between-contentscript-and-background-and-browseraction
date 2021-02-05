# chrome-extension-messaging-between-contentscript-and-background-and-browseraction

## Prepare

- `background.js` listen `chrome.runtime.onMessage`(`export_response`)
- `content_script.js` inject `real_content_script.js`
- `content_script.js` listen `chrome.runtime.onMessage` and fire it to `onMyExtensionMessage`
- `content_script.js` listen `onMyWebpageMessage`
- `real_content_script.js` listen `onMyExtensionMessage`
- `popup.js` listen `chrome.storage.onChanged`

## Action

- `popup.html` trigger `chrome.tabs.sendMessage({type: 'export_request', ...})`
  - `content_script.js` triggered `onExtensionMessage()`
    - trigger `new CustomEvent('onMyExtensionMessage', ...)`
- `real_content_script.js` trigger `new CustomEvent('onMyWebpageMessage', ...)`
- `content_script.js` resend this to `chrome.runtime.sendMessage({ type: 'export_response', ...`
- `background.js` save it to `chrome.storage.local.set({ export_response_display: ...})`
- `popup.js` display the value by `chrome.storage.onChanged`
