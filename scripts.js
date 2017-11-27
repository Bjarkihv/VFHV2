/* global $ */
function timeDifference(dateNation) {
  const today = new Date();
  const videoTime = new Date(dateNation);
  const timeOf = today - videoTime;
  const min = timeOf / 1000 / 60;
  const hours = min / 60;
  const days = hours / 24;
  if (days === 1) {
    return (`Fyrir ${days} degi síðan`);
  }
  if (days < 7) {
    return (`Fyrir ${days} dögum síðan`);
  }
  if (days >= 7 && days < 13) {
    return (`Fyrir ${(days / 7).toFixed(0)} viku síðan`);
  }
  return (`Fyrir ${(days / 7).toFixed(0)} vikum síðan`);
}


function duration(seconds) {
  const minutes = (seconds / 60);
  let modseconds = (seconds % 60);
  if (modseconds < 10) {
    modseconds = (`0${modseconds.toFixed(0)}`);
  }

  const result = (`${minutes.toFixed(0)}:${modseconds}`);
  return result;
}

$(document).ready(function () { // eslint-disable-line
  $.getJSON('./gogn/videos.json', function (data) { // eslint-disable-line
    let html = '';
    $.each(data.categories, function (key, value) { // eslint-disable-line
      html += '<div class=category>';
      html += `<h1 class = heading--one> ${value.title} </h2>`;

      for (let i = 0; i < value.videos.length; i += 1) {
        if (i === 0)html += '<div class = myndbond>';


        const index = value.videos[i] - 1;

        const thatVid = data.videos[index];
        html += '<div class = myndband>';
        html += `<a class = poster href = video.html?id=${thatVid.id}>`;
        html += `<img class = posterImg src=${thatVid.poster} id=${thatVid.id}>`;
        html += `<label for=${key} class = duration>${duration(thatVid.duration)}</label>`;
        html += '</a>';
        html += `<label for=${key} class = title>${thatVid.title}</label>`;
        html += `<label for=${key} class = length>${timeDifference(thatVid.created)}</label>`;
        html += '</div>';
      }
      html += '</div>';
      html += '</div>';
      html += '<hr>';
    });
    $('#videoSalur').html(html);
  }).done(function () { // eslint-disable-line
    $('img').click(function () { // eslint-disable-line
      window.location.href = `video.html?id= ${this.id}`;
    });
  });
});
