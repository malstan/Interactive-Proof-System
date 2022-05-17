// handling tabs

// show tutorial
document.getElementById("tutorial").style.display = "block";
document.getElementById("tutorial").style.opacity = "1";
document.querySelector("*[data-tab='tutorial']").classList.add("activeTab");

// listener for clicks on tabs
document.querySelectorAll(".tabs-js li").forEach((item) => {
  item.addEventListener("click", (event) => {
    // hide tab
    const activeTab = document.querySelector(".activeTab");
    activeTab.classList.remove("activeTab");

    // fade out tab content
    FX.fadeOut(document.getElementById(activeTab.getAttribute("data-tab")), {
      duration: 100,
      complete: () => {
        // hide tab content
        document.getElementById(
          activeTab.getAttribute("data-tab")
        ).style.display = "none";
        // show new tab
        item.classList.add("activeTab");
        // show new tab content
        document.getElementById(item.getAttribute("data-tab")).style.display =
          "block";
        // fade in tab content
        FX.fadeIn(document.getElementById(item.getAttribute("data-tab")), {
          duration: 100,
          complete: () => {},
        });
      },
    });
  });
});

const FX = {
  // easing
  swing: (progress) => 0.5 - Math.cos(progress * Math.PI) / 2,

  animate: (options) => {
    const start = new Date();
    const id = setInterval(() => {
      const timePassed = new Date() - start;
      let progress = timePassed / options.duration;
      if (progress > 1) progress = 1;
      options.progress = progress;
      options.step(options.delta());
      if (progress == 1) {
        clearInterval(id);
        options.complete();
      }
    }, options.delay || 10);
  },

  fadeOut: function (element, options) {
    const to = 1;
    this.animate({
      duration: options.duration,
      delta: function () {
        return FX.swing(this.progress);
      },
      complete: options.complete,
      step: (delta) => (element.style.opacity = to - delta),
    });
  },

  fadeIn: function (element, options) {
    const to = 0;
    this.animate({
      duration: options.duration,
      delta: function () {
        return FX.swing(this.progress);
      },
      complete: options.complete,
      step: (delta) => (element.style.opacity = to + delta),
    });
  },
};
