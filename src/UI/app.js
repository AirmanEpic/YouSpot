mpos = {x: 0, y: 0};
const ctx = {};

/** main function, executes click event bindings and so forth. */
function main() {
  // This POST is run on execution - It records the response given by the server, if any.
  $.ajax({
    url: 'https://ndwr1ks2f9.execute-api.us-east-2.amazonaws.com/default/YouSpot/',
    type: 'post',
    dataType: 'html',
    data: {
      // body stuff here, not needed
    },
    headers: {
      'x-api-key': 'GgmDMVSvcm5XpGCbHsZHhXwzQT6DYyS5S9SXrw39',
    },
    success: function(data) {
      console.log('POST success!');
      console.log(data);
    },
    error: function(data) {
      console.log('POST error!');
      console.log(data);
    },
  });
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
