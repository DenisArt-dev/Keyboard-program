import { keyboardIdCode } from './library.js';
import { exercisesModeAll } from './main.js';
import { hideWindowChoseNeweText } from './exercises.js';

export const keyboard = takeKeyboard();


function takeKeyboard() {

    let keyboard = {};

    keyboard.background = document.getElementById('keyboardBackground');

    keyboard.zone = {
        all: document.getElementById('keyboardZone'),
        right: document.getElementById('keyboardZoneRight'),
        left: document.getElementById('keyboardZoneLeft'),
    };

    keyboard.fingers = {
        all: document.getElementById('keyboardFingers'),
        right: document.getElementById('keyboardFingersRight'),
        left: document.getElementById('keyboardFingersLeft'),
    };

    keyboard.cyrilic = document.getElementById('keyboardCyrillic');

    let arrKeys = document.getElementsByClassName('cls-2');

    keyboard.keys = new Map();

    keyboardIdCode.forEach( (item, i) => {
        keyboard.keys.set(item[1], {backKey: arrKeys[(arrKeys.length - 1)  - i], key: item});
    } );

    if (language == 'ru') keyboard.cyrilic.style.display = 'block';

    return keyboard;

}



function showHideWindowMyText() {

    hideWindowChoseNeweText.style.display = 'block';

}

if (exercisesMode == exercisesModeAll.myText) showHideWindowMyText();


