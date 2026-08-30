/* =========================================
ФОТОГРАФИИ
========================================= */

const PHOTOS = [
  {
    image: "photos/photo_2024-05-16_16-29-51.jpg",
    caption: "Первый момент",
    rotation: "-4deg"
  },
  {
    image: "photos/photo2.jpg",
    caption: "Немного воспоминаний",
    rotation: "3deg"
  },
  {
    image: "photos/photo3.jpg",
    caption: "Этот момент мне нравится",
    rotation: "-2deg"
  },
  {
    image: "photos/photo4.jpg",
    caption: "И ещё один",
    rotation: "5deg"
  }
];


/* =========================================
ПОЛУЧАЕМ ЭЛЕМЕНТЫ СТРАНИЦЫ
========================================= */

const envelope = document.getElementById("envelope");

const intro = document.getElementById("intro");

const memoriesSection =
  document.getElementById("memoriesSection");

const placeholderSection =
  document.getElementById("placeholderSection");

const polaroidGallery =
  document.getElementById("polaroidGallery");

const continueBtn =
  document.getElementById("continueBtn");

const memoriesNextBtn =
  document.getElementById("memoriesNextBtn");

const backBtn =
  document.getElementById("backBtn");


/* =========================================
СОЗДАНИЕ ГАЛЕРЕИ POLAROID
========================================= */

function createGallery() {

  polaroidGallery.innerHTML = "";

  PHOTOS.forEach((photo) => {

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

    polaroidGallery.appendChild(
      polaroid
    );

  });

}


/* Создаём фотографии */

createGallery();


/* =========================================
ОТКРЫТИЕ КОНВЕРТА
========================================= */

let isOpen = false;

envelope.addEventListener(
  "click",
  () => {

    if (isOpen) return;

    isOpen = true;

    envelope.classList.add("open");

    const hint =
      document.querySelector(".hint");

    if (hint) {
      hint.style.opacity = "0";
    }

  }
);


/* =========================================
ПЕРЕХОД К ФОТОГРАФИЯМ
========================================= */

continueBtn.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    intro.classList.add("hide");

    setTimeout(
      () => {

        memoriesSection.classList.add(
          "show"
        );

      },
      450
    );

  }
);


/* =========================================
ПЕРЕХОД ДАЛЬШЕ
========================================= */

memoriesNextBtn.addEventListener(
  "click",
  () => {

    memoriesSection.classList.remove(
      "show"
    );

    setTimeout(
      () => {

        placeholderSection.classList.add(
          "show"
        );

      },
      450
    );

  }
);


/* =========================================
ВОЗВРАТ К ПИСЬМУ
========================================= */

backBtn.addEventListener(
  "click",
  () => {

    memoriesSection.classList.remove(
      "show"
    );

    intro.classList.remove(
      "hide"
    );

  }
);
