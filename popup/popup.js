var background = browser.extension.getBackgroundPage();

function showPopup() {
    $("body").removeClass("hidden");
    $("#dblp-input").focus();
}

if(background.keyboardShortcut) {
    browser.tabs.executeScript({ file: "/content_scripts/readSelection.js" }).then(
        results => {
            let query = results[0];
            if(query === "") {
                showPopup()
            } else {
                background.search(query);
                window.close();
            }
        },
        error => showPopup()
    );
} else {
    showPopup();
}
background.keyboardShortcut = false;

$("#form").on("submit", _ => {
    let query = $("#dblp-input").val();
    background.search(query);
    window.close();
});