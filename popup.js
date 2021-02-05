const export_button = document.getElementById('export_button');
const result_goes_in = document.getElementById('result_goes_in');

export_button.onclick = () => {
    chrome.tabs.getSelected(current_tab => {
        const current_tab_id = current_tab.id;
        result_goes_in.innerHTML = 'Requesting...';
        chrome.storage.local.set({ export_response_display: '' }, () => {});
        chrome.tabs.sendMessage(current_tab_id, { type: 'export_request', source: 'popup.js', destination: 'content_script.js' });
    })
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    result_goes_in.innerHTML = 'Done';
    for (var key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
        if (key === 'export_response_display') {
            result_goes_in.innerHTML = JSON.stringify(storageChange.newValue);
        }
    }
})