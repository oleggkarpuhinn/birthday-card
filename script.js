/* =========================================
ФОТОГРАФИИ

Здесь меняются фотографии и подписи.

image:
путь к фотографии на GitHub

caption:
текст под фотографией

rotation:
небольшой наклон фотографии
========================================= */

const PHOTOS = [

{
image: "photos/photo1.jpg",
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

const envelope =
document.getElementById("envelope");

const intro =
document.getElementById("intro");

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

/* Очищаем галерею */

polaroidGallery.innerHTML = "";

/* Перебираем все фотографии */

PHOTOS.forEach((photo) => {

```
/* Создаём карточку */

const polaroid =
  document.createElement("article");


/* Добавляем CSS-класс */

polaroid.className =
  "polaroid";


/* Передаём угол поворота */

polaroid.style.setProperty(
  "--rotation",
  photo.rotation
);


/* Добавляем фотографию и подпись */

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


/* Добавляем фотографию на страницу */

polaroidGallery.appendChild(
  polaroid
);
```

});

}

/* Создаём фотографии сразу */

createGallery();

/* =========================================
ОТКРЫТИЕ КОНВЕРТА
========================================= */

let isOpen = false;

envelope.addEventListener(
"click",
() => {

```
if (isOpen) return;


isOpen = true;


/* Открываем конверт */

envelope.classList.add(
  "open"
);


/* Убираем подсказку */

document.querySelector(".hint")
  .style.opacity = "0";
```

}
);

/* =========================================
ПЕРЕХОД К ФОТОГРАФИЯМ
========================================= */

continueBtn.addEventListener(
"click",
(event) => {

```
/* Чтобы клик не закрыл/не открыл конверт */

event.stopPropagation();


/* Скрываем первый экран */

intro.classList.add(
  "hide"
);


/* Показываем фотографии */

setTimeout(
  () => {

    memoriesSection.classList.add(
      "show"
    );

  },
  450
);
```

}
);

/* =========================================
ПЕРЕХОД ДАЛЬШЕ

Пока показывает временную страницу
========================================= */

memoriesNextBtn.addEventListener(
"click",
() => {

```
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
```

}
);

/* =========================================
ВОЗВРАТ К ПИСЬМУ
========================================= */

backBtn.addEventListener(
"click",
() => {

```
/* Убираем фотографии */

memoriesSection.classList.remove(
  "show"
);


/* Возвращаем первый экран */

intro.classList.remove(
  "hide"
);
```

}
);
