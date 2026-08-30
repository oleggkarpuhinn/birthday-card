/* =====================================
   НАСТРОЙКИ GITHUB
===================================== */

/*
  ВАЖНО:

  На случай различий в написании username
  пробуем оба варианта.

  Рабочий репозиторий будет найден автоматически.
*/

const GITHUB_REPOSITORIES = [

  {
    owner: "oleggkarpuhinn",
    repository: "birthday-card"
  },

  {
    owner: "olegkarpukhin",
    repository: "birthday-card"
  }

];


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
   КОЛИЧЕСТВО ФОТО НА СТРАНИЦЕ
===================================== */

const PHOTOS_PER_PAGE = 15;


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
   ЗАГРУЗКА ВСЕХ ФОТОГРАФИЙ ИЗ GITHUB
===================================== */

async function loadPhotos() {


  /*
    Очищаем галереи
  */

  gallery1.innerHTML = "";

  gallery2.innerHTML = "";


  let images = null;


  /*
    Пробуем найти репозиторий
  */

  for (

    const github of
    GITHUB_REPOSITORIES

  ) {


    const apiUrl =

      `https://api.github.com/repos/${github.owner}/${github.repository}/contents/${PHOTOS_FOLDER}?ref=main`;


    try {


      const response =
        await fetch(

          apiUrl,

          {
            cache: "no-store"
          }

        );


      if (

        !response.ok

      ) {

        continue;

      }


      const files =
        await response.json();


      if (

        Array.isArray(files)

      ) {


        images =

          files.filter(

            file =>

              file.type === "file" &&

              /\.(jpg|jpeg|png|webp|gif)$/i.test(
                file.name
              )

          );


        if (

          images.length > 0

        ) {

          console.log(

            "Фотографии найдены:",

            images.length,

            github.owner

          );


          break;

        }

      }

    }

    catch (

      error

    ) {

      console.error(

        "Ошибка загрузки:",

        error

      );

    }

  }


  /*
    Если фотографии не найдены
  */

  if (

    !images ||

    images.length === 0

  ) {


    gallery1.innerHTML = `

      <p class="photo-error">

        Не удалось загрузить фотографии.

      </p>

    `;


    return;

  }


  /*
    Сортировка файлов.

    Важно:
    natural sort корректно сортирует
    числа в названиях файлов.
  */

  images.sort(

    (
      first,
      second
    ) =>

      first.name.localeCompare(

        second.name,

        "ru",

        {
          numeric: true,
          sensitivity: "base"
        }

      )

  );


  /*
    ПЕРВЫЕ 15 ФОТО
  */

  const firstPage =

    images.slice(

      0,

      PHOTOS_PER_PAGE

    );


  firstPage.forEach(

    (
      photo,
      index
    ) => {


      gallery1.appendChild(

        createPolaroid(

          photo.download_url,

          index

        )

      );

    }

  );


  /*
    ВСЕ ОСТАЛЬНЫЕ ФОТО

    То есть если фотографий больше 30,
    они тоже будут добавлены.

    Все фотографии после первых 15
    попадут на вторую страницу.
  */

  const secondPage =

    images.slice(

      PHOTOS_PER_PAGE

    );


  secondPage.forEach(

    (
      photo,
      index
    ) => {


      gallery2.appendChild(

        createPolaroid(

          photo.download_url,

          index + PHOTOS_PER_PAGE

        )

      );

    }

  );


  /*
    Если фотографий меньше 16,
    кнопка второй страницы не нужна
  */

  if (

    secondPage.length === 0

  ) {

    photosPage2Btn.style.display =
      "none";

  }

  else {

    photosPage2Btn.style.display =
      "inline-block";

  }


  console.log(

    `Загружено фотографий: ${images.length}`

  );

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

    "2deg",

    "5deg",

    "-5deg"

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


  /*
    ПОДПИСИ.

    Пока оставляем пустыми,
    как ты просил.

    Позже можно будет добавить.
  */

  polaroid.innerHTML = `

    <img
      class="polaroid-image"
      src="${imageUrl}"
      alt="Воспоминание"
      loading="lazy"
    >

    <p
      class="polaroid-caption"
    ></p>

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


    currentQuestion =
      0;


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


  /*
    На первом вопросе
    можно вернуться к фотографиям.
  */

  if (

    currentQuestion === 0

  ) {


    previousQuestionBtn.style.visibility =
      "visible";


    previousQuestionBtn.textContent =
      "← К фотографиям";

  }

  else {


    previousQuestionBtn.style.visibility =
      "visible";


    previousQuestionBtn.textContent =
      "← Назад";

  }


  /*
    Последняя кнопка
  */

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
   НАЗАД
===================================== */

previousQuestionBtn.addEventListener(

  "click",

  () => {


    /*
      Если первый вопрос —
      возвращаемся к фотографиям
    */

    if (

      currentQuestion === 0

    ) {


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


      return;

    }


    /*
      Предыдущий вопрос
    */

    currentQuestion--;


    showQuestion();

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
   ФИНАЛ → НАЗАД
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
