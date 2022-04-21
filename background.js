function search(query) {
    browser.tabs.create({url: `https://dblp.uni-trier.de/search?q=${encodeURIComponent(query)}`});
}

var keyboardShortcut = false;

browser.commands.onCommand.addListener(command => {
    if (command === "toggle-popup") {
        keyboardShortcut = true;
        browser.browserAction.openPopup();
    }
});

browser.contextMenus.create({
    id: "search-dblp",
    title: "Search DBLP",
    contexts: ["selection"]
})

browser.contextMenus.onClicked.addListener(info => {
    if(info.menuItemId === "search-dblp") {
        search(info.selectionText);
    }
})