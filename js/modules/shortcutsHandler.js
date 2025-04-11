import { highlightKeys, resetHighlightedKeys } from "./displayHandler.js";


async function fetchJSON(url) {

    try {
        const response = await fetch(url, { mode: "no-cors" });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;

    } catch (error) {
        console.error(error.message);
    }
}

function addToShortcutList(
    toggleModifier, heldModifiers, triggerInput, stateConditions, lowConditions, description, elementIdsList) {

    // Create necessary elements
    const tableRow = document.createElement("tr");
    const rowHeader = document.createElement("th");
    const rowData1 = document.createElement("td");
    const rowData2 = document.createElement("td");
    const rowData3 = document.createElement("td");
    const rowData4 = document.createElement("td");
    const rowData5 = document.createElement("td");
    const rowData6 = document.createElement("td");

    // Add them to the row element with the formatted content
    tableRow.appendChild(rowHeader).textContent = ++loadedShortcutsCount;

    tableRow.appendChild(rowData1).textContent = toggleModifier;
    tableRow.appendChild(rowData2).textContent = heldModifiers;
    tableRow.appendChild(rowData3).textContent = triggerInput;
    tableRow.appendChild(rowData4).textContent = stateConditions;
    tableRow.appendChild(rowData5).textContent = lowConditions;
    tableRow.appendChild(rowData6).textContent = description;

    // Attach event listeners to the row
    tableRow.addEventListener("mouseenter", (e) => {
        highlightKeys(elementIdsList);
    });
    tableRow.addEventListener("mouseleave", (e) => {
        resetHighlightedKeys();
    });

    // Add the row to the DOM
    const shortcutsTable = document.getElementById("shortcutsList");
    shortcutsTable.appendChild(tableRow);
}


let loadedShortcutsCount = 0;

export { fetchJSON, addToShortcutList }
