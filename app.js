let inhaleTime, exhaleTime, retainInhaleTime, retainExhaleTime, rounds;
let currentRound = 0;
let interval;

const breathBall = document.getElementById('breath-ball');
const inhaleSound = document.getElementById('inhale-sound');
const retainInhaleSound = document.getElementById('retain-inhale-sound');
const exhaleSound = document.getElementById('exhale-sound');
const retainExhaleSound = document.getElementById('retain-exhale-sound');
const timerDisplay = document.getElementById('timer-display');

// Event listeners voor start en stop
document.getElementById('start-button').addEventListener('click', startBreathing);
document.getElementById('stop-button').addEventListener('click', stopBreathing);

function startBreathing() {
    // Haal waarden op uit de inputvelden
    inhaleTime = parseInt(document.getElementById('inhale').value);
    retainInhaleTime = parseInt(document.getElementById('retain-inhale').value);
    exhaleTime = parseInt(document.getElementById('exhale').value);
    retainExhaleTime = parseInt(document.getElementById('retain-exhale').value);
    rounds = parseInt(document.getElementById('rounds').value);

    currentRound = 0;
    runBreathingCycle();
}

function stopBreathing() {
    clearTimeout(interval);
    breathBall.style.animation = ''; // Stop de animatie
    breathBall.style.transform = 'scale(1)'; // Reset de balgrootte
    timerDisplay.textContent = "Round: 0";
}

function runBreathingCycle() {
    // Controleer of de huidige ronde minder is dan het totaal aantal rondes
    if (currentRound < rounds) {
        currentRound++;
        timerDisplay.textContent = `Round: ${currentRound}`;
        breatheIn();
    } else {
        stopBreathing();
    }
}

function breatheIn() {
    playSound(inhaleSound);
    breathBall.style.transitionDuration = `${inhaleTime}s`; // Stel de inhalatie duur in
    breathBall.style.transform = 'scale(1.4)'; // Groei naar 1.4
    interval = setTimeout(() => {
        retainAfterInhale();
    }, inhaleTime * 1000);
}

function retainAfterInhale() {
    playSound(retainInhaleSound);
    interval = setTimeout(() => {
        breatheOut();
    }, retainInhaleTime * 1000);
}

function breatheOut() {
    playSound(exhaleSound);
    breathBall.style.transitionDuration = `${exhaleTime}s`; // Stel de exhalatie duur in
    breathBall.style.transform = 'scale(1)'; // Krimp terug naar 1
    interval = setTimeout(() => {
        retainAfterExhale();
    }, exhaleTime * 1000);
}

function retainAfterExhale() {
    playSound(retainExhaleSound);
    interval = setTimeout(() => {
        runBreathingCycle(); // Ga naar de volgende cyclus
    }, retainExhaleTime * 1000);
}

function playSound(sound) {
    sound.volume = 1;
    sound.play().catch((error) => console.error("Sound Playback Error: ", error));
}
