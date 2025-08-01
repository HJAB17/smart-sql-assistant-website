// Background script for the SQL Formatter extension

const chrome = window.chrome // Declare the chrome variable

chrome.runtime.onInstalled.addListener(() => {
  console.log("SQL Formatter extension installed")

  // Create context menu
  chrome.contextMenus.create({
    id: "formatSQL",
    title: "Formatter ce SQL",
    contexts: ["selection"],
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "formatSQL") {
    // Store the selected text to be used in popup
    chrome.storage.local.set({
      selectedSQL: info.selectionText,
    })
  }
})
