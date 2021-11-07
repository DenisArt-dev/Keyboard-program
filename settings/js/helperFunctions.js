'use strict';


export function getRandomIndex(a, b) {
    return (a + Math.random() * (b - a)).toFixed();
}


export function wrapLetterToSpan(letter, mode) {
    return `<span class="screen__selectLetter secondColor${mode}" id="selectLetter">${letter}</span>`
}

export function cleanSelectLetter(text) {

    for(let i = 1; i <= 3; i++) {
        text = text.split(`<span class="screen__selectLetter secondColor${i}" id="selectLetter">`)
        .join('').split('</span>').join('');
    }

    return text;
}


export function isUpper(str, lang) {
    if (lang == 'ru') {
        if(/[ёа-я]/.test(str) || /[ЁА-Я]/.test(str)) return !/[ёа-я]/.test(str) && /[ЁА-Я]/.test(str);
        else if(/[!"№;%:?*()_+/,»«]/.test(str)) return true;
        else if(/[ ]/.test(str)) return false;
        else return null;
    }

    if(lang == 'en') {
        if(/[a-z]/.test(str) || /[A-Z]/.test(str)) return !/[a-z]/.test(str) && /[A-Z]/.test(str);
        else if(/[~!@#$%^&*()_+{}|:"<>?]/.test(str)) return true;
        else if(/[ ]/.test(str)) return false;
        else return null;
    }
}


export function connectsScreenAndKeyboard(lib, sumb, reg, lang) {

    let result = [];
    let index;

    lib.forEach((element, i) => {
        if(element[3]) {
            if(element[3][lang].includes(sumb.toLowerCase(), 0)) index = i;
        }
    });

    result.push(lib[index]);

    if(reg) {
        if (lib[index][2] == 'L') result.push(lib[66]);
        if (lib[index][2] == 'R') result.push(lib[55]);
    }

    return result;
}


export function checkLengthText(text, maxLeng) {

    let result = [];

    text.forEach( (item) => {

        item = item.replace(/ +/g, ' ').trim();

        let arr = item.split(' ');
        let str = '';
        let count = 0;

        if (arr.length > maxLeng) {

            for (let i = 0; i < arr.length; i++) {

                if (count < maxLeng) {
                    if (str != '') str = str + ' ' + arr[i];
                    else str = str + arr[i];
                    count++;
                } else {
                    i--;
                    result.push(str);
                    str = '';
                    count = 0;
                }
            }

            result.push(str);

        } else result.push(item);

    } );

    return result;

}



