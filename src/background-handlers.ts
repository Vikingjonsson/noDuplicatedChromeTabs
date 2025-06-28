const IGNORED_URLS = ['chrome://', 'chrome-extension://', 'about:blank'];

const isValidUrl = (url: string | undefined): url is string => {
  if (!url || typeof url !== 'string') return false;
  return !IGNORED_URLS.some((ignored) => url.startsWith(ignored));
};

const normalizeUrl = (url: string): string | null => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    urlObj.hash = '';
    return urlObj.toString().replace(/\/$/, '');
  } catch {
    return url;
  }
};

const findDuplicateTab = async (
  targetUrl: string,
  excludeTabId: number
): Promise<chrome.tabs.Tab | null> => {
  if (!isValidUrl(targetUrl)) return null;

  const normalizedTarget = normalizeUrl(targetUrl);
  if (!normalizedTarget) return null;

  try {
    const tabs = await chrome.tabs.query({});
    return (
      tabs.find(
        (tab) => tab.id !== excludeTabId && tab.url && normalizeUrl(tab.url) === normalizedTarget
      ) || null
    );
  } catch {
    return null;
  }
};

const focusAndRemove = async (
  existingTab: chrome.tabs.Tab,
  duplicateTabId: number
): Promise<void> => {
  if (!existingTab.id) return;

  try {
    await chrome.tabs.update(existingTab.id, { active: true });
    if (existingTab.windowId) {
      await chrome.windows.update(existingTab.windowId, { focused: true });
    }
    await chrome.tabs.remove(duplicateTabId);
  } catch {
    // Silently handle errors
  }
};

const handleTab = async (url: string, tabId: number): Promise<void> => {
  if (!isValidUrl(url) || !tabId) return;

  const duplicate = await findDuplicateTab(url, tabId);
  if (duplicate) {
    await focusAndRemove(duplicate, tabId);
  }
};

export const handleTabCreated = (tab: chrome.tabs.Tab): Promise<void> => {
  if (tab.url && tab.id) {
    return handleTab(tab.url, tab.id);
  }
  return Promise.resolve();
};

export const handleTabUpdated = (
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo
): Promise<void> => {
  if (changeInfo.url && changeInfo.status === 'loading') {
    return handleTab(changeInfo.url, tabId);
  }
  return Promise.resolve();
};
