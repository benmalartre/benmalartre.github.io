// fork getUserMedia for multiple browser versions, for those
// that need prefixes

navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

// define other variables

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var myAudio = document.querySelector('audio');
var pre = document.querySelector('pre');
var video = document.querySelector('video');
var myScript = document.querySelector('script');
var range = document.querySelector('input');

// Create variables to store mouse pointer Y coordinate
// and HEIGHT of screen
var CurY;
var HEIGHT = window.innerHeight;

// getUserMedia block - grab stream
// put it into a MediaStreamAudioSourceNode
// also output the visuals into a video element

if (navigator.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.getUserMedia (
      // constraints: audio and video for this app
      {
         audio: true,
         video: true
      },

      // Success callback
      function(stream) {
         video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
         video.onloadedmetadata = function(e) {
            video.play();
            video.muted = 'true';
         };

         // Create a MediaStreamAudioSourceNode
         // Feed the HTMLMediaElement into it
         var source = audioCtx.createMediaStreamSource(stream);

          // Create a biquadfilter
          var biquadFilter = audioCtx.createBiquadFilter();
          biquadFilter.type = "lowshelf";
          biquadFilter.frequency.value = 1000;
          biquadFilter.gain.value = range.value;

          // connect the AudioBufferSourceNode to the gainNode
          // and the gainNode to the destination, so we can play the
          // music and adjust the volume using the mouse cursor
          source.connect(biquadFilter);
          biquadFilter.connect(audioCtx.destination);

          // Get new mouse pointer coordinates when mouse is moved
          // then set new gain value

          range.oninput = function() {
              biquadFilter.gain.value = range.value;
          }

      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}

// dump script to pre element

pre.innerHTML = myScript.innerHTML;
