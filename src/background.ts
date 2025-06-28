import { handleTabCreated, handleTabUpdated } from './background-handlers';

chrome.tabs.onCreated.addListener(handleTabCreated);
chrome.tabs.onUpdated.addListener(handleTabUpdated);
