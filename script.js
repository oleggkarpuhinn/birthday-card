/* =====================================
   ФОТОГРАФИИ

   Все фотографии находятся в папке:
   photos
===================================== */

const PHOTOS = [

  {
    image: "photos/photo_2024-05-16_16-29-51.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2024-05-16_16-29-58 (2).jpg",
    caption: ""
  },

  {
    image: "photos/photo_2024-05-16_16-29-58.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2024-05-16_16-29-59.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2024-06-09_03-10-51.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2025-03-14_10-29-28.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2025-03-18_21-06-29.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-06-06_02-42-53.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-06-20_15-24-08.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-06-23_23-10-16 (2).jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-06-23_23-10-16 (3).jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-06-23_23-10-16 (4).jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-06-23_23-10-16.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-06-23_23-10-17.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-06-27_10-36-58 (2).jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-06-27_10-36-58.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-07-01_23-29-46.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-07-05_20-13-23.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-07-12_21-01-18.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-07-13_23-09-25.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-07-16_22-02-21.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-07-18_21-08-59.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-07-23_18-28-26.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-08-03_22-42-54.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-08-04_21-09-54.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-08-10_16-33-48.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-08-13_19-41-34.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-08-15_13-33-51.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-08-22_21-30-13.jpg",
    caption: ""
  },

  {
    image: "photos/photo_2026-08-28_20-07-15.jpg",
    caption: ""
  }

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

const envelope = document.getElementById("envelope");

const intro = document.getElementById("intro");

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


/* НОВАЯ КНОПКА:
   ВОПРОСЫ → ФОТОГРАФИИ */

const backToPhotosBtn =
  document.getElementById("backToPhotosBtn");


const finalSection =
  document.getElementById("finalSection");

const finalBackBtn =
  document.getElementById("finalBackBtn");


/* =====================================
   ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ
===================================== */

function hideAllSections() {

  intro.style.display = "none";

  memoriesSection1.classList.remove("show");

  memoriesSection2.classList.remove("show");

  questionsSection.classList.remove("show");

  finalSection.classList.remove("show");

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
   СОЗДАНИЕ ГАЛЕРЕЙ
===================================== */

function createGalleries() {

  gallery1.innerHTML = "";

  gallery2.innerHTML = "";


  PHOTOS
    .slice(0, 15)
    .forEach((photo, index) => {

      gallery1.appendChild(
        createPolaroid(photo, index)
      );

    });


  PHOTOS
    .slice(15, 30)
    .forEach((photo, index) => {

      gallery2.appendChild(
        createPolaroid(
          photo,
          index + 15
        )
      );

    });

}


/* =====================================
   СОЗДАНИЕ POLAROID
===================================== */

function createPolaroid(photo, index) {

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
    rotations[index % rotations.length]
  );


  polaroid.innerHTML = `

    <img
      class="polaroid-image"
      src="${photo.image}"
      alt="Воспоминание"
      loading="lazy"
    >

    <p class="polaroid-caption">
      ${photo.caption}
    </p>

  `;


  polaroid.addEventListener(
    "click",
    () => {

      openPhotoModal(
        photo.image,
        photo.caption
      );

    }
  );


  return polaroid;

}


/* =====================================
   УВЕЛИЧЕНИЕ ФОТО
===================================== */

function openPhotoModal(imageUrl, caption) {

  const oldModal =
    document.getElementById("photoModal");


  if (oldModal) {

    oldModal.remove();

  }


  const modal =
    document.createElement("div");


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
        ${caption}
      </p>

    </div>

  `;


  document.body.appendChild(modal);


  modal.addEventListener(
    "click",
    (event) => {

      if (event.target === modal) {

        modal.remove();

      }

    }
  );


  const closeButton =
    modal.querySelector(
      ".photo-modal-close"
    );


  closeButton.addEventListener(
    "click",
    () => {

      modal.remove();

    }
  );

}


/* =====================================
   КОНВЕРТ
===================================== */

envelope.addEventListener(
  "click",
  () => {

    envelope.classList.add("open");


    const hint =
      document.querySelector(".hint");


    if (hint) {

      hint.style.opacity = "0";

    }

  }
);


/* =====================================
   ЗАКРЫТЬ ПИСЬМО
===================================== */

closeLetterBtn.addEventListener(
  "click",
  (event) => {

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
   ПИСЬМО → ФОТО
===================================== */

continueBtn.addEventListener(
  "click",
  (event) => {

    event.preventDefault();

    event.stopPropagation();

    goToSection(
      memoriesSection1
    );

  }
);


/* =====================================
   ФОТО 1 → ПИСЬМО
===================================== */

backToLetterBtn.addEventListener(
  "click",
  () => {

    goToSection(intro);

  }
);


/* =====================================
   ФОТО 1 → ФОТО 2
===================================== */

photosPage2Btn.addEventListener(
  "click",
  () => {

    goToSection(
      memoriesSection2
    );

  }
);


/* =====================================
   ФОТО 2 → ФОТО 1
===================================== */

photosPage1Btn.addEventListener(
  "click",
  () => {

    goToSection(
      memoriesSection1
    );

  }
);


/* =====================================
   ФОТО → ВОПРОСЫ
===================================== */

questionsStartBtn.addEventListener(
  "click",
  () => {

    goToSection(
      questionsSection
    );

    showQuestion();

  }
);


/* =====================================
   ВОПРОСЫ
===================================== */

let currentQuestion = 0;


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
    QUESTIONS[currentQuestion];


  answerInput.value =
    answers[currentQuestion];


  previousQuestionBtn.style.visibility =

    currentQuestion === 0

      ? "hidden"

      : "visible";


  nextQuestionBtn.textContent =

    currentQuestion ===
    QUESTIONS.length - 1

      ? "Закончить →"

      : "Далее →";

}


/* СОХРАНЕНИЕ ОТВЕТА */

answerInput.addEventListener(
  "input",
  () => {

    answers[currentQuestion] =
      answerInput.value;

  }
);


/* НАЗАД ПО ВОПРОСАМ */

previousQuestionBtn.addEventListener(
  "click",
  () => {

    if (currentQuestion > 0) {

      currentQuestion--;

      showQuestion();

    }

  }
);


/* ДАЛЕЕ ПО ВОПРОСАМ */

nextQuestionBtn.addEventListener(
  "click",
  () => {

    answers[currentQuestion] =
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


/* =====================================
   ВОПРОСЫ → ФОТОГРАФИИ
===================================== */

if (backToPhotosBtn) {

  backToPhotosBtn.addEventListener(
    "click",
    () => {

      goToSection(
        memoriesSection2
      );

    }
  );

}


/* =====================================
   ФИНАЛ → ВОПРОСЫ
===================================== */

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


/* =====================================
   ЗАПУСК
===================================== */

createGalleries();
