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


const finalPhotosBtn =
  document.getElementById("finalPhotosBtn");


const photoModal =
  document.getElementById("photoModal");


const photoModalBackdrop =
  document.getElementById("photoModalBackdrop");


const photoModalClose =
  document.getElementById("photoModalClose");


const modalImage =
  document.getElementById("modalImage");


const modalCaption =
  document.getElementById("modalCaption");


/* =====================================
   ЗАГРУЗКА ФОТОГРАФИЙ
===================================== */

async function loadPhotos() {

  const apiUrl =
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/contents/${PHOTOS_FOLDER}`;


  gallery1.innerHTML =
    "<p>Загружаю фотографии...</p>";


  gallery2.innerHTML =
    "";


  try {

    const response =
      await fetch(
        apiUrl,
        {
          cache:
            "no-store"
        }
      );


    if (!response.ok) {

      throw new Error(
        `Ошибка загрузки: ${response.status}`
      );

    }


    const files =
      await response.json();


    const images =
      files
        .filter(
          (file) => {

            return (

              file.type === "file" &&

              /\.(jpg|jpeg|png|webp|gif)$/i.test(
                file.name
              )

            );

          }
        )
        .sort(
          (a, b) => {

            return a.name.localeCompare(
              b.name,
              undefined,
              {
                numeric: true,
                sensitivity: "base"
              }
            );

          }
        );


    gallery1.innerHTML =
      "";


    gallery2.innerHTML =
      "";


    if (
      images.length === 0
    ) {

      gallery1.innerHTML =
        "<p>Фотографии пока не найдены.</p>";

      return;

    }


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
              photo.name,
              index
            )

          );

        }
      );


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

          gallery2.appendChild(

            createPolaroid(
              photo.download_url,
              photo.name,
              index + 15
            )

          );

        }
      );


    if (
      images.length <= 15
    ) {

      gallery2.innerHTML =
        "<p>Здесь больше нет фотографий.</p>";

    }

  }

  catch (error) {

    console.error(
      error
    );


    gallery1.innerHTML =
      `
      <p>
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
  fileName,
  index
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


  const image =
    document.createElement(
      "img"
    );


  image.className =
    "polaroid-image";


  image.src =
    imageUrl;


  image.alt =
    `Воспоминание ${index + 1}`;


  image.loading =
    "lazy";


  const caption =
    document.createElement(
      "p"
    );


  caption.className =
    "polaroid-caption";


  caption.textContent =
    `Воспоминание ${index + 1}`;


  polaroid.appendChild(
    image
  );


  polaroid.appendChild(
    caption
  );


  polaroid.addEventListener(
    "click",
    () => {

      openPhoto(

        imageUrl,

        `Воспоминание ${index + 1}`

      );

    }
  );


  return polaroid;

}


/* =====================================
   ОТКРЫТИЕ ФОТО
===================================== */

function openPhoto(
  imageUrl,
  caption
) {

  modalImage.src =
    imageUrl;


  modalCaption.textContent =
    caption;


  photoModal.classList.add(
    "show"
  );


  document.body.style.overflow =
    "hidden";

}


/* =====================================
   ЗАКРЫТИЕ ФОТО
===================================== */

function closePhoto() {

  photoModal.classList.remove(
    "show"
  );


  document.body.style.overflow =
    "";

}


photoModalClose.addEventListener(
  "click",
  closePhoto
);


photoModalBackdrop.addEventListener(
  "click",
  closePhoto
);


document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closePhoto();

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
   ПИСЬМО → ФОТО
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
   ФИНАЛ → ФОТОГРАФИИ
===================================== */

finalPhotosBtn.addEventListener(
  "click",
  () => {

    finalSection.classList.remove(
      "show"
    );


    questionsSection.classList.remove(
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
   ЗАПУСК
===================================== */

loadPhotos();
