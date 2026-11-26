
// ===================================
// SISTER'S BIRTHDAY WEBSITE
// ===================================

// PAGE NAVIGATION

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const nextScreen = document.getElementById(id);

    if (nextScreen) {
        nextScreen.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


// ===================================
// MUSIC
// ===================================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

function toggleMusic() {
    if (music.paused) {
        music.play().then(() => {
            musicBtn.textContent = "♫ Pause Music";
        }).catch(() => {
            musicBtn.textContent = "♫ Play Music";
        });
    } else {
        music.pause();
        musicBtn.textContent = "♫ Play Music";
    }
}


// ===================================
// GAME 1 - CATCH 5 HEARTS
// ===================================

let heartScore = 0;

function startGame(number) {
    showScreen("game" + number);

    if (number === 1) {
        heartScore = 0;
        document.getElementById("heartScore").textContent = "0 / 5";
    }

    if (number === 2) {
        createMemoryGame();
    }
}

function catchHeart() {
    heartScore++;

    document.getElementById("heartScore").textContent =
        heartScore + " / 5";

    if (heartScore >= 5) {
        celebrate();

        setTimeout(() => {
            showScreen("photo1");
        }, 1000);
    }
}


// ===================================
// GAME 2 - MEMORY MATCH
// ===================================

const emojis = [
    "❤️", "❤️",
    "🌸", "🌸",
    "🎂", "🎂",
    "⭐", "⭐"
];

let firstCard = null;
let secondCard = null;
let matchedPairs = 0;
let lockBoard = false;

function createMemoryGame() {
    const game = document.getElementById("memoryGame");

    game.innerHTML = "";

    firstCard = null;
    secondCard = null;
    matchedPairs = 0;
    lockBoard = false;

    document.getElementById("memoryStatus").textContent =
        "Find all matching pairs!";

    const shuffled = [...emojis].sort(() => Math.random() - 0.5);

    shuffled.forEach(emoji => {
        const card = document.createElement("button");

        card.className = "memory-card";
        card.textContent = "❔";
        card.dataset.emoji = emoji;

        card.addEventListener("click", () => flipCard(card));

        game.appendChild(card);
    });
}

function flipCard(card) {
    if (
        lockBoard ||
        card.classList.contains("matched") ||
        card === firstCard
    ) {
        return;
    }

    card.textContent = card.dataset.emoji;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;

        firstCard = null;
        secondCard = null;
        lockBoard = false;

        document.getElementById("memoryStatus").textContent =
            matchedPairs + " / 4 pairs found!";

        if (matchedPairs === 4) {
            celebrate();

            setTimeout(() => {
                showScreen("photo2");
            }, 1200);
        }

    } else {
        setTimeout(() => {
            firstCard.textContent = "❔";
            secondCard.textContent = "❔";

            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 800);
    }
}


// ===================================
// GAME 3 - FIND THE CAKE
// ===================================

let cakeFinished = false;

function checkCake(correct) {
    if (cakeFinished) return;

    const status = document.getElementById("cakeStatus");

    if (correct) {
        cakeFinished = true;

        status.textContent = "You found the cake! 🎂";

        celebrate();

        setTimeout(() => {
            showScreen("photo3");
        }, 1200);

    } else {
        status.textContent = "Not this one! Try again 💗";
    }
}


// ===================================
// GAME 4 - SISTER QUIZ
// ===================================

let quizFinished = false;

function finishQuiz() {
    if (quizFinished) return;

    quizFinished = true;

    document.getElementById("quizStatus").textContent =
        "Correct! Love makes our family special! ❤️";

    celebrate();

    setTimeout(() => {
        showScreen("photo4");
    }, 1200);
}

function wrongQuiz() {
    if (quizFinished) return;

    document.getElementById("quizStatus").textContent =
        "Try again! Think about what matters most 💗";
}


// ===================================
// FINAL WISH
// ===================================

function showWish() {
    showScreen("finalWish");
    celebrate();
}


// ===================================
// CELEBRATION EFFECT
// ===================================

function celebrate() {
    const decorations = ["❤️", "💕", "🌸", "✨", "💗", "🎉"];

    for (let i = 0; i < 25; i++) {
        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.textContent =
            decorations[Math.floor(Math.random() * decorations.length)];

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}


// ===================================
// PLAY AGAIN
// ===================================

function resetWebsite() {
    heartScore = 0;
    cakeFinished = false;
    quizFinished = false;

    createMemoryGame();

    showScreen("welcome");

    document.getElementById("heartScore").textContent = "0 / 5";
    document.getElementById("cakeStatus").textContent =
        "Choose the correct emoji!";
    document.getElementById("quizStatus").textContent = "";
}
