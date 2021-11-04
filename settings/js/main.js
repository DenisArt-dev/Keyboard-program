export const exercisesModeAll = {
    forBeginers: 'Beginers',
    frase: 'Frase',
    number: 'Number',
    symb: 'Symbol',
    myText: 'MyText',
    def: 'Home',
};

export const colors = {
    keyboardKeysDef: '#e3e3e3',
    keyboardKeysFocus: '#a5a7eb',
    keyboardKeysPositive: '#a8eb9b',
    keyboardKeysNegative: '#ed8e8e',
};

const headerMenu = document.getElementsByClassName('header__menu-li');
const headerSubMenu = document.getElementsByClassName('header__menu-ul--press');
const hideWindowChoseMode = document.getElementById('hideWindowChoseMode');
const mainButtonHomePage = document.getElementById('mainButtonHomePage');


// show & hide subMenu

headerMenu[1].onclick = function() {
    showHideHeaderSubMenu(headerSubMenu, 0, 'block');
}

headerMenu[3].onclick = function() {
    showHideHeaderSubMenu(headerSubMenu, 1, 'block');
}

document.body.onclick = () => {
    if (headerMenu[1] != document.activeElement) setTimeout( () => {showHideHeaderSubMenu(headerSubMenu, 0, 'none')}, 100);
    if (headerMenu[3] != document.activeElement) setTimeout( () => {showHideHeaderSubMenu(headerSubMenu, 1, 'none')}, 100);
};


function showHideHeaderSubMenu(item, i, x) {
    item[i].style.display = x;
}


if (exercisesMode == exercisesModeAll.def) {
    loadCodeHomePage();
}

function loadCodeHomePage() {

    mainButtonHomePage.onclick = () => {

        hideWindowChoseMode.style.display = 'block';

    }

}