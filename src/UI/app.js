mpos = {x: 0, y: 0};
const ctx = {};

/** main function, executes click event bindings and so forth. */
function main() {
  $('.content').text('Hey JBax, change this to search for Rick Astley');
}

/** executes the resizediv function when the window is resized */
window.onresize = function(event) {
  resizeDiv();
};

/** executes when the window is resized. use for responsiveness */
const resizeDiv = function() {
  vpw = $(window).width();
  vph = $(window).height();
};

$(document).ready(resizeDiv);
$(document).ready(main);
