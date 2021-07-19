// this is the code that "Runs" the extension.
// This is seperate from the code that runs the UI inside the extension.
const deliberatelybroke = true;

// Pull Video Tags, Video Title, and Video Description from Youtube meta elements
const videoTags = $('meta[name=\'keywords\']').attr('content').toLowerCase();
const videoTitle = $('meta[name=\'title\']').attr('content').toLowerCase();
const videoDesc = $('meta[name=\'description\']').attr('content').toLowerCase();

/* Check Tags, the title, and the video description for the word "music".
 If any check comes back true, the function returns true, otherwise it returns false. */
function isMusic() {
  if (videoTags.split('music').length!=1) {
    return true;
  };
  if (videoTitle.split('music').length!=1) {
    return true;
  };
  if (videoDesc.split('music').length!=1) {
    return true;
  };
  return false;
};
