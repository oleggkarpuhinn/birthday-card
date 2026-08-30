/* =====================================
   НАСТРОЙКИ GITHUB
===================================== */

const GITHUB_OWNER =
  "olegkarpukhin";


const GITHUB_REPOSITORY =
  "birthday-card";


const PHOTOS_FOLDER =
  "photos/photos";


/* =====================================
   ПОДПИСИ К ФОТО

   МОЖЕШЬ ПОТОМ МЕНЯТЬ ИХ
===================================== */

const PHOTO_CAPTIONS = [

  "Маленькое воспоминание ❤️",

  "Один из тех моментов",

  "С чего всё начиналось",

  "Красивый вечер",

  "Ты",

  "Наш кот, который всегда рядом 🐈",

  "Ещё один особенный день",

  "Закат, который хочется помнить",

  "Мы",

  "Просто красиво",

  "Момент тишины",

  "Ещё немного тебя",

  "Тот самый вечер",

  "Куда-то далеко",

  "Один из любимых моментов",

  "Ещё одна история",

  "Красота в мелочах",

  "Момент, который остался здесь",

  "Почти как в кино",

  "Просто счастливый день",

  "Это тоже хочется сохранить",

  "Ты здесь особенно красивая",

  "Ещё одно воспоминание",

  "Иногда слов не нужно",

  "Просто мы",

  "Ещё немного счастья",

  "Пусть это останется здесь",

  "Воспоминание навсегда",

  "Один из наших моментов",

  "И ещё один ❤️"

];


/* =====================================
   ВОПРОСЫ
===================================== */

const QUESTIONS = [

  "Какое воспоминание обо мне первым приходит тебе в голову?",

  "Что тебе больше всего нравится в наших отношениях?",

  "Какой момент со мной тебе хотелось бы пережить ещё раз?",

  "Есть ли что-то, что ты давно хотела мне сказать?",

  "Какой день, проведённый вместе, ты запомнила сильнее всего?",

  "Что заставляет тебя улыбаться, когда ты думаешь обо мне?",

  "Какое место тебе хотелось бы посетить вместе со мной?",

  "За что ты могла бы сказать мне спасибо?",

  "Что бы тебе хотелось пережить вместе в будущем?",

  "И последнее: что ты хочешь сказать мне прямо сейчас?"

];


/* =====================================
   ЭЛЕМЕНТЫ СТРАНИЦЫ
===================================== */

const envelope =
  document.getElementById(
    "envelope"
  );


const intro =
  document.getElementById(
    "intro"
  );


const continueBtn =
  document.getElementById(
    "continueBtn"
  );


const closeLetterBtn =
  document.getElementById(
    "closeLetterBtn"
  );


const memoriesSection1 =
  document.getElementById(
    "memoriesSection1"
  );


const memoriesSection2 =
  document.getElementById(
    "memoriesSection2"
  );


const gallery1 =
  document.getElementById(
    "polaroidGallery1"
  );


const gallery2 =
  document.getElementById(
    "polaroidGallery2"
  );


const backToLetterBtn =
  document.getElementById(
    "backToLetterBtn"
  );


const photosPage2Btn =
  document.getElementById(
    "photosPage2Btn"
  );


const photosPage1Btn =
  document.getElementById(
    "photosPage1Btn"
  );


const questionsStartBtn =
  document.getElementById(
    "questionsStartBtn"
  );


const questionsSection =
  document.getElementById(
    "questionsSection"
  );


const questionCounter =
  document.getElementById(
    "questionCounter"
  );


const questionText =
  document.getElementById(
    "questionText"
  );


const answerInput =
  document.getElementById(
    "answerInput"
  );


const previousQuestionBtn =
  document.getElementById(
    "previousQuestionBtn"
  );


const nextQuestionBtn =
  document.getElementById(
    "nextQuestionBtn"
  );


const finalSection =
  document.getElementById(
    "finalSection"
  );


const finalBackBtn =
  document.getElementById(
    "finalBackBtn"
  );


const finalPhotosBtn =
  document.getElementById(
    "finalPhotosBtn"
  );


/* =====================================
   МОДАЛЬНОЕ ОКНО
===================================== */

const photoModal =
  document.getElementById(
    "photoModal"
  );


const modalImage =
  document.getElementById(
    "modalImage"
  );


const modalCaption =
  document.getElementById(
    "modalCaption"
  );


const modalClose =
  document.getElementById(
    "modalClose"
  );


const modalPrev =
  document.getElementById(
    "modalPrev"
  );


const modalNext =
  document.getElementById(
    "modalNext"
  );


const modalOverlay =
  document.querySelector(
    ".modal-overlay"
  );


/* =====================================
   МАССИВ ВСЕХ ФОТО
===================================== */

let allPhotos =
  [];


let currentPhotoIndex =
  0;


/* =====================================
   ЗАГРУЗКА ФОТО ИЗ GITHUB
===================================== */

async function loadPhotos() {


  const apiUrl =
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/contents/${PHOTOS_FOLDER}`;


  try {


    const response =
      await fetch(
        apiUrl
      );


    if (
      !response.ok
    ) {

      throw new Error(
        "Не удалось загрузить фотографии"
      );

    }


    const files =
      await response.json();


    const images =
      files
        .filter(
          file => {

            return (

              file.type === "file" &&

              /\.(jpg|jpeg|png|webp)$/i.test(
                file.name
              )

            );

          }
        )
        .sort(
          (
            a,
            b
          ) => {

            return a.name.localeCompare(
              b.name,
              undefined,
              {
                numeric: true
              }
            );

          }
        );


    allPhotos =
      images;


    gallery1.innerHTML =
      "";


    gallery2.innerHTML =
      "";


    /* =========================
       ПЕРВЫЕ 15 ФОТО
    ========================== */

    images
      .slice(
        0,
        15
      )
      .forEach(
        (
          photo,
          index
        ) => {


          gallery1.appendChild(

            createPolaroid(

              photo.download_url,

              index,

              index

            )

          );

        }
      );


    /* =========================
       ФОТО 16–30
    ========================== */

    images
      .slice(
        15,
        30
      )
      .forEach(
        (
          photo,
          index
        ) => {


          const realIndex =
            index + 15;


          gallery2.appendChild(

            createPolaroid(

              photo.download_url,

              realIndex,

              realIndex

            )

          );

        }
      );


    if (
      images.length === 0
    ) {

      gallery1.innerHTML =
        "<p>Фотографии пока не найдены.</p>";

    }


  }


  catch (
    error
  ) {


    console.error(
      error
    );


    gallery1.innerHTML =
      "<p>Не удалось загрузить фотографии.</p>";


  }

}


/* =====================================
   СОЗДАНИЕ POLAROID
===================================== */

function createPolaroid(

  imageUrl,

  index,

  photoIndex

) {


  const rotations = [

    "-4deg",

    "3deg",

    "-2deg",

    "4deg",

    "-3deg",

    "2deg",

    "-2deg",

    "3deg"

  ];


  const polaroid =
    document.createElement(
      "article"
    );


  polaroid.className =
    "polaroid";


  polaroid.style.setProperty(

    "--rotation",

    rotations[
      index %
      rotations.length
    ]

  );


  const caption =
    PHOTO_CAPTIONS[
      photoIndex
    ] ||
    "Одно из воспоминаний ❤️";


  polaroid.innerHTML = `

    <img
      class="polaroid-image"
      src="${imageUrl}"
      alt="Воспоминание"
      loading="lazy"
    >

    <p class="polaroid-caption">
      ${caption}
    </p>

  `;


  /* ОТКРЫТИЕ ФОТО */

  polaroid.addEventListener(

    "click",

    () => {

      openPhoto(
        photoIndex
      );

    }

  );


  return polaroid;

}


/* =====================================
   ОТКРЫТЬ ФОТО
===================================== */

function openPhoto(
  index
) {


  currentPhotoIndex =
    index;


  const photo =
    allPhotos[
      currentPhotoIndex
    ];


  if (
    !photo
  ) {

    return;

  }


  modalImage.src =
    photo.download_url;


  modalCaption.textContent =

    PHOTO_CAPTIONS[
      currentPhotoIndex
    ] ||
    "Одно из воспоминаний ❤️";


  photoModal.classList.add(
    "show"
  );


  document.body.style.overflow =
    "hidden";

}


/* =====================================
   ЗАКРЫТЬ ФОТО
===================================== */

function closePhoto() {


  photoModal.classList.remove(
    "show"
  );


  document.body.style.overflow =
    "";

}


/* =====================================
   ПРЕДЫДУЩЕЕ ФОТО
===================================== */

function previousPhoto() {


  currentPhotoIndex--;


  if (
    currentPhotoIndex < 0
  ) {

    currentPhotoIndex =
      allPhotos.length - 1;

  }


  openPhoto(
    currentPhotoIndex
  );

}


/* =====================================
   СЛЕДУЮЩЕЕ ФОТО
===================================== */

function nextPhoto() {


  currentPhotoIndex++;


  if (
    currentPhotoIndex >=
    allPhotos.length
  ) {

    currentPhotoIndex =
      0;

  }


  openPhoto(
    currentPhotoIndex
  );

}


/* =====================================
   СОБЫТИЯ МОДАЛЬНОГО ОКНА
===================================== */

modalClose.addEventListener(

  "click",

  closePhoto

);


modalOverlay.addEventListener(

  "click",

  closePhoto

);


modalPrev.addEventListener(

  "click",

  previousPhoto

);


modalNext.addEventListener(

  "click",

  nextPhoto

);


/* КЛАВИАТУРА */

document.addEventListener(

  "keydown",

  event => {


    if (
      !photoModal.classList.contains(
        "show"
      )
    ) {

      return;

    }


    if (
      event.key ===
      "Escape"
    ) {

      closePhoto();

    }


    if (
      event.key ===
      "ArrowLeft"
    ) {

      previousPhoto();

    }


    if (
      event.key ===
      "ArrowRight"
    ) {

      nextPhoto();

    }


  }

);


/* =====================================
   ОТКРЫТИЕ КОНВЕРТА
===================================== */

envelope.addEventListener(

  "click",

  () => {


    envelope.classList.add(
      "open"
    );


    const hint =
      document.querySelector(
        ".hint"
      );


    if (
      hint
    ) {

      hint.style.opacity =
        "0";

    }


  }

);


/* =====================================
   ЗАКРЫТИЕ ПИСЬМА
===================================== */

closeLetterBtn.addEventListener(

  "click",

  event => {


    event.stopPropagation();


    envelope.classList.remove(
      "open"
    );


    const hint =
      document.querySelector(
        ".hint"
      );


    if (
      hint
    ) {

      hint.style.opacity =
        "1";

    }


  }

);


/* =====================================
   ПЕРЕХОД К ФОТО
===================================== */

continueBtn.addEventListener(

  "click",

  event => {


    event.stopPropagation();


    intro.style.display =
      "none";


    memoriesSection1.classList.add(
      "show"
    );


    window.scrollTo({

      top: 0,

      behavior:
        "smooth"

    });


  }

);


/* =====================================
   НАЗАД К ПИСЬМУ
===================================== */

backToLetterBtn.addEventListener(

  "click",

  () => {


    memoriesSection1.classList.remove(
      "show"
    );


    intro.style.display =
      "flex";


    window.scrollTo({

      top: 0,

      behavior:
        "smooth"

    });


  }

);


/* =====================================
   ФОТО 1 → ФОТО 2
===================================== */

photosPage2Btn.addEventListener(

  "click",

  () => {


    memoriesSection1.classList.remove(
      "show"
    );


    memoriesSection2.classList.add(
      "show"
    );


    window.scrollTo({

      top: 0,

      behavior:
        "smooth"

    });


  }

);


/* =====================================
   ФОТО 2 → ФОТО 1
===================================== */

photosPage1Btn.addEventListener(

  "click",

  () => {


    memoriesSection2.classList.remove(
      "show"
    );


    memoriesSection1.classList.add(
      "show"
    );


    window.scrollTo({

      top: 0,

      behavior:
        "smooth"

    });


  }

);


/* =====================================
   К ВОПРОСАМ
===================================== */

questionsStartBtn.addEventListener(

  "click",

  () => {


    memoriesSection2.classList.remove(
      "show"
    );


    questionsSection.classList.add(
      "show"
    );


    showQuestion();


    window.scrollTo({

      top: 0,

      behavior:
        "smooth"

    });


  }

);


/* =====================================
   ВОПРОСЫ
===================================== */

let currentQuestion =
  0;


const answers =
  new Array(
    QUESTIONS.length
  ).fill(
    ""
  );


function showQuestion() {


  questionCounter.textContent =

    `Вопрос ${
      currentQuestion + 1
    } из ${
      QUESTIONS.length
    }`;


  questionText.textContent =

    QUESTIONS[
      currentQuestion
    ];


  answerInput.value =

    answers[
      currentQuestion
    ];


  previousQuestionBtn.style.visibility =

    currentQuestion === 0

      ? "hidden"

      : "visible";


  if (

    currentQuestion ===
    QUESTIONS.length - 1

  ) {

    nextQuestionBtn.textContent =
      "Закончить →";

  }

  else {

    nextQuestionBtn.textContent =
      "Далее →";

  }


}


/* СОХРАНЕНИЕ ОТВЕТА */

answerInput.addEventListener(

  "input",

  () => {


    answers[
      currentQuestion
    ] =

      answerInput.value;


  }

);


/* ПРЕДЫДУЩИЙ ВОПРОС */

previousQuestionBtn.addEventListener(

  "click",

  () => {


    if (

      currentQuestion >
      0

    ) {


      currentQuestion--;


      showQuestion();


    }


  }

);


/* СЛЕДУЮЩИЙ ВОПРОС */

nextQuestionBtn.addEventListener(

  "click",

  () => {


    answers[
      currentQuestion
    ] =

      answerInput.value;


    if (

      currentQuestion <
      QUESTIONS.length - 1

    ) {


      currentQuestion++;


      showQuestion();


    }


    else {


      questionsSection.classList.remove(
        "show"
      );


      finalSection.classList.add(
        "show"
      );


      window.scrollTo({

        top: 0,

        behavior:
          "smooth"

      });


    }


  }

);


/* =====================================
   ФИНАЛ → ВОПРОСЫ
===================================== */

finalBackBtn.addEventListener(

  "click",

  () => {


    finalSection.classList.remove(
      "show"
    );


    questionsSection.classList.add(
      "show"
    );


    currentQuestion =
      QUESTIONS.length - 1;


    showQuestion();


  }

);


/* =====================================
   ФИНАЛ → ФОТО
===================================== */

finalPhotosBtn.addEventListener(

  "click",

  () => {


    finalSection.classList.remove(
      "show"
    );


    memoriesSection2.classList.add(
      "show"
    );


    window.scrollTo({

      top: 0,

      behavior:
        "smooth"

    });


  }

);


/* =====================================
   ЗАПУСК
===================================== */

loadPhotos();
