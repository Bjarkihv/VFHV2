/* global $ */
// from: http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
let getUrlParameter = function getUrlParameter(sParam) { // eslint-disable-line
  const sPageURL = decodeURIComponent(window.location.search.substring(1));
  const sURLVariables = sPageURL.split('&');
  let sParameterName;
  let i;

  for (i = 0; i < sURLVariables.length; i += 1) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

$(document).ready(function () { // eslint-disable-line
  const vidID = getUrlParameter('id');
  let html = '';
  $.getJSON('./gogn/videos.json', function (data) { // eslint-disable-line
    if (data.videos[vidID-1] !== undefined) { // eslint-disable-line
      html += `<h1 class = heading--three>${data.videos[vidID - 1].title}</h2>`;
      html += '<div id="video_player_box">';
      html += `<video id=my_video class=the_video poster=${data.videos[vidID - 1].poster}>`;
      html += `<source src=${data.videos[vidID - 1].video} type=video/mp4>`;
      html += '</video>';
      html += '<img src=gogn/img/play.svg class="videoPlayButton" id = "overlaybtn">';
      html += '</div>';


      html += '<div id="video_controls_bar">';
      html += '<button id="backbtn" class="btn backbtn"></button>';
      html += '<button id="playpausebtn" class="btn playbtn"></button>';
      html += '<button id="mutebtn" class="btn mutebtn"></button>';
      html += '<button id="fullscreenbtn" class="btn fullscreenbtn"></button>';
      html += '<button id="nextbtn" class="btn nextbtn"></button>';
      html += '</div>';
      html += '<a href = "index.html" class = return> Til baka </a>';
      $('#videoSpilari').append(html);
    } else {
      html += '<div id="error_box">';
      html += '<h1 class = heading--two> Myndband finnst ekki </h2>';
      html += '<a href = "index.html" class = return> Til baka </a>';
      html += '</div>';
      $('#videoSpilari').append(html);
    }
  });

});

let vid;
let playbtn;
let mutebtn;
let fullscreenbtn;
let overlaybtn;
let backbtn;
let nextbtn;

function showOverlay() {
  overlaybtn.classList.remove('videoPlayButton__hidden');
  overlaybtn.classList.add('videoPlayButton');
}

function hideOverlay() {
  overlaybtn.classList.remove('videoPlayButton');
  overlaybtn.classList.add('videoPlayButton__hidden');
}

function playPause() {
  if (vid.paused) {
    vid.play();
    vid.style.filter = 'brightness(1)';
    playbtn.classList.remove('playbtn');
    playbtn.classList.add('pausebtn');
    hideOverlay();
  } else {
    vid.pause();
    showOverlay();
    vid.style.filter = 'brightness(0.6)';
    playbtn.classList.remove('pausebtn');
    playbtn.classList.add('playbtn');
  }
}
function vidmute() {
  if (vid.muted) {
    vid.muted = false;
    mutebtn.classList.remove('unmutebtn');
    mutebtn.classList.add('mutebtn');
  } else {
    vid.muted = true;
    mutebtn.classList.remove('mutebtn');
    mutebtn.classList.add('unmutebtn');
  }
}
function toggleFullScreen() {
  if (vid.requestFullScreen) {
    vid.requestFullScreen();
  } else if (vid.webkitRequestFullScreen) {
    vid.webkitRequestFullScreen();
  } else if (vid.mozRequestFullScreen) {
    vid.mozRequestFullScreen();
  }
}

function forward() {
  if (!vid.paused) {
    vid.currentTime += 3;
  }
}

function back() {
  if (!vid.paused) {
    if (vid.currentTime > 3) {
      vid.currentTime -= 3;
    } else {
      vid.currentTime = 0;
    }
  }
}
  function initializePlayer() {
  // Skilgreinum object references
  /*
  vid = document.getElementById('my_video');
  playbtn = document.getElementById('playpausebtn');
  overlaybtn = document.getElementById('overlaybtn');
  mutebtn = document.getElementById('mutebtn');
  fullscreenbtn = document.getElementById('fullscreenbtn');
  backbtn = document.getElementById('backbtn');
  nextbtn = document.getElementById('nextbtn');
  overlaybtn.classList.remove('videoPlayButton__hidden');
  overlaybtn.classList.add('videoPlayButton');
  vid.style.filter = 'brightness(0.6)';
  */
  vid = document.querySelector('#my_video');
  playbtn = document.querySelector('#playpausebtn');
  overlaybtn = document.querySelector('#overlaybtn');
  mutebtn = document.querySelector('#mutebtn');
  fullscreenbtn = document.querySelector('#fullscreenbtn');
  backbtn = document.querySelector('#backbtn');
  nextbtn = document.querySelector('#nextbtn');
  overlaybtn.classList.remove('videoPlayButton__hidden');
  overlaybtn.classList.add('videoPlayButton');
  vid.style.filter = 'brightness(0.6)';

  // Bætum við event listeners
  playbtn.addEventListener('click', playPause, false);
  overlaybtn.addEventListener('click', playPause, false);
  vid.addEventListener('click', playPause, false);
  mutebtn.addEventListener('click', vidmute, false);
  fullscreenbtn.addEventListener('click', toggleFullScreen, false);
  backbtn.addEventListener('click', back, false);
  nextbtn.addEventListener('click', forward, false);
}

window.onload = initializePlayer;
