document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // ВСЕ СТРАНИЦЫ
    // ==============================

    const intro = document.getElementById("intro");
    const envelopeSection = document.getElementById("envelopeSection");
    const memoriesSection = document.getElementById("memoriesSection");
    const questionsSection = document.getElementById("questionsSection");
    const finalSection = document.getElementById("finalSection");


    // ==============================
    // ПОЛУЧАЕМ ВСЕ КНОПКИ
    // ==============================

    const openEnvelope = document.getElementById("openEnvelope");

    const continueLetter = document.getElementById("continueLetter");
    const closeLetter = document.getElementById("closeLetter");

    const toMemories = document.getElementById("toMemories");
    const backToLetter = document.getElementById("backToLetter");

    const nextQuestion = document.getElementById("nextQuestion");
    const backToMemories = document.getElementById("backToMemories");

    const backToQuestions = document.getElementById("backToQuestions");
    const backToPhotos = document.getElementById("backToPhotos");


    // ==============================
    // КОНВЕРТ И ПИСЬМО
    // ==============================

    const envelopeWrapper = document.querySelector(".envelope-wrapper");


    // ==============================
    // ФУНКЦИЯ СКРЫТИЯ ВСЕХ СТРАНИЦ
    // ==============================

    function hideAllSections() {

        if (intro) {
            intro.style.display = "none";
        }

        if (envelopeSection) {
            envelopeSection.style.display = "none";
        }

        if (memoriesSection) {
            memoriesSection.style.display = "none";
        }

        if (questionsSection) {
            questionsSection.style.display = "none";
        }

        if (finalSection) {
            finalSection.style.display = "none";
        }
    }


    // ==============================
    // ПОКАЗАТЬ КОНВЕРТ
    // ==============================

    function showEnvelope() {

        hideAllSections();

        if (envelopeSection) {
            envelopeSection.style.display = "flex";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ==============================
    // ПОКАЗАТЬ ФОТОГРАФИИ
    // ==============================

    function showMemories() {

        hideAllSections();

        if (memoriesSection) {
            memoriesSection.style.display = "block";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ==============================
    // ПОКАЗАТЬ ВОПРОСЫ
    // ==============================

    function showQuestions() {

        hideAllSections();

        if (questionsSection) {
            questionsSection.style.display = "flex";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ==============================
    // ПОКАЗАТЬ ФИНАЛ
    // ==============================

    function showFinal() {

        hideAllSections();

        if (finalSection) {
            finalSection.style.display = "flex";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ==============================
    // ОТКРЫТЬ ПИСЬМО
    // ==============================

    if (openEnvelope && envelopeWrapper) {

        openEnvelope.addEventListener("click", () => {

            envelopeWrapper.classList.add("open");

        });

    }


    // ==============================
    // КНОПКА "ПРОДОЛЖИТЬ"
    // ==============================

    if (continueLetter) {

        continueLetter.addEventListener("click", (event) => {

            // ВАЖНО: не даём событию
            // случайно закрыть письмо
            event.stopPropagation();

            // Сначала закрываем письмо визуально
            if (envelopeWrapper) {
                envelopeWrapper.classList.remove("open");
            }

            // Потом ждём анимацию
            setTimeout(() => {

                // И ТОЛЬКО ПОТОМ
                // переходим к фотографиям
                showMemories();

            }, 400);

        });

    }


    // ==============================
    // КНОПКА "ЗАКРЫТЬ ПИСЬМО"
    // ==============================

    if (closeLetter && envelopeWrapper) {

        closeLetter.addEventListener("click", (event) => {

            event.stopPropagation();

            envelopeWrapper.classList.remove("open");

        });

    }


    // ==============================
    // ИЗ ФОТОГРАФИЙ К ВОПРОСАМ
    // ==============================

    if (toMemories) {

        toMemories.addEventListener("click", () => {

            showQuestions();

        });

    }


    // ==============================
    // НАЗАД К ПИСЬМУ
    // ==============================

    if (backToLetter) {

        backToLetter.addEventListener("click", () => {

            showEnvelope();

            setTimeout(() => {

                if (envelopeWrapper) {
                    envelopeWrapper.classList.add("open");
                }

            }, 100);

        });

    }


    // ==============================
    // СЛЕДУЮЩИЙ ВОПРОС
    // ==============================

    if (nextQuestion) {

        nextQuestion.addEventListener("click", () => {

            showFinal();

        });

    }


    // ==============================
    // ИЗ ВОПРОСОВ К ФОТО
    // ==============================

    if (backToMemories) {

        backToMemories.addEventListener("click", () => {

            showMemories();

        });

    }


    // ==============================
    // ИЗ ФИНАЛА К ВОПРОСАМ
    // ==============================

    if (backToQuestions) {

        backToQuestions.addEventListener("click", () => {

            showQuestions();

        });

    }


    // ==============================
    // ИЗ ФИНАЛА К ФОТО
    // ==============================

    if (backToPhotos) {

        backToPhotos.addEventListener("click", () => {

            showMemories();

        });

    }


    // ==============================
    // УВЕЛИЧЕНИЕ ФОТО
    // ==============================

    const photos = document.querySelectorAll(".polaroid");

    photos.forEach((photo) => {

        photo.addEventListener("click", () => {

            const image = photo.querySelector("img");

            if (!image) {
                return;
            }

            const modal = document.createElement("div");

            modal.className = "photo-modal";

            modal.innerHTML = `
                <div class="photo-modal-content">

                    <button class="photo-modal-close">
                        ×
                    </button>

                    <img src="${image.src}" alt="Фотография">

                    <div class="photo-caption">
                        ${image.alt || "Наш момент ❤️"}
                    </div>

                </div>
            `;

            document.body.appendChild(modal);

            // Закрытие крестиком
            const closeButton =
                modal.querySelector(".photo-modal-close");

            closeButton.addEventListener("click", () => {

                modal.remove();

            });


            // Закрытие при клике на фон
            modal.addEventListener("click", (event) => {

                if (event.target === modal) {
                    modal.remove();
                }

            });

        });

    });

});
