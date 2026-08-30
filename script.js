/* =====================================
   НАСТРОЙКИ GITHUB
===================================== */

const GITHUB_OWNER = "olegkarpukhin";

const GITHUB_REPOSITORY = "birthday-card";


/* =====================================
   ВОЗМОЖНЫЕ ПАПКИ С ФОТО
===================================== */

const PHOTO_FOLDERS = [

  "photos",

  "photos/photos"

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
   ЭЛЕМЕНТЫ
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


const finalSection =
  document.getElementById("finalSection");

const finalBackBtn =
  document.getElementById("finalBackBtn");


/* =====================================
   ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ
===================================== */

function hideAllSections() {

  if (intro) {
    intro.style.display = "none";
  }

  if (memoriesSection1) {
    memoriesSection1.classList.remove("show");
  }

  if (memoriesSection2) {
    memoriesSection2.classList.remove("show");
  }

  if (questionsSection) {
    questionsSection.classList.remove("show");
  }

  if (finalSection) {
    finalSection.classList.remove("show");
  }

}


function goToSection(section) {

  hideAllSections();


  if (section === intro) {

    intro.style.display = "flex";

  } else {

    section.classList.add("show");

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================
   ПОЛУЧЕНИЕ ФОТО ИЗ GITHUB
===================================== */

async function getPhotosFromFolder(folder) {

  const apiUrl =
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/contents/${folder}`;


  const response =
    await fetch(
      apiUrl + "?t=" + Date.now()
    );


  if (!response.ok) {

    throw new Error(
      `Папка ${folder} не найдена`
    );

  }


  const files =
    await response.json();


  return files.filter(

    file =>

      file.type === "file" &&

      /\.(jpg|jpeg|png|webp)$/i.test(
        file.name
      )

  );

}


/* =====================================
   ЗАГРУЗКА ФОТОГРАФИЙ
===================================== */

async function loadPhotos() {

  if (!gallery1 || !gallery2) {
    return;
  }


  gallery1.innerHTML =
    "<p>Загрузка фотографий...</p>";


  gallery2.innerHTML =
    "";


  let images = [];


  /* =====================================
     ПРОБУЕМ ВСЕ ВОЗМОЖНЫЕ ПАПКИ
  ===================================== */

  for (

    const folder
    of PHOTO_FOLDERS

  ) {

    try {

      const foundImages =
        await getPhotosFromFolder(
          folder
        );


      if (
        foundImages.length > 0
      ) {

        images =
          foundImages;


        console.log(
          "Фотографии найдены в:",
          folder
        );


        break;

      }

    }

    catch (error) {

      console.log(
        "Не найден путь:",
        folder
      );

    }

  }


  /* =====================================
     ЕСЛИ ФОТО НЕ НАЙДЕНЫ
  ===================================== */

  if (
    images.length === 0
  ) {

    gallery1.innerHTML = `

      <p>
        Фотографии не найдены.
      </p>

      <p>
        Проверь консоль браузера
        или структуру папок GitHub.
      </p>

    `;


    return;

  }


  /* =====================================
     СОРТИРОВКА
  ===================================== */

  images.sort(

    (a, b) =>

      a.name.localeCompare(

        b.name,

        undefined,

        {
          numeric: true
        }

      )

  );


  gallery1.innerHTML =
    "";


  /* =====================================
     ПЕРВЫЕ 15
  ===================================== */

  images
    .slice(0, 15)
    .forEach(

      (photo, index) => {

        gallery1.appendChild(

          createPolaroid(

            photo.download_url,

            index,

            photo.name

          )

        );

      }

    );


  /* =====================================
     СЛЕДУЮЩИЕ 15
  ===================================== */

  images
    .slice(15, 30)
    .forEach(

      (photo, index) => {

        gallery2.appendChild(

          createPolaroid(

            photo.download_url,

            index + 15,

            photo.name

          )

        );

      }

    );


  if (
    images.length <= 15
  ) {

    gallery2.innerHTML =

      "<p>Дополнительных фотографий пока нет.</p>";

  }

}


/* =====================================
   СОЗДАНИЕ POLAROID
===================================== */

function createPolaroid(
  imageUrl,
  index,
  imageName
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


  polaroid.innerHTML = `

    <img
      class="polaroid-image"
      src="${imageUrl}"
      alt="Воспоминание"
      loading="lazy"
    >

    <p class="polaroid-caption">
      Нажми, чтобы посмотреть
    </p>

  `;


  polaroid.addEventListener(

    "click",

    () => {

      openPhotoModal(
        imageUrl,
        imageName
      );

    }

  );


  return polaroid;

}


/* =====================================
   УВЕЛИЧЕНИЕ ФОТО
===================================== */

function openPhotoModal(
  imageUrl,
  imageName
) {

  const oldModal =
    document.getElementById(
      "photoModal"
    );


  if (oldModal) {
    oldModal.remove();
  }


  const modal =
    document.createElement(
      "div"
    );


  modal.id =
    "photoModal";


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
        alt="Фотография"
      >


      <p>
        ${imageName}
      </p>

    </div>

  `;


  document.body.appendChild(
    modal
  );


  modal.addEventListener(

    "click",

    event => {

      if (
        event.target === modal
      ) {

        modal.remove();

      }

    }

  );


  modal
    .querySelector(
      ".photo-modal-close"
    )
    .addEventListener(

      "click",

      () => {

        modal.remove();

      }

    );

}


/* =====================================
   КОНВЕРТ
===================================== */

if (envelope) {

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

}


/* =====================================
   ЗАКРЫТИЕ ПИСЬМА
===================================== */

if (closeLetterBtn) {

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


      if (hint) {

        hint.style.opacity =
          "1";

      }

    }

  );

}


/* =====================================
   КОНВЕРТ → ФОТО
===================================== */

if (continueBtn) {

  continueBtn.addEventListener(

    "click",

    event => {

      event.preventDefault();

      event.stopPropagation();


      goToSection(
        memoriesSection1
      );

    }

  );

}


/* =====================================
   ФОТО → ПИСЬМО
===================================== */

if (backToLetterBtn) {

  backToLetterBtn.addEventListener(

    "click",

    () => {

      goToSection(
        intro
      );

    }

  );

}


/* =====================================
   ФОТО 1 → ФОТО 2
===================================== */

if (photosPage2Btn) {

  photosPage2Btn.addEventListener(

    "click",

    () => {

      goToSection(
        memoriesSection2
      );

    }

  );

}


/* =====================================
   ФОТО 2 → ФОТО 1
===================================== */

if (photosPage1Btn) {

  photosPage1Btn.addEventListener(

    "click",

    () => {

      goToSection(
        memoriesSection1
      );

    }

  );

}


/* =====================================
   ФОТО → ВОПРОСЫ
===================================== */

if (questionsStartBtn) {

  questionsStartBtn.addEventListener(

    "click",

    () => {

      goToSection(
        questionsSection
      );


      showQuestion();

    }

  );

}


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

  if (

    !questionCounter ||

    !questionText ||

    !answerInput

  ) {

    return;

  }


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


  if (
    previousQuestionBtn
  ) {

    previousQuestionBtn.style.visibility =

      currentQuestion === 0

        ? "hidden"

        : "visible";

  }


  if (
    nextQuestionBtn
  ) {

    nextQuestionBtn.textContent =

      currentQuestion ===
      QUESTIONS.length - 1

        ? "Закончить →"

        : "Далее →";

  }

}


if (answerInput) {

  answerInput.addEventListener(

    "input",

    () => {

      answers[
        currentQuestion
      ] =

        answerInput.value;

    }

  );

}


if (previousQuestionBtn) {

  previousQuestionBtn.addEventListener(

    "click",

    () => {

      if (
        currentQuestion > 0
      ) {

        currentQuestion--;


        showQuestion();

      }

    }

  );

}


if (nextQuestionBtn) {

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

        goToSection(
          finalSection
        );

      }

    }

  );

}


/* =====================================
   ФИНАЛ → ВОПРОСЫ
===================================== */

if (finalBackBtn) {

  finalBackBtn.addEventListener(

    "click",

    () => {

      currentQuestion =

        QUESTIONS.length - 1;


      goToSection(
        questionsSection
      );


      showQuestion();

    }

  );

}


/* =====================================
   ЗАПУСК
===================================== */

loadPhotos();
