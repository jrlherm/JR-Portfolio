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
    });
  });
});

function resetTiltEffect() {
  const tiltElements = document.querySelectorAll(".vanilla-tilt");
  tiltElements.forEach(function (element) {
    if (element.vanillaTilt) {
      element.vanillaTilt.destroy();
    }

    VanillaTilt.init(element, {
      max: element.getAttribute("data-tilt-max") || 20,
      speed: element.getAttribute("data-tilt-speed") || 400,
    });
  });
}
barba.hooks.enter(() => {
  resetTiltEffect();
});

// CUSTOM CURSOR
const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;"
  );
});

document.addEventListener("click", () => {
  cursor.classList.add("expand");

  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

document.addEventListener("mousemove", (e) => {
  cursorDot.setAttribute(
    "style",
    "top: " + e.pageY + "px; left: " + e.pageX + "px;"
  );
});

function hideCursor() {
  cursor.style.display = "none";
  cursorDot.style.display = "none";
}
function showCursor() {
  cursor.style.display = "block";
  cursorDot.style.display = "block";
}
document.addEventListener("mousemove", () => {
  showCursor();
});
document.addEventListener("mouseleave", () => {
  hideCursor();
});
document.addEventListener("mouseenter", () => {
  showCursor();
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
