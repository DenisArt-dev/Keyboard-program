export const exercisesModeAll = {
    forBeginers: 'Beginers',
    frase: 'Frase',
    number: 'Number',
    symb: 'Symbol',
    myText: 'MyText',
    def: 'Home',
    training: 'Training',
};

export const colors = {
    keyboardKeysDef: '#e3e3e3',
    keyboardKeysFocus: '#a5a7eb',
    keyboardKeysPositive: '#a8eb9b',
    keyboardKeysNegative: '#ed8e8e',
    displayNegative: '#ff4d4d',
    mainColor1: '#e8e8e8',
    mainColor2: '#111315',
    mainColor3: '#ffffff',
    mainColor4: '#a2a2a2',
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
    if (hideWindowChoseMode && mainButtonHomePage != document.activeElement) {
        setTimeout( () => {hideWindowChoseMode.style.display = 'none'}, 100);
    } 
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




// media

const burgerMenuIcon = document.querySelector('.burgerMenu__icon');

burgerMenuIcon.onclick = () => {

    const headerMenu = document.querySelector('.header__menu');

    if (headerMenu.style.display == 'block') {
        
        const headerMenuUl = document.querySelector('.header__menu-ul');
        const burgerMenu = document.querySelector('.burgerMenu');
    
        burgerMenu.firstElementChild.style.color = null;
        burgerMenu.style.marginBottom = null;
        headerMenuUl.style.display = null;
        headerMenu.style.textAlign = null;
        headerMenu.style.display = null;
        burgerMenu.style.backgroundColor = null;

        for (let i = 0; i < burgerMenuIcon.children.length; i++) {
            burgerMenuIcon.children[i].style.borderColor = null;
        }    

        return;

    }

    const headerMenuUl = document.querySelector('.header__menu-ul');
    const burgerMenu = document.querySelector('.burgerMenu');

    burgerMenu.firstElementChild.style.color = '#000';
    burgerMenu.style.marginBottom = '0px';
    burgerMenu.style.backgroundColor = '#fff';
    headerMenuUl.style.display = 'block';
    headerMenu.style.textAlign = 'center';
    headerMenu.style.display = 'block';

    for (let i = 0; i < burgerMenuIcon.children.length; i++) {
        burgerMenuIcon.children[i].style.borderColor = '#000';
    }

};


window.addEventListener('resize', resizeLis);

function resizeLis() {

    const burgerMenu = document.querySelector('.burgerMenu');
    const headerMenu = document.querySelector('.header__menu');
    const headerMenuUl = document.querySelector('.header__menu-ul');

    if (getComputedStyle(burgerMenu).display != 'flex' && headerMenuUl.style.display == 'block') {
        
        const burgerMenu = document.querySelector('.burgerMenu');
    
        burgerMenu.firstElementChild.style.color = null;
        burgerMenu.style.marginBottom = null;
        headerMenuUl.style.display = null;
        headerMenu.style.textAlign = null;
        headerMenu.style.display = null;
        burgerMenu.style.backgroundColor = null;

        for (let i = 0; i < burgerMenuIcon.children.length; i++) {
            burgerMenuIcon.children[i].style.borderColor = null;
        } 

    }

}



// Сообщение для пользователей мобильных устройств

// if (window.innerWidth < 700) {
//     alert(`Добро пожаловать на интенсивный курс слепой печати! 
//             Если вы используете мобильное устройство, то,
//             подключив к нему клавиатуру, вы сможете получить
//             доступ ко всему функционалу приложения.`);
// }