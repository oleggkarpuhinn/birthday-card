document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ИЩЕМ ВСЕ ОСНОВНЫЕ СТРАНИЦЫ
    // ==========================================

    const intro = document.querySelector(".intro");

    const envelopeSection =
        document.querySelector(".envelope-section") ||
        document.querySelector("#envelopeSection");

    const memoriesSection =
        document.querySelector(".memories-section") ||
        document.querySelector("#memoriesSection");

    const questionsSection =
        document.querySelector(".questions-section") ||
        document.querySelector("#questionsSection");

    const finalSection =
        document.querySelector(".final-section") ||
        document.querySelector("#finalSection");

    const envelopeWrapper =
        document.querySelector(".envelope-wrapper");


    // ==========================================
    // СКРЫТЬ ВСЕ СТРАНИЦЫ
    // ==========================================

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


    // ==========================================
    // ПОКАЗАТЬ ФОТОГРАФИИ
    // ==========================================

    function showMemories() {

        hideAllSections();

        if (memoriesSection) {

            memoriesSection.style.display = "block";

            memoriesSection.classList.add("show");

        } else {

            console.log("НЕ НАЙДЕНА СЕКЦИЯ ФОТОГРАФИЙ");

        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // ==========================================
    // ПОКАЗАТЬ ПИСЬМО
    // ==========================================

    function showLetter() {

        hideAllSections();

        if (envelopeSection) {
            envelopeSection.style.display = "flex";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // ==========================================
    // ПОКАЗАТЬ ВОПРОСЫ
    // ==========================================

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


    // ==========================================
    // ПОКАЗАТЬ ФИНАЛ
    // ==========================================

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


    // ==========================================
    // ОТКРЫТИЕ КОНВЕРТА
    // ==========================================

    document.addEventListener("click", function (event) {

        const target = event.target;

        if (
            target.closest(".seal") &&
            envelopeWrapper &&
            !envelopeWrapper.classList.contains("open")
        ) {

            event.preventDefault();
            event.stopPropagation();

            envelopeWrapper.classList.add("open");

        }

    });


    // ==========================================
    // ГЛАВНАЯ НАВИГАЦИЯ
    // ==========================================
    // Здесь специально используем делегирование.
    // Поэтому кнопка будет работать даже если
    // её ID отличается от старого.


    document.addEventListener("click", function (event) {

        const button = event.target.closest("button");

        if (!button) {
            return;
        }


        const buttonText =
            button.textContent
                .trim()
                .toLowerCase();


        // ======================================
        // ПРОДОЛЖИТЬ → ФОТОГРАФИИ
        // ======================================

        if (
            button.id === "continueLetter" ||
            button.classList.contains("continue-letter") ||
            buttonText.includes("продолжить")
        ) {

            event.preventDefault();
            event.stopPropagation();

            console.log("Переходим к фотографиям");

            showMemories();

            return;
        }


        // ======================================
        // ЗАКРЫТЬ ПИСЬМО
        // ======================================

        if (
            button.id === "closeLetter" ||
            button.classList.contains("close-letter") ||
            buttonText.includes("закрыть письмо")
        ) {

            event.preventDefault();
            event.stopPropagation();

            if (envelopeWrapper) {
                envelopeWrapper.classList.remove("open");
            }

            return;
        }


        // ======================================
        // ИЗ ФОТОГРАФИЙ К ВОПРОСАМ
        // ======================================

        if (
            button.id === "toQuestions" ||
            button.id === "toMemories" ||
            buttonText.includes("теперь твоя очередь") ||
            buttonText.includes("ещё воспоминания")
        ) {

            event.preventDefault();
            event.stopPropagation();

            showQuestions();

            return;
        }


        // ======================================
        // НАЗАД К ПИСЬМУ
        // ======================================

        if (
            button.id === "backToLetter" ||
            buttonText.includes("к письму")
        ) {

            event.preventDefault();
            event.stopPropagation();

            showLetter();

            return;
        }


        // ======================================
        // НАЗАД К ФОТОГРАФИЯМ
        // ======================================

        if (
            button.id === "backToMemories" ||
            button.id === "backToPhotos" ||
            buttonText.includes("к фотографиям") ||
            buttonText.includes("предыдущие фотографии")
        ) {

            event.preventDefault();
            event.stopPropagation();

            showMemories();

            return;
        }


        // ======================================
        // СЛЕДУЮЩИЙ ВОПРОС
        // ======================================

        if (
            button.id === "nextQuestion" ||
            buttonText.includes("следующий")
        ) {

            event.preventDefault();
            event.stopPropagation();

            showFinal();

            return;
        }


        // ======================================
        // НАЗАД К ВОПРОСАМ
        // ======================================

        if (
            button.id === "backToQuestions" ||
            buttonText.includes("к вопросам")
        ) {

            event.preventDefault();
            event.stopPropagation();

            showQuestions();

            return;
        }

    });


    // ==========================================
    // УВЕЛИЧЕНИЕ ФОТОГРАФИЙ
    // ==========================================

    document.addEventListener("click", function (event) {

        const photo =
            event.target.closest(".polaroid");

        if (!photo) {
            return;
        }


        // Если нажали на кнопку внутри блока —
        // не открываем фото

        if (event.target.closest("button")) {
            return;
        }


        const image =
            photo.querySelector("img");

        if (!image) {
            return;
        }


        // Удаляем старое окно,
        // если оно вдруг осталось

        const oldModal =
            document.querySelector(".photo-modal");

        if (oldModal) {
            oldModal.remove();
        }


        const modal =
            document.createElement("div");

        modal.className = "photo-modal";


        const caption =
            image.getAttribute("alt") ||
            "Наш момент ❤️";


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


        modal.style.display = "flex";


        const closeButton =
            modal.querySelector(".photo-modal-close");


        closeButton.addEventListener(
            "click",
            function () {

                modal.remove();

            }
        );


        modal.addEventListener(
            "click",
            function (e) {

                if (e.target === modal) {
                    modal.remove();
                }

            }
        );

    });

});
