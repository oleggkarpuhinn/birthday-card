/* =====================================
   НАСТРОЙКИ GITHUB
===================================== */

const GITHUB_OWNER = "olegkarpukhin";

const GITHUB_REPOSITORY = "birthday-card";

const PHOTOS_FOLDER =
  "photos/photos";


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
  document.getElementById("envelope");

const intro =
  document.getElementById("intro");

const continueBtn =
  document.getElementById("continueBtn");

const closeLetterBtn =
  document.getElementById("closeLetterBtn");


const memoriesSection1 =
  document.getElementById("memoriesSection1");

const memoriesSection2 =
  document.getElementById("memoriesSection2");


const gallery1 =
  document.getElementById("polaroidGallery1");

const gallery2 =
  document.getElementById("polaroidGallery2");


const backToLetterBtn =
  document.getElementById("backToLetterBtn");

const photosPage2Btn =
  document.getElementById("photosPage2Btn");

const photosPage1Btn =
  document.getElementById("photosPage1Btn");

const questionsStartBtn =
  document.getElementById("questionsStartBtn");


const questionsSection =
  document.getElementById("questionsSection");

const questionCounter =
  document.getElementById("questionCounter");

const questionText =
  document.getElementById("questionText");

const answerInput =
  document.getElementById("answerInput");

const previousQuestionBtn =
  document.getElementById("previousQuestionBtn");

const nextQuestionBtn =
  document.getElementById("nextQuestionBtn");

const backToPhotosBtn =
  document.getElementById("backToPhotosBtn");


const finalSection =
  document.getElementById("finalSection");

const finalBackBtn =
  document.getElementById("finalBackBtn");

const finalPhotosBtn =
  document.getElementById("finalPhotosBtn");


/* =====================================
   ФУНКЦИЯ ПРОКРУТКИ НАВЕРХ
===================================== */

function scrollToTop() {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* =====================================
   ЗАГРУЗКА ВСЕХ ФОТОГРАФИЙ ИЗ GITHUB
===================================== */

async function loadPhotos() {

  const apiUrl =
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/contents/${PHOTOS_FOLDER}`;


  try {

    const response =
      await fetch(apiUrl);


    if (!response.ok) {

      throw new Error(
        "Не удалось загрузить фотографии"
      );

    }


    const files =
      await response.json();


    const images =
      files
        .filter((file) => {

          return (

            file.type === "file" &&

            /\.(jpg|jpeg|png|webp)$/i.test(
              file.name
            )

          );

        })

        .sort((a, b) => {

          return a.name.localeCompare(

            b.name,

            "ru",

            {
              numeric: true
            }

          );

        });


    /* =====================================
       ОЧИЩАЕМ ГАЛЕРЕИ
    ====================================== */

    gallery1.innerHTML = "";

    gallery2.innerHTML = "";


    /* =====================================
       ПЕРВЫЕ 15 ФОТО
    ====================================== */

    images
      .slice(0, 15)
      .forEach(

        (photo, index) => {

          gallery1.appendChild(

            createPolaroid(

              photo.download_url,

              index

            )

          );

        }

      );


    /* =====================================
       ВСЕ ОСТАЛЬНЫЕ ФОТО

       НЕ ТОЛЬКО ДО 30 —
       ЗАГРУЗЯТСЯ ВСЕ,
       КОТОРЫЕ ЕСТЬ В ПАПКЕ
    ====================================== */

    images
      .slice(15)
      .forEach(

        (photo, index) => {

          gallery2.appendChild(

            createPolaroid(

              photo.download_url,

              index + 15

            )

          );

        }

      );


    /* =====================================
       ЕСЛИ ФОТО НЕ НАЙДЕНЫ
    ====================================== */

    if (images.length === 0) {

      gallery1.innerHTML =
        "<p>Фотографии пока не найдены.</p>";

      gallery2.innerHTML =
        "";

    }


    /* =====================================
       ЕСЛИ ФОТО МЕНЬШЕ ИЛИ РАВНО 15
       СКРЫВАЕМ КНОПКУ ВТОРОЙ СТРАНИЦЫ
    ====================================== */

    if (images.length <= 15) {

      photosPage2Btn.style.display =
        "none";

    }

  }

  catch (error) {

    console.error(error);


    gallery1.innerHTML =
      "<p>Не удалось загрузить фотографии.</p>";

  }

}


/* =====================================
   СОЗДАНИЕ POLAROID
===================================== */

function createPolaroid(
  imageUrl,
  index
) {

  const rotations = [

    "-4deg",
    "3deg",
    "-2deg",
    "5deg",
    "-3deg",
    "2deg",
    "-5deg",
    "4deg",
    "-1deg",
    "3deg"

  ];


  const polaroid =
    document.createElement("article");


  polaroid.className =
    "polaroid";


  polaroid.style.setProperty(

    "--rotation",

    rotations[
      index %
      rotations.length
    ]

  );


  polaroid.innerHTML = `

    <img
      class="polaroid-image"
      src="${imageUrl}"
      alt="Воспоминание"
      loading="lazy"
    >

    <p class="polaroid-caption"></p>

  `;


  return polaroid;

}


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


    if (hint) {

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
  (event) => {

    event.stopPropagation();


    envelope.classList.remove(
      "open"
    );


    const hint =
      document.querySelector(
        ".hint"
      );


    if (hint) {

      hint.style.opacity =
        "1";

    }

  }
);


/* =====================================
   ПИСЬМО → ФОТОГРАФИИ
===================================== */

continueBtn.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    intro.style.display =
      "none";


    memoriesSection1.classList.add(
      "show"
    );


    scrollToTop();

  }
);


/* =====================================
   ФОТО → ПИСЬМО
===================================== */

backToLetterBtn.addEventListener(
  "click",
  () => {

    memoriesSection1.classList.remove(
      "show"
    );


    intro.style.display =
      "flex";


    scrollToTop();

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


    scrollToTop();

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


    scrollToTop();

  }
);


/* =====================================
   ФОТО → ВОПРОСЫ
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


    scrollToTop();

  }
);


/* =====================================
   ВОПРОСЫ → ПОСЛЕДНЯЯ СТРАНИЦА ФОТО
===================================== */

backToPhotosBtn.addEventListener(
  "click",
  () => {

    questionsSection.classList.remove(
      "show"
    );


    memoriesSection2.classList.add(
      "show"
    );


    scrollToTop();

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
  ).fill("");


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


  previousQuestionBtn.style.display =

    currentQuestion === 0

      ? "none"

      : "inline-block";


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


/* =====================================
   СОХРАНЕНИЕ ОТВЕТА
===================================== */

answerInput.addEventListener(
  "input",
  () => {

    answers[
      currentQuestion
    ] =

      answerInput.value;

  }
);


/* =====================================
   ПРЕДЫДУЩИЙ ВОПРОС
===================================== */

previousQuestionBtn.addEventListener(
  "click",
  () => {

    if (
      currentQuestion > 0
    ) {

      currentQuestion--;


      showQuestion();


      scrollToTop();

    }

  }
);


/* =====================================
   СЛЕДУЮЩИЙ ВОПРОС
===================================== */

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


      scrollToTop();

    }

    else {

      questionsSection.classList.remove(
        "show"
      );


      finalSection.classList.add(
        "show"
      );


      scrollToTop();

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


    scrollToTop();

  }
);


/* =====================================
   ФИНАЛ → ФОТОГРАФИИ
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


    scrollToTop();

  }
);


/* =====================================
   ЗАПУСК
===================================== */

loadPhotos();
