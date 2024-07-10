$(document).ready(function () {
  let guest = new RegExp('[\?&]guest=([^&#]*)').exec(window.location.href);
  guest = guest ? guest[1] : '';

  const guestSettings = guests[guest];
  $('#invitation').html(`${guestSettings.preInvitation}<br>${guestSettings.invitation}`);

  if (!guestSettings.childrenQuestion) {
    $('#children-question').hide();
  }

  $('form').submit(function (event) {
    event.preventDefault();

    const button = $('.form-submit');
    button.prop('disabled', true);

    const confirmation = $('input[name="confirmation"]:checked').val();
    const children = $('input[name="children"]').val();

    let message = `${guestSettings.alias} ${confirmation}`;
    if (guestSettings.childrenQuestion && confirmation.includes('🟢')) {
      message += `\n\nКол-во детей: ${children}`
    }

    $.post(
      'https://api.telegram.org/bot7020254483:AAEKHTdcjaixNstnzuAODcUFV0QUeUYtJeg/sendMessage',
      {chat_id: -1002058481276, text: message}
    )
      .done(() => {
        button.text('Отправлено!');
        button.addClass('form-submit-success');
      })
      .fail(() => {
        button.text('Ошибка!');
        button.addClass('form-submit-error');
        setTimeout(() => {
          button.prop('disabled', false);
          button.text('Отправить');
          button.removeClass('form-submit-error');
        }, 1000)
      });
  });
});
