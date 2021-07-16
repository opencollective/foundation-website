function renderGreeting() {
  var el = document.getElementById('greeting');
  if (!el) return;

  var time = new Date();
  // Shift time forward 15 minutes. Since granularity is 30, this will show closest time.
  time.setMinutes(time.getMinutes() + 15);
  var hour = time.getHours();
  var minute = time.getMinutes();
  var EMOJIS_BY_HOUR = [
    '🕛',
    '🕐',
    '🕑',
    '🕒',
    '🕓',
    '🕔',
    '🕕',
    '🕖',
    '🕗',
    '🕘',
    '🕙',
    '🕚',
  ];
  var HALF_HOUR_EMOJIS_BY_HOUR = [
    '🕧',
    '🕜',
    '🕝',
    '🕞',
    '🕟',
    '🕠',
    '🕡',
    '🕢',
    '🕣',
    '🕤',
    '🕥',
    '🕦',
  ];
  var greeting;
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  var emoji =
    minute >= 30
      ? HALF_HOUR_EMOJIS_BY_HOUR[hour % 12]
      : EMOJIS_BY_HOUR[hour % 12];
  greeting += ' ' + emoji;

  el.innerText = greeting;
}

renderGreeting();
