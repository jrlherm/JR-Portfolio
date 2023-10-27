// Tilt effect

$(document).on("mousemove", function (e) {
  $(".light").css({
    left: e.pageX - 300,
    top: e.pageY - 300,
  });
});

const element = $(".js-tilt-container");

element.on("mousemove", function (e) {
  const { left, top } = $(this).offset();
  const cursPosX = e.pageX - left;
  const cursPosY = e.pageY - top;
  const cursFromCenterX = $(this).width() / 2 - cursPosX;
  const cursFromCenterY = $(this).height() / 2 - cursPosY;

  $(this).css(
    "transform",
    "perspective(500px) rotateX(" +
      cursFromCenterY / 40 +
      "deg) rotateY(" +
      -(cursFromCenterX / 40) +
      "deg) translateZ(10px)"
  );

  const invertedX =
    Math.sign(cursFromCenterX) > 0
      ? -Math.abs(cursFromCenterX)
      : Math.abs(cursFromCenterX);

  //Parallax transform on image
  $(this)
    .find(".js-perspective-neg")
    .css(
      "transform",
      "translateY(" +
        cursFromCenterY / 10 +
        "px) translateX(" +
        -(invertedX / 10) +
        "px) scale(1.05)"
    );

  $(this).removeClass("leave");
});

element.on("mouseleave", function () {
  $(this).addClass("leave");
});

// Loader
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
