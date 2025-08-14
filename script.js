const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps');


let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;


function formatTime(time, digits) {
    return time.toString().padStart(digits, '0');
}


function updateDisplay() {
    const totalMilliseconds = elapsedTime;
    const minutes = Math.floor(totalMilliseconds / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    minutesElement.textContent = formatTime(minutes, 2);
    secondsElement.textContent = formatTime(seconds, 2);
    millisecondsElement.textContent = formatTime(milliseconds, 2);
}


function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false;
    }
}


function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}


function resetStopwatch() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = '';
    lapCount = 0;
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
}


function recordLap() {
    if (isRunning) {
        lapCount++;
        const minutes = minutesElement.textContent;
        const seconds = secondsElement.textContent;
        const milliseconds = millisecondsElement.textContent;
        
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span>Lap ${lapCount}</span>
            <span>${minutes}:${seconds}:${milliseconds}</span>
        `;
        
        
        lapsList.insertBefore(lapItem, lapsList.firstChild);
    }
}


startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);


resetStopwatch();