$(document).ready(function () {
  let guest = new RegExp('[\?&]guest=([^&#]*)').exec(window.location.href);
  guest = guest ? guest[1] : '';

  const guestSettings = guests[guest];

  if (guestSettings.noTimeLocation) {
    $('#location').hide();
    $('#time').hide();
  }
});