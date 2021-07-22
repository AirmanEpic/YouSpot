mpos = {x: 0, y: 0};
const ctx = {};

/** main function, executes click event bindings and so forth. */
function main() {
  // This POST is run on execution - It records the response given by the server, if any.
  const query = 'hello';
  const type = 'track';
  const market = 'US';
  const limit = '1';

  $.ajax({
    url: 'https://ndwr1ks2f9.execute-api.us-east-2.amazonaws.com/default/YouSpot',
    dataType: 'json',
    type: 'post',
    data: {
      endpoint: 'findSong',
      query: query,
      type: type,
      market: market,
      limit: limit,
    },
    headers: {
      'x-api-key': 'GgmDMVSvcm5XpGCbHsZHhXwzQT6DYyS5S9SXrw39',
      'content-type': 'application/json',
    },
    success: function(data) {
      console.log('Success!');
      console.log(data);
    },
    error: function(data) {
      console.log('Error!');
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
