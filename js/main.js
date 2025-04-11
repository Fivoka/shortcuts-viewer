import { addInputDisplaySymbols } from "./modules/inputDisplayHandler.js";
import { formatAndAddShortcuts } from "./modules/shortcutsHandler.js";


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

let currentKeyboardLayout = "qwerty";
let keyboardLayoutObj = await fetchJSON(`js/keyboardLayouts/${currentKeyboardLayout}.json`);

addInputDisplaySymbols();
formatAndAddShortcuts();

export { fetchJSON, keyboardLayoutObj };
