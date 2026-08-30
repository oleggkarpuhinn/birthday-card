/* =====================================
   ФОТОГРАФИИ
===================================== */

const PHOTOS = [

  {
    image: "photos/photo1.jpg",
    caption: "Первый момент",
    rotation: "-4deg"
  },

  {
    image: "photos/photo2.jpg",
    caption: "Второй момент",
    rotation: "3deg"
  },

  {
    image: "photos/photo3.jpg",
    caption: "Третий момент",
    rotation: "-2deg"
  },

  {
    image: "photos/photo4.jpg",
    caption: "Четвёртый момент",
    rotation: "5deg"
  },

  {
    image: "photos/photo5.jpg",
    caption: "",
    rotation: "-3deg"
  },

  {
    image: "photos/photo6.jpg",
    caption: "",
    rotation: "2deg"
  },

  {
    image: "photos/photo7.jpg",
    caption: "",
    rotation: "-5deg"
  },

  {
    image: "photos/photo8.jpg",
    caption: "",
    rotation: "4deg"
  },

  {
    image: "photos/photo9.jpg",
    caption: "",
    rotation: "-2deg"
  },

  {
    image: "photos/photo10.jpg",
    caption: "",
    rotation: "3deg"
  },

  {
    image: "photos/photo11.jpg",
    caption: "",
    rotation: "-4deg"
  },

  {
    image: "photos/photo12.jpg",
    caption: "",
    rotation: "2deg"
  },

  {
    image: "photos/photo13.jpg",
    caption: "",
    rotation: "-3deg"
  },

  {
    image: "photos/photo14.jpg",
    caption: "",
    rotation: "5deg"
  },

  {
    image: "photos/photo15.jpg",
    caption: "",
    rotation: "-2deg"
  },

  {
    image: "photos/photo16.jpg",
    caption: "",
    rotation: "3deg"
  },

  {
    image: "photos/photo17.jpg",
    caption: "",
    rotation: "-4deg"
  },

  {
    image: "photos/photo18.jpg",
    caption: "",
    rotation: "2deg"
  },

  {
    image: "photos/photo19.jpg",
    caption: "",
    rotation: "-3deg"
  },

  {
    image: "photos/photo20.jpg",
    caption: "",
    rotation: "4deg"
  },

  {
    image: "photos/photo21.jpg",
    caption: "",
    rotation: "-2deg"
  },

  {
    image: "photos/photo22.jpg",
    caption: "",
    rotation: "3deg"
  },

  {
    image: "photos/photo23.jpg",
    caption: "",
    rotation: "-5deg"
  },

  {
    image: "photos/photo24.jpg",
    caption: "",
    rotation: "2deg"
  },

  {
    image: "photos/photo25.jpg",
    caption: "",
    rotation: "-3deg"
  },

  {
    image: "photos/photo26.jpg",
    caption: "",
    rotation: "4deg"
  },

  {
    image: "photos/photo27.jpg",
    caption: "",
    rotation: "-2deg"
  },

  {
    image: "photos/photo28.jpg",
    caption: "",
    rotation: "3deg"
  },

  {
    image: "photos/photo29.jpg",
    caption: "",
    rotation: "-4deg"
  },

  {
    image: "photos/photo30.jpg",
    caption: "",
    rotation: "2deg"
  }

];


/* =====================================
   10 ВОПРОСОВ
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
   ГАЛЕРЕЯ
===================================== */

function createPolaroid(photo) {

  const polaroid =
    document.createElement("article");

  polaroid.className =
    "polaroid";

  polaroid.style.setProperty(
    "--rotation",
    photo.rotation
  );


  polaroid.innerHTML = `

    <img
      class="polaroid-image"
      src="${photo.image}"
      alt="${photo.caption}"
    >

    <p class="polaroid-caption">
      ${photo.caption}
    </p>

  `;


  return polaroid;

}


/* Первые 15 */

PHOTOS
  .slice(0, 15)
  .forEach((photo) => {

    gallery1.appendChild(
      createPolaroid(photo)
    );

  });


/* Вторые 15 */

PHOTOS
  .slice(15, 30)
  .forEach((photo) => {

    gallery2.appendChild(
      createPolaroid(photo)
    );

  });


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


closeLetterBtn.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    envelope.classList.remove("open");

  }
);


/* =====================================
   ПЕРЕХОДЫ
===================================== */

continueBtn.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    intro.style.display = "none";

    memoriesSection1.classList.add(
      "show"
    );

  }
);


backToLetterBtn.addEventListener(
  "click",
  () => {

    memoriesSection1.classList.remove(
      "show"
    );

    intro.style.display =
      "flex";

  }
);


photosPage2Btn.addEventListener(
  "click",
  () => {

    memoriesSection1.classList.remove(
      "show"
    );

    memoriesSection2.classList.add(
      "show"
    );

  }
);


photosPage1Btn.addEventListener(
  "click",
  () => {

    memoriesSection2.classList.remove(
      "show"
    );

    memoriesSection1.classList.add(
      "show"
    );

  }
);


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

  }
);


/* =====================================
   ВОПРОСЫ
===================================== */

let currentQuestion = 0;

const answers = new Array(
  QUESTIONS.length
).fill("");


function showQuestion() {

  questionCounter.textContent =
    `Вопрос ${currentQuestion + 1} из ${QUESTIONS.length}`;


  questionText.textContent =
    QUESTIONS[currentQuestion];


  answerInput.value =
    answers[currentQuestion];


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

  } else {

    nextQuestionBtn.textContent =
      "Далее →";

  }

}


/* Сохраняем текущий ответ */

answerInput.addEventListener(
  "input",
  () => {

    answers[currentQuestion] =
      answerInput.value;

  }
);


/* Назад */

previousQuestionBtn.addEventListener(
  "click",
  () => {

    if (currentQuestion > 0) {

      currentQuestion--;

      showQuestion();

    }

  }
);


/* Далее */

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

    } else {

      questionsSection.classList.remove(
        "show"
      );

      finalSection.classList.add(
        "show"
      );

    }

  }
);


/* =====================================
   ФИНАЛ
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
