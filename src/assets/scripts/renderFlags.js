let supportsFlagEmojiMemo;

/**
 * Detects whether browser supports rendering flags
 * based on https://stackoverflow.com/a/57789475
 */
function supportsFlagEmoji() {
  // memoized
  if (typeof supportsFlagEmojiMemo === 'boolean') return supportsFlagEmojiMemo;

  // Render a flag to a canvas
  const canvas = document.createElement('canvas');
  canvas.height = 10;
  canvas.width = canvas.height * 2;

  const ctx = canvas.getContext('2d');
  ctx.font = `${canvas.height}px Arial`;
  ctx.fillText('🇬🇧', 0, canvas.height);

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Check whether pixel contains colors
  // If not, it's a placeholder character
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] !== data[i + 1] || data[i] !== data[i + 2]) {
      return (supportsFlagEmojiMemo = true);
    }
  }

  return (supportsFlagEmojiMemo = false);
}

const flagOffset = 0x1f1e6;
const asciiOffset = 0x41;

/**
 * https://en.wikipedia.org/wiki/Regional_indicator_symbol
 * A Flag emoji is a sequence of two regional indicator symbols corresponding to the two letters of the ISO country code.
 * @param country
 * @returns char sequence for flag emoji, or empty string if browser does not support rendering it
 */
function getFlagChar(country) {
  if (!supportsFlagEmoji()) {
    return '';
  }

  // Enum values should be ISO country codes
  const countryCode = country;
  const firstChar = countryCode.codePointAt(0) - asciiOffset + flagOffset;
  const secondChar = countryCode.codePointAt(1) - asciiOffset + flagOffset;

  return String.fromCodePoint(firstChar, secondChar);
}

/**
 * Renders flag emojis into elements matching [data-country-code].flag
 * where attribute data-country code is a 2-character ISO country code.
 */
function renderFlags() {
  // find flag placeholders
  const els = document.querySelectorAll('[data-country-code].flag');
  els.forEach(function (el) {
    const countryCode = el.getAttribute('data-country-code');
    const flag = getFlagChar(countryCode);
    el.innerHTML = flag;
  });
}

renderFlags();
