import { fetchJSON, addToShortcutList } from "./modules/shortcutsHandler.js";


function keycodeToChar(keycode) {
    if (keyboardLayoutObj.character[keycode] != undefined) {
        return keyboardLayoutObj.text[keycode];
    } else {
        return "Undefined";
    }
}

function keycodeToText(keycode) {
    if (keyboardLayoutObj.text[keycode] != undefined) {
        return keyboardLayoutObj.text[keycode];
    } else {
        return "Undefined";
    }
}


let currentKeyboardLayout = "qwerty";

// Fetch shortcuts JSON file
const shortcutsObjs = await fetchJSON("shortcuts/program_shortcuts.json");
const shortcutsList = shortcutsObjs.shortcuts;

// Fetch keyboard layout JSON file
const keyboardLayoutObj = await fetchJSON(`js/keyboardLayouts/${currentKeyboardLayout}.json`);

// Add shortcuts to the list
for (const shortcut of shortcutsList) {

    const toggleModifier = shortcut.toggle_modifier;
    const heldModifiers = shortcut.held_modifiers;
    const triggerInput = shortcut.trigger_input;
    const stateConditions = shortcut.state_conditions;
    const lowConditions = shortcut.low_conditions;
    const description = shortcut.description;

    // Format the cells' content before adding to the DOM
    let newToggleModifier = new String();
    let newHeldModifiers = new String();
    let newTriggerInput = new String();
    let newStateConditions = new String();
    let newLowConditions = new String();


    // Toggle modifier
    if (toggleModifier != null) {
        for (const key of toggleModifier.held_modifiers) {
            newToggleModifier += key + "+";
        }
        newToggleModifier += keycodeToText(toggleModifier.trigger_input);
    } else {
        newToggleModifier = "None";
    }

    // Held modifiers
    if (heldModifiers.length != 0) {
        for (const key of heldModifiers) {
            newHeldModifiers += key + "+";
        }
        newHeldModifiers = newHeldModifiers.substring(0, newHeldModifiers.length - 1);
    } else {
        newHeldModifiers = "None";
    }

    // Trigger input
    newTriggerInput = keycodeToText(triggerInput);

    // State conditions
    if (stateConditions.length != 0) {
        for (const condition of stateConditions) {
            newStateConditions += condition + "\n";
        }
        newStateConditions = newStateConditions.substring(0, newStateConditions.length - 1);
    } else {
        newStateConditions = "None";
    }

    // Low conditions
    if (lowConditions.length != 0) {
        for (const condition of lowConditions) {
            newLowConditions += condition + "\n";
        }
        newLowConditions = newLowConditions.substring(0, newLowConditions.length - 1);
    } else {
        newLowConditions = "None";
    }


    addToShortcutList(newToggleModifier, newHeldModifiers, newTriggerInput, newStateConditions, newLowConditions, description);        
}
