
import { keyboard } from '../js/load.js';

const firstScreen = document.getElementById('firstScreen');
const secondScreen = document.getElementById('secondScreen');
const thisButton = document.getElementById('thisButton');
const mainButtonTrainingPage = document.getElementById('mainButtonTrainingPage');
const secondScreenButton = document.getElementById('secondScreenButton');
let intervalID;

thisButton.onclick = () => {
    firstScreen.style.display = 'none';
    secondScreen.style.display = 'block';
    showZoneOnKeyboard();
};

secondScreenButton.onclick = () => {
    secondScreen.style.display = 'none';
    firstScreen.style.display = 'block';
    clearInterval(intervalID);
    keyboard.fingers.all.style.display = 'none';
    keyboard.zone.all.style.display = 'none';
};


function showZoneOnKeyboard() {

    intervalID = setInterval( () => {

        if (keyboard.fingers.all.style.display != 'block') {
            keyboard.fingers.all.style.display = 'block';
        } else if (keyboard.zone.all.style.display != 'block') {
            keyboard.zone.all.style.display = 'block';
        } else {
            keyboard.fingers.all.style.display = 'none';
            keyboard.zone.all.style.display = 'none';
        }

    }, 1200 );

}