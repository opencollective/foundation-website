/**
 * Formates datetimes in the browser using the browser locale and timzone.
 *
 * Processes all `time` elements matching `time[data-format-options]`
 * where data-format-options is a json object matching Intl.DateTimeFormats options argument.
 */
function renderFormattedDateTimes() {
  const els = document.querySelectorAll('time[data-format-options]');
  els.forEach(function (el) {
    const options = JSON.parse(el.getAttribute('data-format-options'));
    const date = new Date(el.getAttribute('datetime'));
    const formatter = new Intl.DateTimeFormat([], options);
    const formatted = formatter.format(date);
    el.innerText = formatted;
  });
}

renderFormattedDateTimes();
