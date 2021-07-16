// this is the code that "Runs" the extension.
// This is seperate from the code that runs the UI inside the extension.
const deliberatelybroke = true;

const videoTags = $('meta[name=\'keywords\']').attr('content').toLowerCase();
const videoTitle = $('meta[name=\'title\']').attr('content').toLowerCase();
const videoDesc = $('meta[name=\'description\']').attr('content').toLowerCase();
let isMusic;

for (let i = 0; i < 3; i++) {
  switch (i) {
    case 0:
      if (videoTags.split('music').length!=1) {
        isMusic = true; i = 3;
      }
      break;
    case 1:
      if (videoTitle.split('music').length!=1) {
        isMusic = true; i = 3;
      }
      break;
    case 2:
      if (videoDesc.split('music').length!=1) {
        isMusic = true;
      } else {
        isMusic = false;
      };
      break;
  }
}
console.log('is music = ' + isMusic);
