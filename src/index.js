import anime from "../animejs/lib/anime.es.js";

function fitElementToParent(el, padding) {
  var timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, { scale: 1 });
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
  }
  resize();
  window.addEventListener("resize", resize);
}

var sphereAnimation = (function () {
  var sphereEl = document.querySelector(".sphere-animation");
  var spherePathEls = sphereEl.querySelectorAll(".sphere path");
  var pathLength = spherePathEls.length;
  var hasStarted = false;
  var aimations = [];

  fitElementToParent(sphereEl);

  var breathAnimation = anime({
    begin: function () {
      for (var i = 0; i < pathLength; i++) {
        aimations.push(
          anime({
            targets: spherePathEls[i],
            stroke: { value: ["#443ba4", "#75f0bf"], duration: 500 },
            strokeWidth: "1px",
            translateX: [2, -4],
            translateY: [2, -4],
            easing: "easeOutQuad",
            autoplay: false,
          })
        );
      }
    },
    update: function (ins) {
      aimations.forEach(function (animation, i) {
        var percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false,
  });

  var introAnimation = anime
    .timeline({
      autoplay: false,
    })
    .add(
      {
        targets: spherePathEls,
        strokeDashoffset: {
          value: [anime.setDashoffset, 0],
          duration: 3900,
          easing: "easeInOutCirc",
          delay: anime.stagger(190, { direction: "reverse" }),
        },
        duration: 2000,
        delay: anime.stagger(60, { direction: "reverse" }),
        easing: "linear",
      },
      0
    );

  var shadowAnimation = anime(
    {
      targets: "#sphereGradient",
      x1: "25%",
      x2: "25%",
      y1: "0%",
      y2: "75%",
      duration: 50000,
      easing: "easeOutQuint",
      autoplay: false,
    },
    0
  );

  function init() {
    introAnimation.play();
    breathAnimation.play();
    shadowAnimation.play();
  }

  init();
})();

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".link");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      const checkbox = document.getElementById("navi-toggle");
      checkbox.checked = false; // Imposta il checkbox su "unchecked" dopo il clic sul link
    });
  });
});