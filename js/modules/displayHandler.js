function resetHighlightedKeys() {
    const highlightedKeysList = document.getElementsByClassName("highlightedKey");    
    while (highlightedKeysList.length != 0) {
        highlightedKeysList[0].classList.remove("highlightedKey");
    }
}

function highlightKeys(elementIdsList) {
    resetHighlightedKeys();

    for (const id of elementIdsList) {
        const inputDisplayKey = document.getElementById(id);
        inputDisplayKey.classList.add("highlightedKey");
    }
}


export { highlightKeys, resetHighlightedKeys }
