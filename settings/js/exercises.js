import { textForDisplayRu } from '../js/library.js';
import { textForDisplayEn } from '../js/library.js';
import { getRandomIndex } from '../js/helperFunctions.js';
import { wrapLetterToSpan } from '../js/helperFunctions.js';
import { cleanSelectLetter } from '../js/helperFunctions.js';
import { exercisesModeAll } from '../js/main.js';
import { keyboard } from '../js/load.js';
import { isUpper } from '../js/helperFunctions.js';
import { keyboardIdCode } from '../js/library.js';
import { connectsScreenAndKeyboard } from '../js/helperFunctions.js';
import { colors } from '../js/main.js';
import { checkLengthText } from '../js/helperFunctions.js';


// font size chenge
const fontSizeInner = document.getElementById('fontSizeInner');
const fInner = document.querySelector('#buttonsSVGf span');
const fontSizePlus = document.getElementById('fontSizePlus');
const fontSizeMinus = document.getElementById('fontSizeMinus');

const countSymbolsHTML = document.getElementById('countSymbolsHTML');

const screenDisplay = document.querySelector('.screen__display');
const screenText = document.getElementById('screenText');

const buttonStart = document.getElementById('buttonStart');

// pause
const buttonPause = document.getElementById('buttonPause');
const hideWindowPause = document.getElementById('hideWindowPause');
const hideWindowPauseContinue = document.getElementById('hideWindowPauseContinue');
const hideWindowPauseEnd = document.getElementById('hideWindowPauseEnd');

// set timer
const buttonSetTimer = document.getElementById('buttonSetTimer');
const hideWindowSetTimer = document.getElementById('hideWindowSetTimer');
const hideWindowSwgArray = document.getElementsByClassName('hideWindowSwg');
const hideWindowTimeScreen = document.getElementById('hideWindowTimeScreen');
const hideWindSetTimOk = document.getElementById('hideWindSetTimOk');
const hideWindSetTimCancel = document.getElementById('hideWindSetTimCancel');

// ChooseLesson
const buttonChooseLesson = document.getElementById('buttonChooseLesson');
const hideWindowChooseLesson = document.getElementById('hideWindowChooseLesson');
const hideWindChooseLessonCancel = document.getElementById('hideWindChooseLessonCancel');
const hideWindChooseLessonOk = document.getElementById('hideWindChooseLessonOk');
const buttonsLessons = document.getElementsByClassName('buttonsLessons');

// My Text
const buttonChoseNeweText = document.getElementById('buttonChoseNeweText');
const hideWindowChoseNeweText = document.getElementById('hideWindowChoseNeweText');
const choseNeweTextOk = document.getElementById('choseNeweTextOk');
// const textareaChoseNeweText = document.getElementById('textareaChoseNeweText');

// hideWindowScreenSize
const hideWindowScreenSize = document.getElementById('hideWindowScreenSize');
const changeScreenSizeBtn = document.getElementById('changeScreenSizeBtn');
const hideWindowScreenSizeBtCen = document.getElementById('hideWindowScreenSizeBtCen');
const hideWindowScreenSizeBtOk = document.getElementById('hideWindowScreenSizeBtOk');
const screenSizeSliderWidth = {
    slider: document.querySelectorAll('.hideWindowScreenSize__slider')[0],
    runner: document.querySelectorAll('.hideWindowScreenSize__sliderRunner')[0],
    descr: document.querySelectorAll('.hideWindowScreenSize__sliderDescr')[0],
};
const screenSizeSliderHeight = {
    slider: document.querySelectorAll('.hideWindowScreenSize__slider')[1],
    runner: document.querySelectorAll('.hideWindowScreenSize__sliderRunner')[1],
    descr: document.querySelectorAll('.hideWindowScreenSize__sliderDescr')[1],
};


const timerScreen = document.getElementById('timerScreen');


export { hideWindowChoseNeweText };


let intensTraining = 25;
let maxLengthDisplayText = 60;

let startSwich = false;
let indexSelectLetter = 0;
let selectLetterGlobal;
let keyNeed;
let idIntervalTimeCount;
let idIntervalCheckIsFoc;
let idTimeounTimeCount;
let timeCount = new Date().setHours(0, 0, 0);
let isShiftPress = false;
let keyPressResult;
let lastKey;
let pauseSwich = false;
let isSetHideTimer = null;
let isKeyPress;
let lessonNum = 1;
let lessonNumChange = 1;
let lessonsEnd = false;
let arrtextForDisplay;
let textareaChoseNeweText = document.getElementById('textareaChoseNeweText');

let statistics = {
    positive: new Set(),
    negative: new Set(),
    time: null,
    countPositive: 0,
    countNegative: 0,
    allSumbols: 0,
};

let formatterDate = new Intl.DateTimeFormat('ru', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});


if (screenText) loadCodeExercises();


function loadCodeExercises() {

    fontSizePlus.onclick = () => chengeFontSize(+fontSizeInner.innerHTML + 1);
    fontSizeMinus.onclick = () => chengeFontSize(+fontSizeInner.innerHTML - 1);


    buttonStart.onclick = () => {
        start(exercisesMode);
    }


    buttonPause.onclick = () => {
        doPause();
    }

    hideWindowPauseContinue.onclick = () => {
        doPause();
    }

    hideWindowPauseEnd.onclick = () => {
        hideWindowPause.style.display = 'none';
        end();
    }




    //// chengeFontSize

    function chengeFontSize(x) {

        if (x > 40 || x < 10) return;

        let arr = [190, 160, 130, 100, 90, 80, 70, 65, 60, 60, 50, 40, 35, 30, 25, 23, 21, 19, 17, 15, 13, 11, 9];

        if (x > fontSizeInner.innerHTML) { // +
            if (x <= 32) maxLengthDisplayText = arr[x - 10];
        } else { // -
            if (x <= 32) maxLengthDisplayText = arr[x - 10];
        }

        screenText.style.fontSize = `${x}px`;
        fontSizeInner.innerHTML = x;
        fInner.innerHTML = x; 

    }

    ////



    /// Start


    function start(mode) {

        if (startSwich) return;

        let checIsHideWindowTrue = document.getElementsByClassName('hideWindow');

        for (let i = 0; i < checIsHideWindowTrue.length; i++) {
            if (checIsHideWindowTrue[i].style.display == 'block') return;
        }

        if (exercisesMode == exercisesModeAll.forBeginers) {

            if (language == 'ru') arrtextForDisplay = mixTextForBeginers(textForDisplayRu, lessonNum);
            if (language == 'en') arrtextForDisplay = mixTextForBeginers(textForDisplayEn, lessonNum);

            if (lessonsEnd) {

                lessonsEnd = false;
                lessonNum = 1;

                if (language == 'ru') screenText.innerHTML = `Поздравляем! Вы успешно завершили интенсивный курс слепой печати. Теперь вам предстоит закрепить полученные знания на практике. Со временем у вас разовьется мышечная память и вы будете печатать вслепую даже не задумываясь об этом. Перейдите в раздел "Упражнения" и выберите один из вариантов. Начинайте тренировку на более реальных примерах. Желаем вам успехов!`;

                if (language == 'en') screenText.innerHTML = `Congratulations! You have successfully completed the intensive blind typing course. Now it's up to you to consolidate your knowledge in practice. Over time you will develop muscle memory and you will type blindly without even thinking about it. Go to the "Exercises" section and choose one of the options. Start your practice with more real-world examples. We wish you success!`;

                return;

            }

        }

        if (exercisesMode == exercisesModeAll.number) {
            if (language == 'ru') arrtextForDisplay = mixTextNumSymb(textForDisplayRu.number);
            if (language == 'en') arrtextForDisplay = mixTextNumSymb(textForDisplayEn.number);
        }
        if (exercisesMode == exercisesModeAll.symb) {
            if (language == 'ru') arrtextForDisplay = mixTextNumSymb(textForDisplayRu.symb);
            if (language == 'en') arrtextForDisplay = mixTextNumSymb(textForDisplayEn.symb);
        }
        if (exercisesMode == exercisesModeAll.myText) {
            arrtextForDisplay = checkLengthText([textareaChoseNeweText.value], maxLengthDisplayText);
        }

        startSwich = true;

        chowtextForDisplayRu(mode);
        refreshScreen();

        let a = String(formatterDate.format(new Date(timeCount)));
        let b = String(formatterDate.format(new Date().setHours(0, 0, 0)));

        if (a == b) {
            startTime();
        } else {
            startTimer();
        }

        idIntervalCheckIsFoc = setInterval(checkIsFocusLetOnKeyb, 100);

    }

    ///


    // // show Text For...

    // / main
    function chowtextForDisplayRu(mode) {

        if (mode == exercisesModeAll.forBeginers) chowtextForDisplayRuBeginers();
        if (mode == exercisesModeAll.frase) chowtextForDisplayFrase();
        if (mode == exercisesModeAll.number || mode == exercisesModeAll.symb) chowtextForDisplayRuNumSymb();
        if (mode == exercisesModeAll.myText) chowtextForDisplayRuMyText();

    }
    // / 

    function chowtextForDisplayRuBeginers() {

        arrtextForDisplay = checkLengthText(arrtextForDisplay, maxLengthDisplayText);
        screenText.innerHTML = arrtextForDisplay[arrtextForDisplay.length - 1];
        arrtextForDisplay.pop();

    }

    function chowtextForDisplayFrase() {

        let text;

        if (language == 'ru') text = textForDisplayRu.frase
        if (language == 'en') text = textForDisplayEn.frase

        if (!arrtextForDisplay || arrtextForDisplay.length == 0) {
            arrtextForDisplay = checkLengthText([text[getRandomIndex(0, text.length - 1)]], maxLengthDisplayText);
        }

        screenText.innerHTML = arrtextForDisplay[0];
        arrtextForDisplay.shift();

    }

    function chowtextForDisplayRuNumSymb() {

        screenText.innerHTML = arrtextForDisplay[0];
        arrtextForDisplay.shift();

    }

    function chowtextForDisplayRuMyText() {
        screenText.innerHTML = arrtextForDisplay[0];
        arrtextForDisplay.shift();
    }

    // //


    function refreshScreen() {

        let text = cleanSelectLetter(screenText.innerHTML).split('');

        text.forEach((item, i) => {
            if (isUpper(item, language) == null) text[i] = '*';
        });

        selectLetterGlobal = text[indexSelectLetter];

        if (!selectLetterGlobal && indexSelectLetter) {

            if (arrtextForDisplay.length == 0 && exercisesMode == exercisesModeAll.forBeginers) {

                end();

                if (lessonNum != 7) lessonNum++;
                else lessonsEnd = true;

                return;
            }

            if (exercisesMode == exercisesModeAll.number ||
                exercisesMode == exercisesModeAll.symb ||
                exercisesMode == exercisesModeAll.myText) {
                if (!arrtextForDisplay[0]) {
                    end();
                    return;
                }
            }

            indexSelectLetter = 0;
            statistics.positive.clear();
            statistics.negative.clear();

            chowtextForDisplayRu(exercisesMode);
            text = cleanSelectLetter(screenText.innerHTML).split('');
            selectLetterGlobal = text[indexSelectLetter];
            text[indexSelectLetter] = wrapLetterToSpan(text[indexSelectLetter], 3);
            screenText.innerHTML = text.join('');
            showFocusLetterOnKeyboard();
            return;
        }

        statistics.positive.forEach((item) => {
            text[item] = wrapLetterToSpan(text[item], 1);
        });

        statistics.negative.forEach((item) => {
            text[item] = wrapLetterToSpan(text[item], 2);
        });

        text[indexSelectLetter] = wrapLetterToSpan(text[indexSelectLetter], 3);
        screenText.innerHTML = text.join('');
        showFocusLetterOnKeyboard();
    }


    /// / start Timer

    function startTime() {

        idIntervalTimeCount = setInterval(() => {
            timeCount = timeCount + 1000;
            timerScreen.innerHTML = formatterDate.format(new Date(timeCount));
        }, 1000);

    }

    function startTimer() {

        timerScreen.innerHTML = formatterDate.format(new Date(timeCount));

        let a = String(formatterDate.format(new Date(timeCount)));
        let arr = a.split(':');
        let timeOut = (arr[0] * 60 * 60 * 1000) + (arr[1] * 60 * 1000) + (arr[2] * 1000);

        idTimeounTimeCount = setTimeout(() => {
            end();
        }, timeOut);

        idIntervalTimeCount = setInterval(() => {
            timeCount = timeCount - 1000;
            timerScreen.innerHTML = formatterDate.format(new Date(timeCount));
        }, 1000);

        isSetHideTimer = a;

    }

    /// /


    // //// / set timer

    if (exercisesMode != exercisesModeAll.forBeginers) loadCodeFrase();

    function loadCodeFrase() {

        const buttonsSVGt = document.getElementById('buttonsSVGt'); // media

        buttonsSVGt.onclick = btSetTimerLis; // media
        buttonSetTimer.onclick = btSetTimerLis;
        
        function btSetTimerLis() {

            if (!startSwich) {

                if (exercisesMode == exercisesModeAll.myText && hideWindowChoseNeweText.style.display == 'block') return;

                if (hideWindowSetTimer.style.display == 'block') hideWindowSetTimer.style.display = 'none';
                else {
                    hideWindowSetTimer.style.display = 'block';
                    setTimerHideWindow();
                }

            }

        }

    }


    function setTimerHideWindow() {

        hideWindowSwgArray[0].onclick = () => {
            let time = hideWindowTimeScreen.innerHTML.split(':');
            hideWindowTimeScreen.innerHTML = formatterDate.format(new Date().setHours(++time[0], time[1], time[2]));
        };

        hideWindowSwgArray[1].onclick = () => {
            let time = hideWindowTimeScreen.innerHTML.split(':');
            hideWindowTimeScreen.innerHTML = formatterDate.format(new Date().setHours(time[0], ++time[1], time[2]));
        };

        hideWindowSwgArray[2].onclick = () => {
            let time = hideWindowTimeScreen.innerHTML.split(':');
            hideWindowTimeScreen.innerHTML = formatterDate.format(new Date().setHours(time[0], time[1], ++time[2]));
        };

        hideWindowSwgArray[5].onclick = () => {
            let time = hideWindowTimeScreen.innerHTML.split(':');
            hideWindowTimeScreen.innerHTML = formatterDate.format(new Date().setHours(--time[0], time[1], time[2]));
        };

        hideWindowSwgArray[4].onclick = () => {
            let time = hideWindowTimeScreen.innerHTML.split(':');
            hideWindowTimeScreen.innerHTML = formatterDate.format(new Date().setHours(time[0], --time[1], time[2]));
        };

        hideWindowSwgArray[3].onclick = () => {
            let time = hideWindowTimeScreen.innerHTML.split(':');
            hideWindowTimeScreen.innerHTML = formatterDate.format(new Date().setHours(time[0], time[1], --time[2]));
        };

        hideWindSetTimOk.onclick = () => {
            let time = hideWindowTimeScreen.innerHTML.split(':');
            timeCount = new Date().setHours(time[0], time[1], time[2]);
            hideWindowSetTimer.style.display = 'none';
            hideWindowTimeScreen.innerHTML = formatterDate.format(new Date(timeCount));
        };

        hideWindSetTimCancel.onclick = () => {
            hideWindowSetTimer.style.display = 'none';
            hideWindowTimeScreen.innerHTML = formatterDate.format(new Date(timeCount));
        };

    }

    // //// /



    /// /// ChoseLesson

    if (exercisesMode == exercisesModeAll.forBeginers) loadCodeForBeginers();

    function buttonChooseLessonListener() {

        if (hideWindowChooseLesson.style.display == 'block') {

            hideWindowChooseLesson.style.display = 'none';

        } else {

            if (startSwich) return;

            for (let y = 0; y < 7; y++) {

                buttonsLessons[y].style.border = '1px solid rgba(255,255,255,.05)';

            }

            lessonNumChange = lessonNum;
            buttonsLessons[lessonNum - 1].style.border = 'solid 1px #a2a2a2';
            hideWindowChooseLesson.style.display = 'block';

        }

    }

    function loadCodeForBeginers() {

        buttonChooseLesson.onclick = buttonChooseLessonListener;

        for (let i = 0; i < 7; i++) {

            buttonsLessons[i].onclick = () => {

                for (let y = 0; y < 7; y++) {

                    buttonsLessons[y].style.border = '1px solid rgba(255,255,255,.05)';

                }

                buttonsLessons[i].style.border = 'solid 1px #a2a2a2';
                lessonNumChange = i + 1;

            }

        }

        hideWindChooseLessonOk.onclick = () => {
            lessonNum = lessonNumChange;
            hideWindowChooseLesson.style.display = 'none';
        }


        hideWindChooseLessonCancel.onclick = () => {
            hideWindowChooseLesson.style.display = 'none';
        }



    }

    /// ///


    // / / // My Tex

    if (exercisesMode == exercisesModeAll.myText) {
        loadCodeMyText();
    }

    function loadCodeMyText() {

        const buttonsSVGst = document.getElementById('buttonsSVGst'); // media
        buttonsSVGst.onclick = choseNeweTextLis; // media

        buttonChoseNeweText.onclick = choseNeweTextLis;

        function choseNeweTextLis() {

            if (startSwich) return;

            // if (exercisesMode == exercisesModeAll.myText && hideWindowChoseNeweText.style.display == 'block') return;
            if (hideWindowSetTimer.style.display == 'block') return;

            if (textareaChoseNeweText.value == '') {
                if (language == 'ru') textareaChoseNeweText.value = 'Вставьте сюда свой текст!';
                if (language == 'en') textareaChoseNeweText.value = 'Insert your text here!';
                return;
            }

            if (hideWindowChoseNeweText.style.display != 'block') {
                hideWindowChoseNeweText.style.display = 'block';
            } else {
                hideWindowChoseNeweText.style.display = 'none';
                arrtextForDisplay = checkLengthText([textareaChoseNeweText.value], maxLengthDisplayText);
            }

        }

        choseNeweTextOk.onclick = () => {

            textareaChoseNeweText = document.getElementById('textareaChoseNeweText');

            if (textareaChoseNeweText.value == '') {
                if (language == 'ru') textareaChoseNeweText.value = 'Вставьте сюда свой текст!';
                if (language == 'en') textareaChoseNeweText.value = 'Insert your text here!';
                return;
            }

            hideWindowChoseNeweText.style.display = 'none';

        };

    }

    // / / //


    //// / Pause


    function doPause() {

        if (!startSwich) return;

        if (!pauseSwich) {

            hideWindowPause.style.display = 'block';
            clearInterval(idIntervalTimeCount);
            clearTimeout(idTimeounTimeCount);
            pauseSwich = true;

        } else {

            hideWindowPause.style.display = 'none';

            if (!isSetHideTimer) startTime();
            else startTimer();

            pauseSwich = false;

        }

    }

    //// /


    // // // Tracking Keystrokes

    document.addEventListener('keydown', trackingKeystrokesDown);
    document.addEventListener('keyup', trackingKeystrokesUP);

    function trackingKeystrokesDown(event) {

        if (event.code == 'Escape') doPause();
        if (pauseSwich) return;

        isKeyPress = true;

        let keyPress = keyboard.keys.get(event.code);

        if (selectLetterGlobal && !pauseSwich && keyPress.key[1] != 'Escape') {

            if (keyPress.key[1] == keyNeed[0][1] && !keyNeed[1] && keyPress.key[3] && !isShiftPress) {
                nextStep();
            } else if (keyPress.key[1] == keyNeed[0][1] && isShiftPress && keyPress.key[3] && keyNeed[1]) {
                nextStep();
            } else if (keyPress.key[3]) {
                setColorToKeys(keyPress, colors.keyboardKeysNegative);
                screenDisplay.style.backgroundColor = colors.keyboardKeysNegative;
                if (!statistics.positive.has(indexSelectLetter)) {
                    statistics.negative.add(indexSelectLetter);
                }
                statistics.countNegative++;
                keyPressResult = 0;
            } else {
                setColorToKeys(keyPress, colors.keyboardKeysPositive);
            }

        }

        function nextStep() {

            setColorToKeys(keyPress, colors.keyboardKeysPositive);

            if (!statistics.negative.has(indexSelectLetter)) {
                statistics.positive.add(indexSelectLetter);
            }

            statistics.countPositive++;
            indexSelectLetter++;
            keyPressResult = 1;
            statistics.allSumbols++;

            cleanSelectLetterOnKeyboard(false);

            refreshScreen();

        }

        if (event.code == 'Enter' && pauseSwich) doPause();
        if (event.code == 'Space' || event.code == 'Enter') start(exercisesMode);
        if (event.key == 'Shift') isShiftPress = true;

        countSymbolsHTML.innerHTML = statistics.allSumbols;

    }

    function trackingKeystrokesUP(event) {

        isKeyPress = false;

        let keyPress = keyboard.keys.get(event.code);

        if (selectLetterGlobal && keyPress.key[1] != 'Escape') {

            if (!lastKey || lastKey[0] != keyNeed[0]) setColorToKeys(keyPress, colors.keyboardKeysDef);
            if (keyPressResult == 0) setColorToKeys(keyPress, colors.keyboardKeysDef);
            if (event.key == 'Shift') isShiftPress = false;

        }

        screenDisplay.style.backgroundColor = colors.mainColor3;

    }

    // // // 


    function checkIsFocusLetOnKeyb() {

        if (isKeyPress) return
        else {
            keyNeed.forEach((item) => {
                setColorToKeys(keyboard.keys.get(item[1]), colors.keyboardKeysFocus);
            });
        }

    }


    function showFocusLetterOnKeyboard() {

        let swichUpperCase = isUpper(selectLetterGlobal, language);
        lastKey = keyNeed;
        keyNeed = connectsScreenAndKeyboard(keyboardIdCode, selectLetterGlobal, swichUpperCase, language);

        keyNeed.forEach((item) => {

            setColorToKeys(keyboard.keys.get(item[1]), colors.keyboardKeysFocus);

        });

    }


    function cleanSelectLetterOnKeyboard(mode) {

        for (let i = 0; i < keyboard.keys.size - 1; i++) {

            let item = keyboard.keys.get(keyboardIdCode[i][1]);

            if (item.backKey.style.fill != colors.keyboardKeysDef && !item.key[3]) {
                setColorToKeys(keyboard.keys.get(keyboardIdCode[i][1]), colors.keyboardKeysDef);
            } else if (mode) {
                setColorToKeys(keyboard.keys.get(keyboardIdCode[i][1]), colors.keyboardKeysDef);
            }

        }

    }


    function setColorToKeys(keyL, color) {

        if (!keyL.backKey) keyL = keyboard.keys.get(keyL[1]);

        keyL.backKey.style.fill = color;

    }



    function end() {

        clearInterval(idIntervalCheckIsFoc);
        clearInterval(idIntervalTimeCount);
        cleanSelectLetterOnKeyboard(true);
        showStatisticsEnd(language);

        countSymbolsHTML.innerHTML = 0;

        if (isSetHideTimer) clearInterval(idIntervalTimeCount);

        varDef();

    }



    function showStatisticsEnd(lang) {

        statistics.time = formatterDate.format(new Date(timeCount));

        let timeSmbMin = (new Date(timeCount).getHours() * 60 * 60) +
            (new Date(timeCount).getMinutes() * 60) +
            (new Date(timeCount).getSeconds());

        let result;
        let title;

        if (isSetHideTimer) {
            statistics.time = isSetHideTimer;
            isSetHideTimer = isSetHideTimer.split(':');
            timeSmbMin = (+isSetHideTimer[0] * 60 * 60) + (+isSetHideTimer[1] * 60) + (+isSetHideTimer[2]);
        }

        let accuracy = ((statistics.countPositive * 100) / (statistics.countNegative + statistics.countPositive)).toFixed() + '%';
        if (accuracy == 'NaN%') accuracy = '?'

        timeSmbMin = ((statistics.allSumbols / timeSmbMin) * 60).toFixed();
        if (timeSmbMin == 'NaN') timeSmbMin = 0;

        if (lang == 'ru') {

            result = `<p class="statisticsEnd">Ваша скорость печати (символов в минуту) — <span>${timeSmbMin}</span></p>
                  <p class="statisticsEnd">Точность — <span>${accuracy}<span></p>
                  <p class="statisticsEnd">Символов напечатано — <span>${statistics.allSumbols}</span></p>
                  <p class="statisticsEnd">Затраченное время — <span>${statistics.time}</span></p>`;

            if (exercisesMode == exercisesModeAll.forBeginers) {
                title = `<p class="statisticsEnd"><span>Статистика по уроку №${lessonNum}<span></p>`;
            } else title = `<p class="statisticsEnd"><span>Статистика:<span></p>`;

            screenText.innerHTML = title + result;

        }

        if (lang == 'en') {

            result = `<p class="statisticsEnd">Your typing speed (characters per minute) — <span>${timeSmbMin}</span></p>
                  <p class="statisticsEnd">Accuracy — <span>${accuracy}<span></p>
                  <p class="statisticsEnd">Characters typed — <span>${statistics.allSumbols}</span></p>
                  <p class="statisticsEnd">Time spent — <span>${statistics.time}</span></p>`;

            if (exercisesMode == exercisesModeAll.forBeginers) {
                title = `<p class="statisticsEnd"><span>Lesson statistics #${lessonNum}<span></p>`;
            } else title = `<p class="statisticsEnd"><span>Statistics:<span></p>`;

            screenText.innerHTML = title + result;

        };

    }



    function varDef() {

        startSwich = false;
        indexSelectLetter = 0;
        selectLetterGlobal = undefined;
        keyNeed = undefined;
        idIntervalTimeCount = undefined;
        timeCount = new Date().setHours(0, 0, 0);
        isShiftPress = false;
        keyPressResult = undefined;
        lastKey = undefined;
        pauseSwich = false;
        isSetHideTimer = null;
        arrtextForDisplay = null;

        statistics = {
            positive: new Set(),
            negative: new Set(),
            time: null,
            countPositive: 0,
            countNegative: 0,
            allSumbols: 0,
        };

        timerScreen.innerHTML = formatterDate.format(new Date(timeCount));

    }



    // / // mix text

    function mixTextForBeginers(lib, lesson) {

        let mainResult = [];
        let result = [];
        let index;
        let text = '';
        let settings = [];
        let y;

        for (let i = lesson; i > 0; i--) {

            settings.push(lib.forBeginers[i - 1].length);

            for (let x = lib.forBeginers[i - 1].length - 1; x >= 0; x--) {

                let arr = lib.forBeginers[i - 1][x];

                for (let n = 0; n < (intensTraining * 2); n++) {
                    index = getRandomIndex(0, arr.length + 1);
                    if (!arr[index] && !text.endsWith(' ') && text != '') text += ' ';
                    else if (!arr[index]) {
                        text += arr[getRandomIndex(0, arr.length - 1)].toUpperCase();
                    } else text += arr[index];
                }

                result.push(text);

                text = '';

            }

        }

        settings.reverse();

        for (let i = 0; i < settings[lesson - 1]; i++) {

            let mix = result.join('').split('').sort(() => Math.random() - 0.5).join('');

            mix = mix.replace(/ +/g, ' ').trim();

            if (result.length > 1) mainResult.push(mix);
            mainResult.push(result[0]);
            result.shift();
            y--;

        }

        return mainResult;

    }


    function mixTextNumSymb(lib) {

        let result = [];
        let text = '';
        let index;
        let factor = 2;

        if (exercisesMode == exercisesModeAll.symb) {
            factor = 4;
        }

        for (let i = 0; i < lib.length; i++) {

            let arr = lib[i];

            for (let n = 0; n < (intensTraining * factor); n++) {
                index = getRandomIndex(0, arr.length + 1);
                if (!arr[index] && !text.endsWith(' ') && text != '') text += ' ';
                else if (!arr[index]) continue;
                else text += arr[index];
            }

            result.push(text);

            text = '';

        }

        let mix = result.join('').split('').sort(() => Math.random() - 0.5).join('');
        mix = mix.replace(/ +/g, ' ').trim();

        result.push(mix);

        return result;

    }

    // / // 



    /// /// / hideWindowScreenSize

    let sizeDefault = {};

    changeScreenSizeBtn.onclick = () => {
        if (hideWindowScreenSize.style.display == 'block') {
            hideWindowScreenSize.style.display = null;
        } else {
            hideWindowScreenSize.style.display = 'block';
            changeScreenSize();
        }
    };

    hideWindowScreenSizeBtCen.onclick = () => {
        hideWindowScreenSize.style.display = null;
        changeSSmain(sizeDefault.width, 'width');
        changeSSmain(sizeDefault.height, 'height');
    };

    hideWindowScreenSizeBtOk.onclick = () => {
        hideWindowScreenSize.style.display = null;
    };


    function changeScreenSize() {


        screenSizeSliderWidth.ondragstart = () => { return false };
        screenSizeSliderHeight.ondragstart = () => { return false };

        screenSizeSliderWidth.runner.addEventListener('pointerdown', listenerDownRunner);
        screenSizeSliderHeight.runner.addEventListener('pointerdown', listenerDownRunner);

        screenSizeSliderWidth.descr.innerHTML = screenDisplay.offsetWidth + 'px';
        screenSizeSliderHeight.descr.innerHTML = screenDisplay.offsetHeight + 'px';


        let sssHeightWidthDsc;
        let befAft = document.querySelectorAll('.hideWindowScreenSize__bef-aft');

        setMaxMinSize(befAft);

        let size = {
            width: {
                min: parseInt(befAft[0].innerHTML),
                max: parseInt(befAft[1].innerHTML),
                now: parseInt(screenSizeSliderWidth.descr.innerHTML),
            },
            height: {
                min: parseInt(befAft[2].innerHTML),
                max: parseInt(befAft[3].innerHTML),
                now: parseInt(screenSizeSliderHeight.descr.innerHTML),
            },
        };

        sizeDefault.width = size.width.now;
        sizeDefault.height = size.height.now;

        screenSizeSliderHeight.runner.style.left =
            ((size.height.now / (size.height.max / screenSizeSliderHeight.runner.parentNode.offsetWidth)) -
                screenSizeSliderHeight.runner.offsetWidth).toFixed() + 'px';


        screenSizeSliderWidth.runner.style.left =
            ((size.width.now / (size.width.max / screenSizeSliderWidth.runner.parentNode.offsetWidth)) -
                screenSizeSliderWidth.runner.offsetWidth).toFixed() + 'px';


        function listenerDownRunner(evDR) {

            evDR.preventDefault();

            if (evDR.target == screenSizeSliderWidth.runner) {
                sssHeightWidthDsc = screenSizeSliderWidth.descr;
                size.max = size.width.max;
                size.min = size.width.min;
                size.now = size.width.now;
            }
            else {
                sssHeightWidthDsc = screenSizeSliderHeight.descr;
                size.max = size.height.max;
                size.min = size.height.min;
                size.now = size.height.now;
            }

            window.onpointermove = listenerMoveRunner;
            window.onpointerup = listenerUpRunner;

            let bias = evDR.clientX;
            if (evDR.target.style.left) bias -= parseInt(evDR.target.style.left);

            function listenerMoveRunner(evMR) {

                if (evMR.clientX - bias < 0) {
                    evDR.target.style.left = null;
                    sssHeightWidthDsc.innerHTML = size.min + 'px';
                } else if (evMR.clientX - bias + evDR.target.offsetWidth > evDR.target.parentNode.offsetWidth) {
                    evDR.target.style.left = evDR.target.parentNode.offsetWidth - evDR.target.offsetWidth + 'px';
                    sssHeightWidthDsc.innerHTML = size.max + 'px';
                } else {
                    evDR.target.style.left = evMR.clientX - bias + 'px';

                    size.now = (size.min + ((evMR.clientX - bias) *
                        ((size.max - size.min) / (evDR.target.parentNode.offsetWidth - evDR.target.offsetWidth)))).toFixed();

                    sssHeightWidthDsc.innerHTML = size.now + 'px';

                    changeSSmain(size.now + 'px', evDR.target.dataset.mode);
                }

            }

            function listenerUpRunner() {
                window.onpointermove = null;
            }

        }

    }


    function changeSSmain(size, mode) {
        if (!isNaN(size)) size = size + 'px';
        screenDisplay.style[mode] = size;
    }

    function setMaxMinSize(befAft) {

        let styleCont = getComputedStyle(document.querySelector('.container'));

        let a = parseInt(styleCont.maxWidth), b = parseInt(styleCont.paddingRight);

        if (window.innerWidth - (parseInt(styleCont.paddingRight) * 2) < a - (b * 2)) {
            befAft[1].innerHTML = window.innerWidth - (parseInt(styleCont.paddingRight) * 2) + 'px';
        } else befAft[1].innerHTML = a - (b * 2) + 'px';

    }


    /// /// /




        // ///// / media

        if (window.innerWidth < 550) chengeFontSize(12);


        if (window.innerWidth < 500) {

            const btnPause = document.getElementById('buttonsSVGp');
            const btnStart = document.getElementById('buttonsSVGs');
            
            const btnChFSizePl = document.querySelectorAll('#buttonsSVGf button')[0];
            const btnChFSizeMi = document.querySelectorAll('#buttonsSVGf button')[1];
            const btnChScr = document.getElementById('buttonsSVGss');

            btnPause.onclick = () => {
                doPause();
            }

            btnStart.onclick = () => {
                start(exercisesMode);
            }

            if (exercisesMode == exercisesModeAll.forBeginers) {
                const btnLessons = document.getElementById('buttonsSVGl');
                btnLessons.onclick = buttonChooseLessonListener;
            }

            btnChFSizePl.onclick = () => chengeFontSize(+fInner.innerHTML + 1);
            btnChFSizeMi.onclick = () => chengeFontSize(+fInner.innerHTML - 1);

            btnChScr.onclick = () => {
                if (hideWindowScreenSize.style.display == 'block') {
                    hideWindowScreenSize.style.display = null;
                } else {
                    hideWindowScreenSize.style.display = 'block';
                    changeScreenSize();
                }
            };

        }


        // ///// /


}



