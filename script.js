document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ПОИСК ОСНОВНЫХ БЛОКОВ
    ===================================================== */

    const intro = document.querySelector(".intro");
    const memoriesSection = document.querySelector(".memories-section");
    const questionsSection = document.querySelector(".questions-section");
    const finalSection = document.querySelector(".final-section");

    const envelopeWrapper = document.querySelector(".envelope-wrapper");
    const continueButton = document.querySelector(".letter-button");
    const closeButton = document.querySelector(".secondary-button");


    /* =====================================================
       ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ СТРАНИЦ
    ===================================================== */

    function showSection(section) {

        if (intro) {
            intro.style.display = "none";
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

        if (section) {
            section.style.display = "flex";
            section.classList.add("show");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }


    /* =====================================================
       ОТКРЫТИЕ КОНВЕРТА
    ===================================================== */

    if (envelopeWrapper) {

        envelopeWrapper.addEventListener("click", (event) => {

            /* Если нажали на кнопку внутри письма —
               не закрываем письмо */
            if (
                event.target.closest(".letter-button") ||
                event.target.closest(".secondary-button")
            ) {
                return;
            }

            envelopeWrapper.classList.toggle("open");

        });

    }


    /* =====================================================
       КНОПКА "ПРОДОЛЖИТЬ"
    ===================================================== */

    if (continueButton) {

        continueButton.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            console.log("Продолжить нажата");

            /* Закрываем письмо визуально */
            if (envelopeWrapper) {
                envelopeWrapper.classList.remove("open");
            }

            /* Небольшая задержка для красивого перехода */
            setTimeout(() => {

                if (memoriesSection) {

                    showSection(memoriesSection);

                } else {

                    console.error(
                        "Не найден блок .memories-section"
                    );

                }

            }, 300);

        });

    }


    /* =====================================================
       КНОПКА "ЗАКРЫТЬ ПИСЬМО"
    ===================================================== */

    if (closeButton) {

        closeButton.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            if (envelopeWrapper) {
                envelopeWrapper.classList.remove("open");
            }

        });

    }


    /* =====================================================
       КНОПКИ НА СТРАНИЦЕ ФОТОГРАФИЙ
    ===================================================== */

    const nextToQuestions = document.querySelector(
        ".next-to-questions"
    );

    const backToLetter = document.querySelector(
        ".back-to-letter"
    );


    if (nextToQuestions) {

        nextToQuestions.addEventListener("click", (event) => {

            event.preventDefault();

            if (questionsSection) {
                showSection(questionsSection);
            }

        });

    }


    if (backToLetter) {

        backToLetter.addEventListener("click", (event) => {

            event.preventDefault();

            if (intro) {

                intro.style.display = "flex";

                if (memoriesSection) {
                    memoriesSection.style.display = "none";
                }

                if (questionsSection) {
                    questionsSection.style.display = "none";
                }

                if (finalSection) {
                    finalSection.style.display = "none";
                }

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        });

    }


    /* =====================================================
       ВОПРОСЫ
    ===================================================== */

    const questionSections = document.querySelectorAll(
        ".question-section"
    );

    const answerInputs = document.querySelectorAll(
        ".answerInput"
    );


    answerInputs.forEach((input) => {

        input.addEventListener("keydown", (event) => {

            if (event.key === "Enter" && !event.shiftKey) {

                event.preventDefault();

                const currentQuestion =
                    input.closest(".question-section");

                if (!currentQuestion) {
                    return;
                }

                const currentIndex =
                    Array.from(questionSections)
                        .indexOf(currentQuestion);

                const nextQuestion =
                    questionSections[currentIndex + 1];


                if (nextQuestion) {

                    currentQuestion.classList.remove("show");

                    setTimeout(() => {

                        currentQuestion.style.display = "none";

                        nextQuestion.style.display = "flex";
                        nextQuestion.classList.add("show");

                    }, 200);

                }

            }

        });

    });


    /* =====================================================
       КНОПКИ НАВИГАЦИИ ВОПРОСОВ
    ===================================================== */

    document.querySelectorAll(".question-next").forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            const currentQuestion =
                button.closest(".question-section");

            if (!currentQuestion) {
                return;
            }

            const currentIndex =
                Array.from(questionSections)
                    .indexOf(currentQuestion);

            const nextQuestion =
                questionSections[currentIndex + 1];


            if (nextQuestion) {

                currentQuestion.classList.remove("show");

                setTimeout(() => {

                    currentQuestion.style.display = "none";

                    nextQuestion.style.display = "flex";

                    setTimeout(() => {
                        nextQuestion.classList.add("show");
                    }, 30);

                }, 200);

            } else {

                if (finalSection) {

                    currentQuestion.style.display = "none";

                    showSection(finalSection);

                }

            }

        });

    });


    /* =====================================================
       КНОПКИ "НАЗАД" В ВОПРОСАХ
    ===================================================== */

    document.querySelectorAll(".question-back").forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            const currentQuestion =
                button.closest(".question-section");

            if (!currentQuestion) {
                return;
            }

            const currentIndex =
                Array.from(questionSections)
                    .indexOf(currentQuestion);

            const previousQuestion =
                questionSections[currentIndex - 1];


            if (previousQuestion) {

                currentQuestion.style.display = "none";

                previousQuestion.style.display = "flex";

                setTimeout(() => {
                    previousQuestion.classList.add("show");
                }, 30);

            } else {

                if (memoriesSection) {
                    showSection(memoriesSection);
                }

            }

        });

    });


    /* =====================================================
       КНОПКИ НА ФИНАЛЬНОЙ СТРАНИЦЕ
    ===================================================== */

    const finalToQuestions = document.querySelector(
        ".final-to-questions"
    );

    const finalToPhotos = document.querySelector(
        ".final-to-photos"
    );


    if (finalToQuestions) {

        finalToQuestions.addEventListener("click", (event) => {

            event.preventDefault();

            if (questionsSection) {

                showSection(questionsSection);

                questionSections.forEach((question, index) => {

                    question.classList.remove("show");

                    question.style.display =
                        index === 0 ? "flex" : "none";

                });

                setTimeout(() => {

                    if (questionSections[0]) {
                        questionSections[0]
                            .classList.add("show");
                    }

                }, 30);

            }

        });

    }


    if (finalToPhotos) {

        finalToPhotos.addEventListener("click", (event) => {

            event.preventDefault();

            if (memoriesSection) {
                showSection(memoriesSection);
            }

        });

    }


    /* =====================================================
       ОТКРЫТИЕ ФОТОГРАФИЙ
    ===================================================== */

    const photos = document.querySelectorAll(
        ".polaroid"
    );


    /* Создаём окно для увеличенной фотографии */

    const photoModal = document.createElement("div");

    photoModal.className = "photo-modal";

    photoModal.innerHTML = `
        <div class="photo-modal-content">

            <button
                class="photo-modal-close"
                type="button"
            >
                ×
            </button>

            <img
                class="photo-modal-image"
                src=""
                alt=""
            >

            <div class="photo-modal-caption"></div>

        </div>
    `;

    document.body.appendChild(photoModal);


    const modalImage =
        photoModal.querySelector(".photo-modal-image");

    const modalCaption =
        photoModal.querySelector(".photo-modal-caption");

    const modalClose =
        photoModal.querySelector(".photo-modal-close");


    photos.forEach((photo) => {

        photo.addEventListener("click", () => {

            const image =
                photo.querySelector("img");

            if (!image) {
                return;
            }

            modalImage.src = image.src;

            modalCaption.textContent =
                image.dataset.caption ||
                image.alt ||
                "Один из важных моментов ❤️";

            photoModal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    /* Закрытие крестиком */

    if (modalClose) {

        modalClose.addEventListener("click", () => {

            photoModal.classList.remove("active");

            document.body.style.overflow = "";

        });

    }


    /* Закрытие при клике на фон */

    photoModal.addEventListener("click", (event) => {

        if (event.target === photoModal) {

            photoModal.classList.remove("active");

            document.body.style.overflow = "";

        }

    });


    /* Закрытие клавишей ESC */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            photoModal.classList.remove("active");

            document.body.style.overflow = "";

        }

    });

});
