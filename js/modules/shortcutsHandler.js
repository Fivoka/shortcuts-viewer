import { fetchJSON, keyboardLayoutObj } from "../main.js";
import { highlightKeys, resetHighlightedKeys } from "./inputDisplayHandler.js";


function camelize(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr) {
        return chr.toUpperCase();
    });
}

function jsonKeyToText(key) {
    if (keyboardLayoutObj.text[key] != undefined) {
        return keyboardLayoutObj.text[key];
    } else {
        return "Undefined";
    }
}

function modifierKeyToElementId(modifierKey) {
    switch (modifierKey) {
        case "Ctrl": return "keycode_17a";
        case "Shift": return "keycode_16a";
        case "Alt": return "keycode_18a";
    }
}

function jsonKeyToElementId(key) {
    if (isNaN(key)) {
        return camelize(key);
    } else {
        return "keycode_" + key;
    }
}


function addToShortcutList(toggleModifier, heldModifiers, triggerInput, stateConditions, lowConditions, description, elementIdsList) {

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

    // Attach event listeners to the row to highlight keys on the input display
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


async function formatAndAddShortcuts() {

    // Fetch shortcuts JSON file
    const shortcutsObj = await fetchJSON("shortcuts/program_shortcuts.json");
    const shortcutsList = shortcutsObj.shortcuts;

    // Add shortcuts to the list
    for (const shortcut of shortcutsList) {

        const toggleModifierHeldModifiers = shortcut.toggle_modifier.held_modifiers;
        const toggleModifierTriggerInput = shortcut.toggle_modifier.trigger_input;
        const heldModifiers = shortcut.held_modifiers;
        const triggerInput = shortcut.trigger_input;
        const stateConditions = shortcut.state_conditions;
        const lowConditions = shortcut.low_conditions;
        const description = shortcut.description;


        // Format variables for the table's data
        let newToggleModifier = new String();
        let newHeldModifiers = new String();
        let newTriggerInput = new String();
        let newStateConditions = new String();
        let newLowConditions = new String();
        let newDescription = new String();

        // Toggle modifier
        if (toggleModifierHeldModifiers != null) {
            for (const key of toggleModifierHeldModifiers) {
                newToggleModifier += key + "+";
            }
        }

        if (toggleModifierTriggerInput != null) {
            newToggleModifier += jsonKeyToText(toggleModifierTriggerInput);
        }

        if (newToggleModifier.length == 0) {
            newToggleModifier = "-";
        }

        // Held modifiers
        if (heldModifiers != null) {
            for (const key of heldModifiers) {
                newHeldModifiers += key + "+";
            }
            newHeldModifiers = newHeldModifiers.substring(0, newHeldModifiers.length - 1);
        } else {
            newHeldModifiers = "-";
        }

        // Trigger input
        newTriggerInput = triggerInput != null ? jsonKeyToText(triggerInput) : "-";

        // State conditions
        if (stateConditions != null) {
            for (const condition of stateConditions) {
                newStateConditions += condition + "\n";
            }
            newStateConditions = newStateConditions.substring(0, newStateConditions.length - 1);
        } else {
            newStateConditions = "-";
        }

        // Low conditions
        if (lowConditions != null) {
            for (const condition of lowConditions) {
                newLowConditions += condition + "\n";
            }
            newLowConditions = newLowConditions.substring(0, newLowConditions.length - 1);
        } else {
            newLowConditions = "-";
        }

        // Description
        newDescription = description != null ? description : "-";


        // Make a list of IDs of the elements to highlight on the input display
        const highlightedKeysList = new Array();

        // Held modifiers
        if (heldModifiers != null) {
            for (let modifier of heldModifiers) {
                highlightedKeysList.push(modifierKeyToElementId(modifier));
            }
        }

        // Trigger input
        if (triggerInput != null) {
            highlightedKeysList.push(jsonKeyToElementId(triggerInput));
        }


        addToShortcutList(newToggleModifier, newHeldModifiers, newTriggerInput, newStateConditions, newLowConditions, newDescription, highlightedKeysList);
    }
}


let loadedShortcutsCount = 0;

export { formatAndAddShortcuts };
