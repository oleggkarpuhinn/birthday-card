/* =====================================
   НАСТРОЙКИ GITHUB
===================================== */

const GITHUB_OWNER = "olegkarpukhin";
const GITHUB_REPOSITORY = "birthday-card";
const GITHUB_BRANCH = "main";


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


const finalSection =
  document.getElementById("finalSection");

const finalBackBtn =
  document.getElementById("finalBackBtn");


/* =====================================
   ЗАГРУЗКА ВСЕХ ФОТОГРАФИЙ С GITHUB
===================================== */

async function loadPhotos() {

  gallery1.innerHTML =
    "<p class='loading-text'>Загружаю воспоминания...</p>";

  gallery2.innerHTML =
    "<p class='loading-text'>Загружаю воспоминания...</p>";


  try {

    const apiUrl =
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/git/trees/${GITHUB_BRANCH}?recursive=1`;


    const response =
      await fetch(apiUrl);


    if (!response.ok) {

      throw new Error(
        `GitHub вернул ошибку: ${response.status}`
      );

    }


    const data =
      await response.json();


    const images =
      data.tree
        .filter((file) => {

          return (

            file.type === "blob" &&

            file.path.startsWith("photos/") &&

            /\.(jpg|jpeg|png|webp)$/i.test(
              file.path
            )

          );

        })
        .sort((a, b) =>

          a.path.localeCompare(
            b.path,
            undefined,
            {
              numeric: true,
              sensitivity: "base"
            }
          )

        );


    gallery1.innerHTML = "";
    gallery2.innerHTML = "";


    if (images.length === 0) {

      gallery1.innerHTML =
        "<p class='loading-text'>Фотографии пока не найдены.</p>";

      return;

    }


    /* =====================================
       ПЕРВЫЕ 15 ФОТО
    ====================================== */

    images
      .slice(0, 15)
      .forEach(
        (photo, index) => {

          const imageUrl =
            `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/${GITHUB_BRANCH}/${encodeURI(photo.path)}`;


          gallery1.appendChild(

            createPolaroid(
              imageUrl,
              index
            )

          );

        }
      );


    /* =====================================
       СЛЕДУЮЩИЕ 15 ФОТО
    ====================================== */

    images
      .slice(15, 30)
      .forEach(
        (photo, index) => {

          const imageUrl =
            `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/${GITHUB_BRANCH}/${encodeURI(photo.path)}`;


          gallery2.appendChild(

            createPolaroid(
              imageUrl,
              index + 15
            )

          );

        }
      );


    console.log(
      `Найдено фотографий: ${images.length}`
    );


  }

  catch (error) {

    console.error(
      "Ошибка загрузки фотографий:",
      error
    );


    gallery1.innerHTML =
      `
        <p class="loading-text">
          Не удалось загрузить фотографии.
        </p>
      `;


    gallery2.innerHTML =
      "";

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
    "4deg",
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
      alt="Воспоминание ${index + 1}"
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


    intro.classList.add(
      "letter-open"
    );

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


    intro.classList.remove(
      "letter-open"
    );

  }
);


/* =====================================
   ПЕРЕХОД К ФОТО 1
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


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }
);


/* =====================================
   ВОЗВРАТ К ПИСЬМУ
===================================== */

backToLetterBtn.addEventListener(
  "click",
  () => {

    memoriesSection1.classList.remove(
      "show"
    );


    intro.style.display =
      "flex";


    envelope.classList.add(
      "open"
    );


    intro.classList.add(
      "letter-open"
    );


    window.scrollTo({

      top: 0,

      behavior: "smooth"

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

      behavior: "smooth"

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

      behavior: "smooth"

    });

  }
);


/* =====================================
   ПЕРЕХОД К ВОПРОСАМ
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

      behavior: "smooth"

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


answerInput.addEventListener(
  "input",
  () => {

    answers[
      currentQuestion
    ] =

      answerInput.value;

  }
);


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

        behavior: "smooth"

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


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }
);


/* =====================================
   ЗАПУСК
===================================== */

loadPhotos();
