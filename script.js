// BURGER MENU
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const menuItems = document.querySelectorAll(".menu-items a");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuToggle.checked = false; // Uncheck the checkbox
    });
  });
});

// TILT EFFECT
document.addEventListener("DOMContentLoaded", function () {
  const tiltElements = document.querySelectorAll(".vanilla-tilt");

  tiltElements.forEach(function (element) {
    VanillaTilt.init(element, {
      max: element.getAttribute("data-tilt-max") || 20,
      speed: element.getAttribute("data-tilt-speed") || 400,
      // Other options
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Sélectionnez l'élément avec la classe "parallax-element"
  const parallaxElement = document.querySelector(".parallax-element");

  // Initialisez l'élément avec Vanilla Tilt
  VanillaTilt.init(parallaxElement, {
    max: 0, // Ajustez la valeur en fonction de l'effet souhaité
    speed: 0, // Ajustez la valeur en fonction de la vitesse de l'effet
  });

  // Ajoutez un gestionnaire d'événements pour suivre les mouvements de la souris
  parallaxElement.addEventListener("tiltChange", function (event) {
    const { tiltX, tiltY } = event.detail;

    // Mettez à jour la transformation du numéro de projet en fonction des valeurs de tiltX et tiltY
    parallaxElement.style.transform = `translateZ(50px) translateX(${tiltX}px) translateY(${tiltY}px)`;
  });
});

// LOADER
const loader = document.querySelector(".loader");

// reset position of the loading screen
gsap.set(loader, {
  scaleX: 0,
  rotation: 10,
  xPercent: -5,
  yPercent: -50,
  transformOrigin: "left center",
  autoAlpha: 1,
});

barba.init({
  transitions: [
    {
      async leave() {
        await loaderIn();
      },
      enter() {
        loaderAway();
      },
    },
  ],
});

function loaderIn() {
  // GSAP tween to stretch the loading screen across the whole screen
  return gsap.fromTo(
    loader,
    {
      rotation: 10,
      scaleX: 0,
      xPercent: -5,
    },
    {
      duration: 0.8,
      xPercent: 0,
      scaleX: 1,
      rotation: 0,
      ease: "power4.inOut",
      transformOrigin: "left center",
    }
  );
}

function loaderAway() {
  // GSAP tween to hide loading screen
  return gsap.to(loader, {
    duration: 0.8,
    scaleX: 0,
    xPercent: 5,
    rotation: -10,
    transformOrigin: "right center",
    ease: "power4.inOut",
  });
}

// do something before the transition starts
barba.hooks.before(() => {
  document.querySelector("html").classList.add("is-transitioning");
});
// do something after the transition finishes
barba.hooks.after(() => {
  document.querySelector("html").classList.remove("is-transitioning");
});

// scroll to the top of the page
barba.hooks.enter(() => {
  window.scrollTo(0, 0);
});
