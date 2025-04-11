import { keyboardLayoutObj } from "../main.js";


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

function addInputDisplaySymbols() {
    const displayInputs = document.getElementsByClassName("displayInput");
    for (const element of displayInputs) {
        element.textContent = keyboardLayoutObj.character[element.id];
    }
}


export { highlightKeys, resetHighlightedKeys, addInputDisplaySymbols }
