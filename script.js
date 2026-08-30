/* =====================================
   НАСТРОЙКИ GITHUB
===================================== */

const GITHUB_OWNER =
  "olegkarpukhin";


const GITHUB_REPOSITORY =
  "birthday-card";


const GITHUB_BRANCH =
  "main";


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


const backToPhotosFromQuestions =
  document.getElementById(
    "backToPhotosFromQuestions"
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
   МОДАЛЬНОЕ ОКНО ФОТО
===================================== */

const photoModal =
  document.getElementById(
    "photoModal"
  );


const photoModalOverlay =
  document.getElementById(
    "photoModalOverlay"
  );


const photoModalClose =
  document.getElementById(
    "photoModalClose"
  );


const modalImage =
  document.getElementById(
    "modalImage"
  );


const modalCaption =
  document.getElementById(
    "modalCaption"
  );


/* =====================================
   ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ
===================================== */

function scrollTop() {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* =====================================
   ЗАГРУЗКА ВСЕХ ФОТО ИЗ GITHUB
===================================== */

async function loadPhotos() {


  const apiUrl =
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/git/trees/${GITHUB_BRANCH}?recursive=1`;


  try {


    gallery1.innerHTML =
      "<p>Загрузка фотографий...</p>";


    gallery2.innerHTML =
      "";


    const response =
      await fetch(
        apiUrl
      );


    if (!response.ok) {

      throw new Error(
        "GitHub API недоступен"
      );

    }


    const data =
      await response.json();


    const images =
      data.tree
        .filter(
          (file) => {

            return (

              file.type === "blob" &&

              file.path.startsWith(
                `${PHOTOS_FOLDER}/`
              ) &&

              /\.(jpg|jpeg|png|webp|gif)$/i.test(
                file.path
              )

            );

          }
        )
        .sort(
          (a, b) =>

            a.path.localeCompare(
              b.path,
              "ru"
            )
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


    images.forEach(
      (
        photo,
        index
      ) => {


        const imageUrl =
          `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/${GITHUB_BRANCH}/${photo.path}`;


        const polaroid =
          createPolaroid(
            imageUrl,
            index,
            photo.path
          );


        if (
          index < 15
        ) {

          gallery1.appendChild(
            polaroid
          );

        }

        else {

          gallery2.appendChild(
            polaroid
          );

        }


      }
    );


    if (
      images.length <= 15
    ) {

      photosPage2Btn.style.display =
        "none";

    }


    if (
      images.length <= 15
    ) {

      photosPage1Btn.style.display =
        "none";

    }


    console.log(
      `Загружено фотографий: ${images.length}`
    );


  }


  catch (
    error
  ) {


    console.error(
      error
    );


    gallery1.innerHTML =
      `
        <p>
          Не удалось загрузить фотографии.
        </p>
      `;


  }


}


/* =====================================
   СОЗДАНИЕ POLAROID
===================================== */

function createPolaroid(
  imageUrl,
  index,
  filePath
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


  const fileName =
    filePath
      .split("/")
      .pop()
      .replace(
        /\.(jpg|jpeg|png|webp|gif)$/i,
        ""
      )
      .replace(
        /[-_]/g,
        " "
      );


  const caption =
    fileName ||
    `Воспоминание ${index + 1}`;


  polaroid.innerHTML = `

    <img
      class="polaroid-image"
      src="${imageUrl}"
      alt="${caption}"
      loading="lazy"
    >

    <p
      class="polaroid-caption"
    >
      ${caption}
    </p>

  `;


  polaroid.addEventListener(

    "click",

    () => {

      openPhotoModal(
        imageUrl,
        caption
      );

    }

  );


  return polaroid;


}


/* =====================================
   ОТКРЫТИЕ ФОТО
===================================== */

function openPhotoModal(
  imageUrl,
  caption
) {


  modalImage.src =
    imageUrl;


  modalImage.alt =
    caption;


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

function closePhotoModal() {


  photoModal.classList.remove(
    "show"
  );


  document.body.style.overflow =
    "";


  setTimeout(
    () => {

      modalImage.src =
        "";

    },
    200
  );


}


photoModalClose.addEventListener(

  "click",

  closePhotoModal

);


photoModalOverlay.addEventListener(

  "click",

  closePhotoModal

);


document.addEventListener(

  "keydown",

  (event) => {

    if (

      event.key === "Escape"

    ) {

      closePhotoModal();

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
   ПЕРЕХОД К ФОТО
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


    scrollTop();


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


    envelope.classList.remove(
      "open"
    );


    intro.classList.remove(
      "letter-open"
    );


    scrollTop();


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


    scrollTop();


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


    scrollTop();


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


    scrollTop();


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


      scrollTop();


    }


  }

);


/* =====================================
   ВОПРОСЫ → ФОТО
===================================== */

backToPhotosFromQuestions.addEventListener(

  "click",

  () => {


    questionsSection.classList.remove(
      "show"
    );


    memoriesSection2.classList.add(
      "show"
    );


    scrollTop();


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


    scrollTop();


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


    scrollTop();


  }

);


/* =====================================
   ЗАПУСК
===================================== */

loadPhotos();
