document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       НАСТРОЙКИ
    ===================================================== */

    const OWNER = "olegkarpuhinn";
    const REPO = "birthday-card";
    const BRANCH = "main";

    const PHOTOS_API =
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/photos/photos?ref=${BRANCH}`;

    const PHOTOS_PER_PAGE = 7;


    /* =====================================================
       ПОЛУЧАЕМ ВСЕ СТРАНИЦЫ
    ===================================================== */

    const intro = document.querySelector(".intro");

    const memoriesSection =
        document.querySelector(".memories-section");

    const questionSection =
        document.querySelector(".question-section");

    const finalSection =
        document.querySelector(".final-section");


    /* =====================================================
       ЭЛЕМЕНТЫ ПИСЬМА
    ===================================================== */

    const envelopeWrapper =
        document.querySelector(".envelope-wrapper");

    const continueButton =
        document.querySelector(".letter-next");

    const closeLetterButton =
        document.querySelector(".letter-close") ||
        document.querySelector(".close-letter");


    /* =====================================================
       ГАЛЕРЕЯ
    ===================================================== */

    const gallery =
        document.querySelector(".polaroid-gallery");

    const previousPhotosButton =
        document.querySelector(".previous-photos");

    const nextPhotosButton =
        document.querySelector(".next-photos");

    const backToLetterButton =
        document.querySelector(".back-to-letter");


    /* =====================================================
       СОСТОЯНИЕ
    ===================================================== */

    let photos = [];
    let currentPage = 0;


    /* =====================================================
       СКРЫТЬ ВСЕ СТРАНИЦЫ
    ===================================================== */

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


    /* =====================================================
       ПОКАЗАТЬ ПИСЬМО
    ===================================================== */

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


    /* =====================================================
       ПОКАЗАТЬ ФОТОГРАФИИ
    ===================================================== */

    function showMemories() {

        hideAllSections();

        if (memoriesSection) {
            memoriesSection.style.display = "block";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        loadPhotos();

    }


    /* =====================================================
       ПОКАЗАТЬ ВОПРОСЫ
    ===================================================== */

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


    /* =====================================================
       ПОКАЗАТЬ ФИНАЛ
    ===================================================== */

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


    /* =====================================================
       КОНВЕРТ — ОТКРЫТИЕ
    ===================================================== */

    if (envelopeWrapper) {

        envelopeWrapper.addEventListener("click", (event) => {

            /*
             Проверяем, что пользователь нажал именно
             на конверт, а не на кнопку.
            */

            if (
                event.target.closest("button") ||
                event.target.closest(".letter-paper")
            ) {
                return;
            }

            envelopeWrapper.classList.add("open");

        });

    }


    /* =====================================================
       КНОПКА «ПРОДОЛЖИТЬ»
    ===================================================== */

    if (continueButton) {

        continueButton.addEventListener("click", (event) => {

            /*
             ОЧЕНЬ ВАЖНО:
             останавливаем клик, чтобы он не передавался
             конверту и не закрывал письмо
            */

            event.preventDefault();

            event.stopPropagation();


            /*
             Сначала показываем фотографии
            */

            showMemories();

        });

    }


    /* =====================================================
       КНОПКА «ЗАКРЫТЬ ПИСЬМО»
    ===================================================== */

    if (closeLetterButton) {

        closeLetterButton.addEventListener("click", (event) => {

            event.preventDefault();

            event.stopPropagation();

            if (envelopeWrapper) {

                envelopeWrapper.classList.remove("open");

            }

        });

    }


    /* =====================================================
       ЗАГРУЗКА ФОТОГРАФИЙ С GITHUB
    ===================================================== */

    async function loadPhotos() {

        /*
         Если фотографии уже загружены,
         просто отображаем их.
        */

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

            const response =
                await fetch(PHOTOS_API);


            if (!response.ok) {

                throw new Error(
                    "GitHub не вернул фотографии"
                );

            }


            const files =
                await response.json();


            /*
             Оставляем только изображения
            */

            photos = files
                .filter((file) => {

                    const name =
                        file.name.toLowerCase();

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


                /*
                 Сортировка по названию
                */

                .sort((a, b) => {

                    return a.name.localeCompare(

                        b.name,

                        undefined,

                        {
                            numeric: true,
                            sensitivity: "base"
                        }

                    );

                });


            if (photos.length === 0) {

                throw new Error(
                    "Фотографии не найдены"
                );

            }


            renderPhotos();

        }

        catch (error) {

            console.error(
                "Ошибка загрузки фотографий:",
                error
            );


            if (gallery) {

                gallery.innerHTML = `

                    <div class="photos-error">

                        Не удалось загрузить фотографии.

                    </div>

                `;

            }

        }

    }


    /* =====================================================
       ОТОБРАЖЕНИЕ ФОТО
    ===================================================== */

    function renderPhotos() {

        if (!gallery) {
            return;
        }


        gallery.innerHTML = "";


        const start =
            currentPage * PHOTOS_PER_PAGE;


        const end =
            start + PHOTOS_PER_PAGE;


        const currentPhotos =
            photos.slice(start, end);


        currentPhotos.forEach(
            (photo, index) => {

                const photoNumber =
                    start + index + 1;


                const polaroid =
                    document.createElement("div");


                polaroid.className =
                    "polaroid";


                const image =
                    document.createElement("img");


                image.className =
                    "polaroid-image";


                image.src =
                    photo.download_url;


                image.alt =
                    `Воспоминание ${photoNumber}`;


                image.loading =
                    "lazy";


                const caption =
                    document.createElement("div");


                caption.className =
                    "polaroid-caption";


                caption.textContent =
                    `Воспоминание ${photoNumber} ❤️`;


                polaroid.appendChild(image);

                polaroid.appendChild(caption);


                /*
                 Открытие увеличенного фото
                */

                polaroid.addEventListener(
                    "click",
                    () => {

                        openPhotoModal(
                            photo.download_url,
                            photoNumber
                        );

                    }
                );


                gallery.appendChild(polaroid);

            }
        );


        updatePhotoNavigation();

    }


    /* =====================================================
       НАВИГАЦИЯ ФОТО
    ===================================================== */

    function updatePhotoNavigation() {

        const totalPages =
            Math.ceil(
                photos.length / PHOTOS_PER_PAGE
            );


        /*
         Кнопка «Назад»
        */

        if (previousPhotosButton) {

            if (currentPage > 0) {

                previousPhotosButton.style.display =
                    "inline-flex";

            }

            else {

                previousPhotosButton.style.display =
                    "none";

            }

        }


        /*
         Кнопка «Дальше»
        */

        if (nextPhotosButton) {

            if (
                currentPage < totalPages - 1
            ) {

                nextPhotosButton.textContent =
                    "Ещё воспоминания →";

            }

            else {

                nextPhotosButton.textContent =
                    "А теперь твоя очередь →";

            }

        }

    }


    /* =====================================================
       ПРЕДЫДУЩАЯ СТРАНИЦА ФОТО
    ===================================================== */

    if (previousPhotosButton) {

        previousPhotosButton.addEventListener(
            "click",
            () => {

                if (currentPage > 0) {

                    currentPage--;

                    renderPhotos();


                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }

            }
        );

    }


    /* =====================================================
       СЛЕДУЮЩАЯ СТРАНИЦА ФОТО
    ===================================================== */

    if (nextPhotosButton) {

        nextPhotosButton.addEventListener(
            "click",
            () => {

                const totalPages =
                    Math.ceil(
                        photos.length /
                        PHOTOS_PER_PAGE
                    );


                /*
                 Есть ещё фотографии
                */

                if (
                    currentPage <
                    totalPages - 1
                ) {

                    currentPage++;

                    renderPhotos();


                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }


                /*
                 Фотографии закончились
                */

                else {

                    showQuestions();

                }

            }
        );

    }


    /* =====================================================
       НАЗАД К ПИСЬМУ
    ===================================================== */

    if (backToLetterButton) {

        backToLetterButton.addEventListener(
            "click",
            () => {

                showLetter();

            }
        );

    }


    /* =====================================================
       УВЕЛИЧЕННОЕ ФОТО
    ===================================================== */

    function openPhotoModal(
        imageUrl,
        photoNumber
    ) {

        /*
         Удаляем старое окно,
         если оно существует
        */

        const oldModal =
            document.querySelector(
                ".photo-modal"
            );


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
                    type="button"
                >
                    ×
                </button>


                <img
                    src="${imageUrl}"
                    alt="Воспоминание ${photoNumber}"
                >


                <div class="photo-modal-caption">

                    Воспоминание ${photoNumber}
                    ❤️

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        document.body.style.overflow =
            "hidden";


        const closeButton =
            modal.querySelector(
                ".photo-modal-close"
            );


        closeButton.addEventListener(
            "click",
            () => {

                closePhotoModal(
                    modal
                );

            }
        );


        /*
         Закрытие при клике на фон
        */

        modal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === modal
                ) {

                    closePhotoModal(
                        modal
                    );

                }

            }
        );


        /*
         Escape
        */

        document.addEventListener(
            "keydown",

            function escapeHandler(event) {

                if (
                    event.key === "Escape"
                ) {

                    closePhotoModal(
                        modal
                    );


                    document.removeEventListener(
                        "keydown",
                        escapeHandler
                    );

                }

            }

        );

    }


    /* =====================================================
       ЗАКРЫТИЕ УВЕЛИЧЕННОГО ФОТО
    ===================================================== */

    function closePhotoModal(modal) {

        modal.remove();

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       ЗАПУСК
    ===================================================== */

    /*
     Начинаем с письма.
    */

    showLetter();

});
