/* =====================================
   GOOGLE SHEETS
===================================== */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTnBP_TMV3b14BQB_LyIrgfVz51mFGXRtxZRsJpBFht3QkUt8PRX5-H5vDALPFpYbBcg/exec";

/* =====================================
   ФОТОГРАФИИ
===================================== */
const PHOTOS = [
  { image: "photos/photo_2024-05-16_16-29-51.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2024-05-16_16-29-58 (2).jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2024-05-16_16-29-58.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2024-05-16_16-29-59.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2024-06-09_03-10-51.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2025-03-14_10-29-28.jpg", caption: "️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2025-03-18_21-06-29.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-06-06_02-42-53.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-06-20_15-24-08.jpg", caption: "️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-06-23_23-10-16 (2).jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-06-23_23-10-16 (3).jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-06-23_23-10-16 (4).jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-06-23_23-10-16.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-06-23_23-10-17.jpg", caption: "️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-06-27_10-36-58 (2).jpg", caption: "️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-06-27_10-36-58.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-07-01_23-29-46.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-07-05_20-13-23.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-07-12_21-01-18.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-07-13_23-09-25.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-07-16_22-02-21.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-07-18_21-08-59.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-07-23_18-28-26.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-08-03_22-42-54.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-08-04_21-09-54.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-08-10_16-33-48.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-08-13_19-41-34.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-08-15_13-33-51.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-08-22_21-30-13.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" },
  { image: "photos/photo_2026-08-28_20-07-15.jpg", caption: "✏️ НАПИШИТЕ ЗДЕСЬ ПОДПИСЬ К ФОТО" }
];

/* =====================================
   ВОПРОСЫ
===================================== */
const QUESTIONS = [
  "Вставь ссылку на фото — какой момент с нами ты бы сохранила навсегда?",
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
const letter = document.querySelector(".letter");
const intro = document.getElementById("intro");
const continueBtn = document.getElementById("continueBtn");
const closeLetterBtn = document.getElementById("closeLetterBtn");

const memoriesSection1 = document.getElementById("memoriesSection1");
const memoriesSection2 = document.getElementById("memoriesSection2");
const gallery1 = document.getElementById("polaroidGallery1");
const gallery2 = document.getElementById("polaroidGallery2");
const backToLetterBtn = document.getElementById("backToLetterBtn");
const photosPage2Btn = document.getElementById("photosPage2Btn");
const photosPage1Btn = document.getElementById("photosPage1Btn");
const questionsStartBtn = document.getElementById("questionsStartBtn");

const questionsSection = document.getElementById("questionsSection");
const questionCounter = document.getElementById("questionCounter");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const previousQuestionBtn = document.getElementById("previousQuestionBtn");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");

const finalSection = document.getElementById("finalSection");
const finalBackBtn = document.getElementById("finalBackBtn");
const backToPhotosFromQuestions = document.getElementById("backToPhotosFromQuestions");
const finalPhotosBtn = document.getElementById("finalPhotosBtn");

const photoModal = document.getElementById("photoModal");
const photoModalOverlay = document.getElementById("photoModalOverlay");
const photoModalClose = document.getElementById("photoModalClose");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");

/* =====================================
   НАВИГАЦИЯ ПО СТРАНИЦАМ
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
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =====================================
   ГАЛЕРЕИ И ФОТО
===================================== */
function createGalleries() {
  gallery1.innerHTML = "";
  gallery2.innerHTML = "";

  PHOTOS.slice(0, 15).forEach((photo, index) => {
    gallery1.appendChild(createPolaroid(photo, index));
  });

  PHOTOS.slice(15, 30).forEach((photo, index) => {
    gallery2.appendChild(createPolaroid(photo, index + 15));
  });
}

function createPolaroid(photo, index) {
  const rotations = ["-4deg", "3deg", "-2deg", "5deg", "-3deg", "2deg"];
  const polaroid = document.createElement("article");
  polaroid.className = "polaroid";
  polaroid.style.setProperty("--rotation", rotations[index % rotations.length]);
  
  polaroid.innerHTML = `
    <img class="polaroid-image" src="${photo.image}" alt="Воспоминание" loading="lazy">
    <p class="polaroid-caption">${photo.caption}</p>
  `;
  
  polaroid.addEventListener("click", () => {
    openPhotoModal(photo.image, photo.caption);
  });
  
  return polaroid;
}

function openPhotoModal(imageUrl, caption) {
  modalImage.src = imageUrl;
  modalCaption.textContent = caption;
  photoModal.classList.add("show");
}

function closePhotoModal() {
  photoModal.classList.remove("show");
  modalImage.src = "";
}

photoModalClose.addEventListener("click", closePhotoModal);
photoModalOverlay.addEventListener("click", closePhotoModal);

/* =====================================
   АНИМАЦИЯ КОНВЕРТА
===================================== */
envelope.addEventListener("click", () => {
  if (envelope.classList.contains("open")) return;

  const rect = envelope.getBoundingClientRect();
  letter.style.position = "fixed";
  letter.style.top = `${rect.top + 15}px`;
  letter.style.left = `${rect.left + (rect.width * 0.075)}px`;
  letter.style.width = `${rect.width * 0.85}px`;
  letter.style.height = `${rect.height * 0.75}px`;
  letter.style.transform = "none";
  letter.style.opacity = "1";
  letter.style.zIndex = "2";
  letter.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
  letter.style.pointerEvents = "none";

  letter.offsetHeight;
  envelope.classList.add("open");

  setTimeout(() => {
    letter.style.top = "50%";
    letter.style.left = "50%";
    letter.style.width = "min(800px, 90vw)";
    letter.style.height = "auto";
    letter.style.maxHeight = "85vh";
    letter.style.transform = "translate(-50%, -50%)";
    letter.style.zIndex = "100";
    letter.style.pointerEvents = "auto";
  }, 150);
});

closeLetterBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  const rect = envelope.getBoundingClientRect();
  letter.style.top = `${rect.top + 15}px`;
  letter.style.left = `${rect.left + (rect.width * 0.075)}px`;
  letter.style.width = `${rect.width * 0.85}px`;
  letter.style.height = `${rect.height * 0.75}px`;
  letter.style.transform = "none";
  letter.style.zIndex = "2";
  letter.style.pointerEvents = "none";

  setTimeout(() => {
    envelope.classList.remove("open");
    letter.style.opacity = "0";
    setTimeout(() => { letter.style = ""; }, 800);
  }, 100);
});

/* =====================================
   КНОПКИ НАВИГАЦИИ
===================================== */
continueBtn.addEventListener("click", (e) => { e.preventDefault(); goToSection(memoriesSection1); });
backToLetterBtn.addEventListener("click", () => { goToSection(intro); });
photosPage2Btn.addEventListener("click", () => { goToSection(memoriesSection2); });
photosPage1Btn.addEventListener("click", () => { goToSection(memoriesSection1); });
questionsStartBtn.addEventListener("click", () => { goToSection(questionsSection); showQuestion(); });
backToPhotosFromQuestions.addEventListener("click", () => { goToSection(memoriesSection2); });
finalBackBtn.addEventListener("click", () => { currentQuestion = QUESTIONS.length - 1; goToSection(questionsSection); showQuestion(); });
finalPhotosBtn.addEventListener("click", () => { goToSection(memoriesSection2); });

/* =====================================
   ЛОГИКА ВОПРОСОВ
===================================== */
let currentQuestion = 0;
const answers = new Array(QUESTIONS.length).fill("");

function showQuestion() {
  questionCounter.textContent = `Вопрос ${currentQuestion + 1} из ${QUESTIONS.length}`;
  questionText.textContent = QUESTIONS[currentQuestion];
  
  // Все вопросы теперь текстовые (включая первый!)
  answerInput.style.display = "block";
  answerInput.value = answers[currentQuestion];
  answerInput.placeholder = currentQuestion === 0 
    ? "Вставь сюда ссылку на фотографию (например, из ВКонтакте или Telegram)..." 
    : "Напиши здесь то, что думаешь...";
  
  previousQuestionBtn.style.visibility = currentQuestion === 0 ? "hidden" : "visible";
  nextQuestionBtn.textContent = currentQuestion === QUESTIONS.length - 1 ? "Закончить →" : "Далее →";
}

answerInput.addEventListener("input", () => {
  answers[currentQuestion] = answerInput.value;
});

previousQuestionBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});

nextQuestionBtn.addEventListener("click", () => {
  answers[currentQuestion] = answerInput.value;
  
  if (currentQuestion < QUESTIONS.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    sendAnswersToGoogleSheets();
  }
});

/* =====================================
   ОТПРАВКА В GOOGLE ТАБЛИЦУ
===================================== */
async function sendAnswersToGoogleSheets() {
  nextQuestionBtn.disabled = true;
  nextQuestionBtn.textContent = "Сохраняем...";

  const data = {
    answers: answers,
    submittedAt: new Date().toLocaleString("ru-RU")
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });
    goToSection(finalSection);
  } catch (error) {
    console.error("Ошибка отправки:", error);
    alert("Не удалось отправить ответы. Попробуй ещё раз.");
    nextQuestionBtn.disabled = false;
    nextQuestionBtn.textContent = "Закончить →";
  }
}

/* =====================================
   ЗАПУСК
===================================== */
createGalleries();
