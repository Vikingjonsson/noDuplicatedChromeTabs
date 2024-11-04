const getExistingTabIdWithUrl = async (url, newTabId) => {
  const tabs = await chrome.tabs.query({});
  const existingTab = tabs.find(tab => tab.url === url && tab.id !== newTabId);
  return existingTab?.id ?? null;
};

const focusAndRemoveDuplicateTab = async (url, newTabId) => {
  if(url && url === "chrome://newtab/") {
      return;
    }

  const existingTabId = await getExistingTabIdWithUrl(url, newTabId);

  if (existingTabId) {
    chrome.tabs.update(existingTabId, { active: true });
    chrome.tabs.remove(newTabId);
  }
};

chrome.tabs.onCreated.addListener(async (tab) => {
  await focusAndRemoveDuplicateTab(tab.url, tab.id);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  await focusAndRemoveDuplicateTab(changeInfo.url, tabId);
});
