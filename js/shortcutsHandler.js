function loadShortcuts(file_name) {

    const toggle_modifier = null;
    const held_modifiers = ["Ctrl", "Alt"];
    const trigger_input = "65";
    const state_conditions = ["scene:scene1", "mode:mode4"];
    const low_conditions = ["hovering:element1", "not_hovering:element3"];
    const description = "meow meow meow meow :3";

    addToShortcutsList(toggle_modifier, held_modifiers, trigger_input, state_conditions, low_conditions, description);
    addToShortcutsList(toggle_modifier, held_modifiers, trigger_input, state_conditions, low_conditions, description);
    addToShortcutsList("", "", "", "", "", "meow?");
}


function addToShortcutsList(toggle_modifier, held_modifiers, trigger_input, state_conditions, low_conditions, description) {

    // Format the received variables
    let new_toggle_modifier = new String();
    let new_held_modifiers = new String();
    let new_trigger_input = new String();
    let new_state_conditions = new String();
    let new_low_conditions = new String();

    // Toggle modifier
    if (toggle_modifier == null) {
        new_toggle_modifier = "None";
    } else {
        new_toggle_modifier = "idk";
    }

    // Held modifiers
    if (held_modifiers.length != 0) {
        for (key of held_modifiers) {
            new_held_modifiers += key + "+";
        }
        new_held_modifiers = new_held_modifiers.substring(0, new_held_modifiers.length - 1);
    } else {
        new_held_modifiers = "None";
    }

    // Trigger input
    if (trigger_input == "65") {
        new_trigger_input = "A";
    } else {
        new_trigger_input = "idk";
    }

    // State conditions
    if (state_conditions.length != 0) {
        for (condition of state_conditions) {
            new_state_conditions += condition + "\n";
        }
        new_state_conditions = new_state_conditions.substring(0, new_state_conditions.length - 1);
    } else {
        new_state_conditions = "None";
    }

    // Low conditions
    if (low_conditions.length != 0) {
        for (condition of low_conditions) {
            new_low_conditions += condition + "\n";
        }
        new_low_conditions = new_low_conditions.substring(0, new_low_conditions.length - 1);
    } else {
        new_low_conditions = "None";
    }

    // Create necessary elements
    const tableRow = document.createElement("tr");
    const rowHeader = document.createElement("th");
    const rowData1 = document.createElement("td");
    const rowData2 = document.createElement("td");
    const rowData3 = document.createElement("td");
    const rowData4 = document.createElement("td");
    const rowData5 = document.createElement("td");
    const rowData6 = document.createElement("td");

    // Add them to the DOM
    tableRow.appendChild(rowHeader).textContent = ++loadedShortcutsCount;

    tableRow.appendChild(rowData1).textContent = new_toggle_modifier;
    tableRow.appendChild(rowData2).textContent = new_held_modifiers;
    tableRow.appendChild(rowData3).textContent = new_trigger_input;
    tableRow.appendChild(rowData4).textContent = new_state_conditions;
    tableRow.appendChild(rowData5).textContent = new_low_conditions;
    tableRow.appendChild(rowData6).textContent = description;

    const shortcutsTable = document.getElementById("shortcutsList");
    shortcutsTable.appendChild(tableRow);
}


let loadedShortcutsCount = 0;
loadShortcuts("meow");
