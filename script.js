/* =====================================
   НАСТРОЙКИ GITHUB
===================================== */

const GITHUB_OWNER = "olegkarpukhin";

const GITHUB_REPOSITORY = "birthday-card";

const PHOTOS_FOLDER = "photos/photos";


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

const envelope = document.getElementById("envelope");

const intro = document.getElementById("intro");

const continueBtn = document.getElementById("continueBtn");

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


const finalSection =
  document.getElementById("finalSection");

const finalBackBtn =
  document.getElementById("finalBackBtn");


/* =====================================
   СОСТОЯНИЕ
===================================== */

let currentQuestion = 0;

const answers =
  new Array(QUESTIONS.length).fill("");


/* =====================================
   СКРЫТЬ ВСЕ СТРАНИЦЫ
===================================== */

function hideAllPages() {

  intro.style.display = "none";

  memoriesSection1.classList.remove("show");

  memoriesSection2.classList.remove("show");

  questionsSection.classList.remove("show");

  finalSection.classList.remove("show");

}


/* =====================================
   ПОКАЗАТЬ СТРАНИЦУ ФОТО 1
===================================== */

function showPhotosPage1() {

  hideAllPages();

  memoriesSection1.classList.add("show");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================
   ПОКАЗАТЬ СТРАНИЦУ ФОТО 2
===================================== */

function showPhotosPage2() {

  hideAllPages();

  memoriesSection2.classList.add("show");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================
   ПОКАЗАТЬ ПИСЬМО
===================================== */

function showLetter() {

  hideAllPages();

  intro.style.display = "flex";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================
   ПОКАЗАТЬ ВОПРОСЫ
===================================== */

function showQuestionsPage() {

  hideAllPages();

  questionsSection.classList.add("show");

  showQuestion();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================
   ПОКАЗАТЬ ФИНАЛ
===================================== */

function showFinalPage() {

  hideAllPages();

  finalSection.classList.add("show");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================
   ОТКРЫТИЕ КОНВЕРТА
===================================== */

envelope.addEventListener(
  "click",
  function (event) {

    /* Если нажали на кнопку —
       конверт не трогаем */

    if (
      event.target.closest("button")
    ) {
      return;
    }

    envelope.classList.add("open");


    const hint =
      document.querySelector(".hint");


    if (hint) {

      hint.style.opacity = "0";

    }

  }
);


/* =====================================
   ЗАКРЫТИЕ ПИСЬМА
===================================== */

closeLetterBtn.addEventListener(
  "click",
  function (event) {

    event.preventDefault();

    event.stopPropagation();

    envelope.classList.remove("open");


    const hint =
      document.querySelector(".hint");


    if (hint) {

      hint.style.opacity = "1";

    }

  }
);


/* =====================================
   ПРОДОЛЖИТЬ → ФОТОГРАФИИ
===================================== */

continueBtn.addEventListener(
  "click",
  function (event) {

    /* Самое важное:
       не даём клику попасть в envelope */

    event.preventDefault();

    event.stopPropagation();


    /* Переходим на первую страницу фото */

    showPhotosPage1();

  }
);


/* =====================================
   НАЗАД К ПИСЬМУ
===================================== */

backToLetterBtn.addEventListener(
  "click",
  function () {

    showLetter();


    /* Письмо остаётся открытым */

    setTimeout(
      function () {

        envelope.classList.add("open");

      },
      100
    );

  }
);


/* =====================================
   ФОТО 1 → ФОТО 2
===================================== */

photosPage2Btn.addEventListener(
  "click",
  function () {

    showPhotosPage2();

  }
);


/* =====================================
   ФОТО 2 → ФОТО 1
===================================== */

photosPage1Btn.addEventListener(
  "click",
  function () {

    showPhotosPage1();

  }
);


/* =====================================
   ФОТО 2 → ВОПРОСЫ
===================================== */

questionsStartBtn.addEventListener(
  "click",
  function () {

    showQuestionsPage();

  }
);


/* =====================================
   ПОКАЗ ВОПРОСА
===================================== */

function showQuestion() {

  questionCounter.textContent =
    `Вопрос ${currentQuestion + 1} из ${QUESTIONS.length}`;


  questionText.textContent =
    QUESTIONS[currentQuestion];


  answerInput.value =
    answers[currentQuestion];


  /* На первом вопросе
     кнопку назад скрываем */

  previousQuestionBtn.style.visibility =
    currentQuestion === 0
      ? "hidden"
      : "visible";


  /* Последний вопрос */

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
  function () {

    answers[currentQuestion] =
      answerInput.value;

  }
);


/* =====================================
   ПРЕДЫДУЩИЙ ВОПРОС
===================================== */

previousQuestionBtn.addEventListener(
  "click",
  function () {

    answers[currentQuestion] =
      answerInput.value;


    if (currentQuestion > 0) {

      currentQuestion--;

      showQuestion();

    }

  }
);


/* =====================================
   СЛЕДУЮЩИЙ ВОПРОС
===================================== */

nextQuestionBtn.addEventListener(
  "click",
  function () {

    answers[currentQuestion] =
      answerInput.value;


    /* Если ещё есть вопросы */

    if (
      currentQuestion <
      QUESTIONS.length - 1
    ) {

      currentQuestion++;

      showQuestion();

    }

    /* Если это последний вопрос */

    else {

      showFinalPage();

    }

  }
);


/* =====================================
   ФИНАЛ → НАЗАД К ВОПРОСАМ
===================================== */

finalBackBtn.addEventListener(
  "click",
  function () {

    currentQuestion =
      QUESTIONS.length - 1;


    showQuestionsPage();

  }
);


/* =====================================
   ЗАГРУЗКА ФОТОГРАФИЙ
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
        .filter(
          function (file) {

            return (
              file.type === "file" &&
              /\.(jpg|jpeg|png|webp)$/i.test(
                file.name
              )
            );

          }
        )
        .sort(
          function (a, b) {

            return a.name.localeCompare(
              b.name,
              undefined,
              {
                numeric: true
              }
            );

          }
        );


    /* Очищаем галереи */

    gallery1.innerHTML = "";

    gallery2.innerHTML = "";


    /* Первые 15 фотографий */

    images
      .slice(0, 15)
      .forEach(
        function (
          photo,
          index
        ) {

          gallery1.appendChild(

            createPolaroid(
              photo.download_url,
              index,
              photo.name
            )

          );

        }
      );


    /* Следующие 15 */

    images
      .slice(15, 30)
      .forEach(
        function (
          photo,
          index
        ) {

          gallery2.appendChild(

            createPolaroid(
              photo.download_url,
              index + 15,
              photo.name
            )

          );

        }
      );


    if (images.length === 0) {

      gallery1.innerHTML =
        "<p>Фотографии пока не найдены.</p>";

    }


    /* Если фотографий меньше 16,
       вторая страница всё равно
       остаётся рабочей */

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
  index,
  fileName
) {

  const rotations = [

    "-4deg",
    "3deg",
    "-2deg",
    "5deg",
    "-3deg",
    "2deg"

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
      alt="${fileName}"
      loading="lazy"
    >

    <p class="polaroid-caption">
    </p>

  `;


  /* Открытие увеличенного фото */

  polaroid.addEventListener(
    "click",
    function () {

      openPhotoModal(
        imageUrl,
        fileName
      );

    }
  );


  return polaroid;

}


/* =====================================
   УВЕЛИЧЕННОЕ ФОТО
===================================== */

function openPhotoModal(
  imageUrl,
  caption
) {

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
        type="button"
        class="photo-modal-close"
      >
        ×
      </button>


      <img
        src="${imageUrl}"
        alt="${caption}"
      >


      <p class="photo-caption">
        ${caption}
      </p>

    </div>

  `;


  document.body.appendChild(
    modal
  );


  const closeButton =
    modal.querySelector(
      ".photo-modal-close"
    );


  closeButton.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      modal.remove();

    }
  );


  modal.addEventListener(
    "click",
    function (event) {

      if (
        event.target === modal
      ) {

        modal.remove();

      }

    }
  );

}


/* =====================================
   ЗАПУСК
===================================== */

loadPhotos();
