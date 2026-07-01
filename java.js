document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       CUSTOM POPUP FUNCTION
    ================================= */

    let customPopup = document.getElementById("customPopup");

    // Kalau popup belum ada dalam HTML, JavaScript akan create sendiri
    if (!customPopup) {
        customPopup = document.createElement("div");
        customPopup.id = "customPopup";
        customPopup.className = "custom-popup";

        customPopup.innerHTML = `
            <div class="popup-box">
                <div id="popupIcon" class="popup-icon">✅</div>
                <h2 id="popupTitle">Tahniah!</h2>
                <p id="popupMessage">Jawapan anda betul.</p>
                <button id="closePopup">OK</button>
            </div>
        `;

        document.body.appendChild(customPopup);
    }

    const popupIcon = document.getElementById("popupIcon");
    const popupTitle = document.getElementById("popupTitle");
    const popupMessage = document.getElementById("popupMessage");
    const closePopup = document.getElementById("closePopup");

    function showPopup(type, icon, title, message) {
        customPopup.classList.remove("correct", "wrong", "feedback-success");
        customPopup.classList.add("show", type);

        popupIcon.textContent = icon;
        popupTitle.textContent = title;
        popupMessage.textContent = message;
    }

    function hidePopup() {
        customPopup.classList.remove("show", "correct", "wrong", "feedback-success");
    }

    if (closePopup) {
        closePopup.addEventListener("click", hidePopup);
    }

    // Klik luar kotak popup pun boleh tutup
    customPopup.addEventListener("click", function (event) {
        if (event.target === customPopup) {
            hidePopup();
        }
    });


/* ===============================
   LEARNING PAGE - NEXT SLIDE
================================= */

const simpulanPrevBtn = document.getElementById("simpulanPrevBtn");
const simpulanNextBtn = document.getElementById("simpulanNextBtn");
const simpulanIndicator = document.getElementById("simpulanIndicator");

const simpulanSlides = [
    document.getElementById("simpulanSlide1"),
    document.getElementById("simpulanSlide2")
];

let simpulanCurrentSlide = 0;


const peribahasaPrevBtn = document.getElementById("peribahasaPrevBtn");
const peribahasaNextBtn = document.getElementById("peribahasaNextBtn");
const peribahasaIndicator = document.getElementById("peribahasaIndicator");

const peribahasaSlides = [
    document.getElementById("peribahasaSlide1"),
    document.getElementById("peribahasaSlide2")
];

let peribahasaCurrentSlide = 0;


// Function untuk paparkan slide yang dipilih
function showLearningSlide(slides, currentIndex, indicator) {

    slides.forEach(function (slide, index) {

        if (!slide) {
            return;
        }

        if (index === currentIndex) {
            slide.classList.add("active-slide");
            slide.classList.remove("hidden-slide");
        } else {
            slide.classList.remove("active-slide");
            slide.classList.add("hidden-slide");
        }

    });

    if (indicator) {
        indicator.textContent = `${currentIndex + 1} / ${slides.length}`;
    }
}


// Button untuk Simpulan Bahasa
if (simpulanPrevBtn && simpulanNextBtn) {

    simpulanPrevBtn.addEventListener("click", function () {
        simpulanCurrentSlide--;

        if (simpulanCurrentSlide < 0) {
            simpulanCurrentSlide = simpulanSlides.length - 1;
        }

        showLearningSlide(simpulanSlides, simpulanCurrentSlide, simpulanIndicator);
    });

    simpulanNextBtn.addEventListener("click", function () {
        simpulanCurrentSlide++;

        if (simpulanCurrentSlide >= simpulanSlides.length) {
            simpulanCurrentSlide = 0;
        }

        showLearningSlide(simpulanSlides, simpulanCurrentSlide, simpulanIndicator);
    });

}


// Button untuk Peribahasa
if (peribahasaPrevBtn && peribahasaNextBtn) {

    peribahasaPrevBtn.addEventListener("click", function () {
        peribahasaCurrentSlide--;

        if (peribahasaCurrentSlide < 0) {
            peribahasaCurrentSlide = peribahasaSlides.length - 1;
        }

        showLearningSlide(peribahasaSlides, peribahasaCurrentSlide, peribahasaIndicator);
    });

    peribahasaNextBtn.addEventListener("click", function () {
        peribahasaCurrentSlide++;

        if (peribahasaCurrentSlide >= peribahasaSlides.length) {
            peribahasaCurrentSlide = 0;
        }

        showLearningSlide(peribahasaSlides, peribahasaCurrentSlide, peribahasaIndicator);
    });

}


// Pastikan slide pertama keluar bila page dibuka
showLearningSlide(simpulanSlides, simpulanCurrentSlide, simpulanIndicator);
showLearningSlide(peribahasaSlides, peribahasaCurrentSlide, peribahasaIndicator);

    /* ===============================
       PRACTICE / QUIZ PAGE
    ================================= */

    const optionButtons = document.querySelectorAll(".option-btn");
    const quizCards = document.querySelectorAll(".quiz-card");
    const scoreText = document.getElementById("scoreText");
    const resetButton = document.getElementById("resetQuiz");

    let score = 0;
    let completed = 0;
    const totalQuestions = quizCards.length;

    function updateScore() {
        if (scoreText) {
            scoreText.textContent = `Skor: ${score}/${totalQuestions} | Selesai: ${completed}/${totalQuestions}`;
        }
    }

    optionButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const card = button.closest(".quiz-card");
            const feedback = card.querySelector(".feedback");
            const allButtons = card.querySelectorAll(".option-btn");

            // Kalau soalan dah dijawab betul, user tak boleh jawab lagi
            if (card.dataset.answered === "true") {
                return;
            }

            // Jika jawapan betul
            if (button.dataset.correct === "true") {

                showPopup(
                    "correct",
                    "✅",
                    "Tahniah!",
                    "Jawapan anda betul."
                );

                button.classList.add("correct");

                feedback.textContent = "✅ Tahniah! Jawapan anda betul.";
                feedback.classList.remove("wrong-text");
                feedback.classList.add("correct-text");

                card.dataset.answered = "true";

                score++;
                completed++;

                // Kunci semua pilihan jawapan untuk soalan ini
                allButtons.forEach(function (btn) {
                    btn.disabled = true;
                });

                updateScore();
            }

            // Jika jawapan salah
            else {

                showPopup(
                    "wrong",
                    "❌",
                    "Salah!",
                    "Sila cuba lagi :("
                );

                button.classList.add("wrong");
                button.disabled = true;

                feedback.textContent = "❌ Salah. Sila cuba lagi :(";
                feedback.classList.remove("correct-text");
                feedback.classList.add("wrong-text");
            }
        });
    });

    // Button jawab semula
    if (resetButton) {
        resetButton.addEventListener("click", function () {

            score = 0;
            completed = 0;

            quizCards.forEach(function (card) {
                card.dataset.answered = "false";

                const feedback = card.querySelector(".feedback");
                feedback.textContent = "";
                feedback.className = "feedback";
            });

            optionButtons.forEach(function (button) {
                button.disabled = false;
                button.classList.remove("correct", "wrong");
            });

            hidePopup();
            updateScore();
        });
    }

    updateScore();


    /* ===============================
       FEEDBACK PAGE
    ================================= */

    const feedbackForm = document.getElementById("feedbackForm");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", function (event) {
            event.preventDefault();

            showPopup(
                "feedback-success",
                "💙",
                "Terima kasih!!",
                "Maklum balas anda telah dihantar."
            );

            feedbackForm.reset();
        });
    }

});