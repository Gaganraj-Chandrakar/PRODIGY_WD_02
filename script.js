let startTime, updatedTime, difference = 0, tInterval;
let running = false;
let lapCounter = 0;

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 10);
        running = true;
        document.getElementById('start').disabled = true;
        document.getElementById('pause').disabled = false;
        document.getElementById('reset').disabled = false;
        document.getElementById('lap').disabled = false;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        document.getElementById('start').disabled = false;
        document.getElementById('pause').disabled = true;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    document.getElementById('display').innerHTML = '00:00:00.000';
    document.getElementById('laps-list').innerHTML = '';
    lapCounter = 0;
    document.getElementById('start').disabled = false;
    document.getElementById('pause').disabled = true;
    document.getElementById('reset').disabled = true;
    document.getElementById('lap').disabled = true;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.innerText = `Lap ${lapCounter}: ${document.getElementById('display').innerHTML}`;
        document.getElementById('laps-list').appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    document.getElementById('display').innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}