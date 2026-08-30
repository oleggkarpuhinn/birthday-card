document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // ПОИСК ОСНОВНЫХ СЕКЦИЙ
    // =====================================

    const intro = document.querySelector("#intro, .intro");
    const envelopeSection = document.querySelector("#envelopeSection, .envelope-section");
    const memoriesSection = document.querySelector("#memoriesSection, .memories-section");
    const questionsSection = document.querySelector("#questionsSection, .questions-section");
    const finalSection = document.querySelector("#finalSection, .final-section");

    const envelopeWrapper = document.querySelector(".envelope-wrapper");
    const envelope = document.querySelector(".envelope");

    // Кнопки
    const openButton = document.querySelector(
        "#openEnvelope, .seal, .envelope-seal, [data-action='open-envelope']"
    );

    const continueButton = document.querySelector(
        "#continueLetter, .continue-letter, [data-action='continue-letter']"
    );

    const closeButton = document.querySelector(
        "#closeLetter, .close-letter, [data-action='close-letter']"
    );


    // =====================================
    // СКРЫТЬ ВСЕ СТРАНИЦЫ
    // =====================================

    function hideAll() {

        const sections = [
            intro,
            envelopeSection,
            memoriesSection,
            questionsSection,
            finalSection
        ];

        sections.forEach(function (section) {

            if (section) {
                section.style.display = "none";
            }

        });

    }


    // =====================================
    // ОТКРЫТЬ СТРАНИЦУ С КОНВЕРТОМ
    // =====================================

    function showEnvelope() {

        hideAll();

        if (envelopeSection) {
            envelopeSection.style.display = "flex";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // =====================================
    // ОТКРЫТЬ ФОТОГРАФИИ
    // =====================================

    function showMemories() {

        hideAll();

        if (memoriesSection) {
            memoriesSection.style.display = "block";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // =====================================
    // ОТКРЫТЬ ВОПРОСЫ
    // =====================================

    function showQuestions() {

        hideAll();

        if (questionsSection) {
            questionsSection.style.display = "flex";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // =====================================
    // ОТКРЫТЬ ФИНАЛ
    // =====================================

    function showFinal() {

        hideAll();

        if (finalSection) {
            finalSection.style.display = "flex";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // =====================================
    // ОТКРЫТИЕ КОНВЕРТА
    // =====================================

    function openLetter(event) {

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (envelopeWrapper) {

            envelopeWrapper.classList.add("open");

            return;

        }

        if (envelope) {

            envelope.classList.add("open");

        }

    }


    // Клик по печати
    if (openButton) {

        openButton.addEventListener("click", openLetter);

    }


    // Клик по самому конверту как запасной вариант
    if (envelopeWrapper) {

        envelopeWrapper.addEventListener("click", function (event) {

            // Если нажали на кнопку внутри письма —
            // конверт не закрываем
            if (
                event.target.closest(
                    "#continueLetter, .continue-letter, #closeLetter, .close-letter"
                )
            ) {
                return;
            }

            // Если письмо ещё закрыто — открываем
            if (!envelopeWrapper.classList.contains("open")) {

                envelopeWrapper.classList.add("open");

            }

        });

    }


    // =====================================
    // ПРОДОЛЖИТЬ → ФОТОГРАФИИ
    // =====================================

    if (continueButton) {

        continueButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            // Сразу переходим к фотографиям.
            // Не закрываем конверт отдельно,
            // чтобы он не успел заблокировать переход.

            showMemories();

        });

    }


    // =====================================
    // ЗАКРЫТЬ ПИСЬМО
    // =====================================

    if (closeButton) {

        closeButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (envelopeWrapper) {
                envelopeWrapper.classList.remove("open");
            }

            if (envelope) {
                envelope.classList.remove("open");
            }

        });

    }


    // =====================================
    // НАВИГАЦИЯ
    // =====================================

    const toQuestions = document.querySelector(
        "#toMemories, #toQuestions, .to-questions"
    );

    const backToLetter = document.querySelector(
        "#backToLetter, .back-to-letter"
    );

    const backToMemories = document.querySelector(
        "#backToMemories, .back-to-memories"
    );

    const nextQuestion = document.querySelector(
        "#nextQuestion, .next-question"
    );

    const backToQuestions = document.querySelector(
        "#backToQuestions, .back-to-questions"
    );

    const backToPhotos = document.querySelector(
        "#backToPhotos, .back-to-photos"
    );


    if (toQuestions) {

        toQuestions.addEventListener("click", function (event) {

            event.preventDefault();
            showQuestions();

        });

    }


    if (backToLetter) {

        backToLetter.addEventListener("click", function (event) {

            event.preventDefault();

            showEnvelope();

            setTimeout(function () {

                if (envelopeWrapper) {
                    envelopeWrapper.classList.add("open");
                }

            }, 100);

        });

    }


    if (backToMemories) {

        backToMemories.addEventListener("click", function (event) {

            event.preventDefault();
            showMemories();

        });

    }


    if (nextQuestion) {

        nextQuestion.addEventListener("click", function (event) {

            event.preventDefault();
            showFinal();

        });

    }


    if (backToQuestions) {

        backToQuestions.addEventListener("click", function (event) {

            event.preventDefault();
            showQuestions();

        });

    }


    if (backToPhotos) {

        backToPhotos.addEventListener("click", function (event) {

            event.preventDefault();
            showMemories();

        });

    }


    // =====================================
    // УВЕЛИЧЕНИЕ ФОТО
    // =====================================

    const photos = document.querySelectorAll(".polaroid");

    photos.forEach(function (photo) {

        photo.addEventListener("click", function () {

            const image = photo.querySelector("img");

            if (!image) return;

            const existingModal =
                document.querySelector(".photo-modal");

            if (existingModal) {
                existingModal.remove();
            }


            const modal = document.createElement("div");

            modal.className = "photo-modal";


            const caption =
                image.getAttribute("alt") ||
                "Один из наших моментов ❤️";


            modal.innerHTML = `
                <div class="photo-modal-content">

                    <button
                        class="photo-modal-close"
                        type="button"
                    >
                        ×
                    </button>

                    <img
                        src="${image.src}"
                        alt="${caption}"
                    >

                    <div class="photo-caption">
                        ${caption}
                    </div>

                </div>
            `;


            document.body.appendChild(modal);


            const modalContent =
                modal.querySelector(".photo-modal-content");

            const modalClose =
                modal.querySelector(".photo-modal-close");


            modalClose.addEventListener("click", function () {

                modal.remove();

            });


            modal.addEventListener("click", function (event) {

                if (event.target === modal) {

                    modal.remove();

                }

            });


            modalContent.addEventListener("click", function (event) {

                event.stopPropagation();

            });

        });

    });

});
