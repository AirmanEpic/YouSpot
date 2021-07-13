mpos = { x: 0, y: 0 };
const ctx = {};

function main() {
}

window.onresize = function (event) {
  resizeDiv();
};

/** executes when the window is resized. use for responsiveness */
const resizeDiv = function () {
  vpw = $(window).width();
  vph = $(window).height();

  const m = detectmob();
};

$(document).ready(resizeDiv);
$(document).ready(main);
