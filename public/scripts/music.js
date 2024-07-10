$('.sound-button').click(function () {
  const music = $('#music')[0];
  music.volume = 0.4;
  music.play();

  $(this).hide();
});
