console.log("SCRIPT.JS ЗАГРУЖЕН");

const envelope = document.getElementById("envelope");
const intro = document.getElementById("intro");
const continueBtn = document.getElementById("continueBtn");

const memoriesSection = document.getElementById("memoriesSection");
const polaroidGallery = document.getElementById("polaroidGallery");

console.log("Конверт:", envelope);

if (envelope) {
  envelope.addEventListener("click", function () {
    console.log("КОНВЕРТ НАЖАТ");

    envelope.classList.add("open");

    const hint = document.querySelector(".hint");

    if (hint) {
      hint.style.opacity = "0";
    }
  });
}


if (continueBtn) {
  continueBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    if (intro) {
      intro.style.display = "none";
    }

    if (memoriesSection) {
      memoriesSection.classList.add("show");
    }

  });
}


const PHOTOS = [
  {
    image: "photos/photo_2024-05-16_16-29-51.jpg",
    caption: "Первый момент",
    rotation: "-4deg"
  }
];


if (polaroidGallery) {

  PHOTOS.forEach(function (photo) {

    const polaroid = document.createElement("article");

    polaroid.className = "polaroid";

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

    polaroidGallery.appendChild(polaroid);

  });

}
