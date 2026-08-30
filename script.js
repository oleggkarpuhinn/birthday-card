document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       НАСТРОЙКИ
    ========================================================= */

    const OWNER = "olegkarpuhinn";
    const REPO = "birthday-card";
    const BRANCH = "main";

    const PHOTOS_API =
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/photos/photos?ref=${BRANCH}`;

    const PHOTOS_PER_PAGE = 7;


    /* =========================================================
       ПОЛУЧАЕМ ЭЛЕМЕНТЫ СТРАНИЦ
    ========================================================= */

    const intro = document.querySelector(".intro");
    const memoriesSection = document.querySelector(".memories");
    const questionSection = document.querySelector(".question-section");
    const finalSection = document.querySelector(".final-section");

    const envelopeWrapper = document.querySelector(".envelope-wrapper");
    const envelope = document.querySelector(".envelope");

    const gallery = document.querySelector(".polaroid-gallery");

    const letterNextButton =
        document.querySelector(".letter-next") ||
        document.querySelector("[data-action='to-memories']");

    const previousPhotosButton =
        document.querySelector("[data-action='previous-photos']") ||
        document.querySelector(".previous-photos");

    const nextPhotosButton =
        document.querySelector("[data-action='next-photos']") ||
        document.querySelector(".next-photos");

    const backToLetterButton =
        document.querySelector("[data-action='back-to-letter']") ||
        document.querySelector(".back-to-letter");

    const finalBackToQuestions =
        document.querySelector("[data-action='back-to-questions']");

    const finalBackToPhotos =
        document.querySelector("[data-action='back-to-photos']");


    /* =========================================================
       СОСТОЯНИЕ ФОТОГРАФИЙ
    ========================================================= */

    let photos = [];
    let currentPage = 0;


    /* =========================================================
       ФУНКЦИЯ СКРЫТИЯ ВСЕХ СТРАНИЦ
    ========================================================= */

    function hideAllSections() {

        if (intro) {
            intro.style.display = "none";
        }

        if (memoriesSection) {
            memoriesSection.style.display = "none";
        }

        if (questionSection) {
            questionSection.style.display = "none";
        }

        if (finalSection) {
            finalSection.style.display = "none";
        }

    }


    /* =========================================================
       ПЕРЕХОД К ПИСЬМУ
    ========================================================= */

    function showLetter() {

        hideAllSections();

        if (intro) {
            intro.style.display = "flex";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =========================================================
       ПЕРЕХОД К ФОТОГРАФИЯМ
    ========================================================= */

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


    /* =========================================================
       ПЕРЕХОД К ВОПРОСАМ
    ========================================================= */

    function showQuestions() {

        hideAllSections();

        if (questionSection) {
            questionSection.style.display = "flex";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =========================================================
       ФИНАЛЬНАЯ СТРАНИЦА
    ========================================================= */

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


    /* =========================================================
       КОНВЕРТ
    ========================================================= */

    if (envelopeWrapper) {

        envelopeWrapper.addEventListener("click", () => {

            envelopeWrapper.classList.toggle("open");

        });

    }


    /* =========================================================
       ПЕРЕХОД ИЗ ПИСЬМА К ФОТО
    ========================================================= */

    if (letterNextButton) {

        letterNextButton.addEventListener("click", () => {

            showMemories();

            loadPhotos();

        });

    }


    /* =========================================================
       ЗАГРУЗКА ФОТО С GITHUB
    ========================================================= */

    async function loadPhotos() {

        if (photos.length > 0) {

            renderPhotos();

            return;

        }

        if (gallery) {

            gallery.innerHTML = `
                <div class="loading-photos">
                    Загружаю воспоминания...
                </div>
            `;

        }

        try {

            const response = await fetch(PHOTOS_API);

            if (!response.ok) {

                throw new Error("Не удалось получить фотографии");

            }

            const files = await response.json();


            photos = files
                .filter(file => {

                    const name = file.name.toLowerCase();

                    return (
                        file.type === "file" &&
                        (
                            name.endsWith(".jpg") ||
                            name.endsWith(".jpeg") ||
                            name.endsWith(".png") ||
                            name.endsWith(".webp")
                        )
                    );

                })
                .sort((a, b) => a.name.localeCompare(
                    b.name,
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                ));


            if (photos.length === 0) {

                throw new Error("Фотографии не найдены");

            }


            renderPhotos();

        } catch (error) {

            console.error(error);

            if (gallery) {

                gallery.innerHTML = `
                    <div class="photos-error">
                        Не удалось загрузить фотографии.
                    </div>
                `;

            }

        }

    }


    /* =========================================================
       ОТОБРАЖЕНИЕ ТЕКУЩЕЙ СТРАНИЦЫ ФОТО
    ========================================================= */

    function renderPhotos() {

        if (!gallery) return;


        gallery.innerHTML = "";


        const start = currentPage * PHOTOS_PER_PAGE;

        const end = start + PHOTOS_PER_PAGE;

        const currentPhotos = photos.slice(start, end);


        currentPhotos.forEach((photo, index) => {

            const photoNumber = start + index + 1;


            const polaroid = document.createElement("div");

            polaroid.className = "polaroid";


            const image = document.createElement("img");

            image.className = "polaroid-image";

            image.src = photo.download_url;

            image.alt = `Воспоминание ${photoNumber}`;

            image.loading = "lazy";


            const caption = document.createElement("div");

            caption.className = "polaroid-caption";

            caption.textContent = `Воспоминание ${photoNumber} ❤️`;


            polaroid.appendChild(image);

            polaroid.appendChild(caption);


            polaroid.addEventListener("click", () => {

                openPhotoModal(
                    photo.download_url,
                    photoNumber
                );

            });


            gallery.appendChild(polaroid);

        });


        updatePhotoNavigation();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =========================================================
       КНОПКИ ПЕРЕКЛЮЧЕНИЯ ФОТО
    ========================================================= */

    function updatePhotoNavigation() {

        if (previousPhotosButton) {

            previousPhotosButton.style.display =
                currentPage > 0
                    ? "inline-flex"
                    : "none";

        }


        if (nextPhotosButton) {

            const totalPages =
                Math.ceil(
                    photos.length / PHOTOS_PER_PAGE
                );


            nextPhotosButton.textContent =
                currentPage < totalPages - 1
                    ? "Ещё воспоминания →"
                    : "А теперь твоя очередь →";

        }

    }


    /* =========================================================
       ПРЕДЫДУЩИЕ ФОТО
    ========================================================= */

    if (previousPhotosButton) {

        previousPhotosButton.addEventListener("click", () => {

            if (currentPage > 0) {

                currentPage--;

                renderPhotos();

            }

        });

    }


    /* =========================================================
       СЛЕДУЮЩИЕ ФОТО ИЛИ ВОПРОСЫ
    ========================================================= */

    if (nextPhotosButton) {

        nextPhotosButton.addEventListener("click", () => {

            const totalPages =
                Math.ceil(
                    photos.length / PHOTOS_PER_PAGE
                );


            if (currentPage < totalPages - 1) {

                currentPage++;

                renderPhotos();

            } else {

                showQuestions();

            }

        });

    }


    /* =========================================================
       НАЗАД К ПИСЬМУ
    ========================================================= */

    if (backToLetterButton) {

        backToLetterButton.addEventListener("click", () => {

            showLetter();

        });

    }


    /* =========================================================
       МОДАЛЬНОЕ ОКНО ФОТО
    ========================================================= */

    function openPhotoModal(imageUrl, photoNumber) {

        const oldModal =
            document.querySelector(".photo-modal");


        if (oldModal) {

            oldModal.remove();

        }


        const modal =
            document.createElement("div");


        modal.className =
            "photo-modal";


        modal.innerHTML = `

            <div class="photo-modal-content">

                <button
                    class="photo-modal-close"
                    aria-label="Закрыть"
                >
                    ×
                </button>


                <img
                    src="${imageUrl}"
                    alt="Воспоминание ${photoNumber}"
                >


                <div class="photo-modal-caption">

                    Воспоминание ${photoNumber} ❤️

                </div>

            </div>

        `;


        document.body.appendChild(modal);


        document.body.style.overflow = "hidden";


        const closeButton =
            modal.querySelector(
                ".photo-modal-close"
            );


        closeButton.addEventListener("click", () => {

            closePhotoModal(modal);

        });


        modal.addEventListener("click", event => {

            if (event.target === modal) {

                closePhotoModal(modal);

            }

        });


        document.addEventListener(
            "keydown",
            function escapeHandler(event) {

                if (event.key === "Escape") {

                    closePhotoModal(modal);

                    document.removeEventListener(
                        "keydown",
                        escapeHandler
                    );

                }

            }
        );

    }


    function closePhotoModal(modal) {

        modal.classList.add("closing");


        setTimeout(() => {

            modal.remove();

            document.body.style.overflow = "";

        }, 200);

    }


    /* =========================================================
       ФИНАЛЬНЫЕ КНОПКИ
    ========================================================= */

    if (finalBackToQuestions) {

        finalBackToQuestions.addEventListener(
            "click",
            () => {

                showQuestions();

            }
        );

    }


    if (finalBackToPhotos) {

        finalBackToPhotos.addEventListener(
            "click",
            () => {

                showMemories();

                renderPhotos();

            }
        );

    }


});
