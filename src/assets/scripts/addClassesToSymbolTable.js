const CHECKMARK_CLASS = 'checkmark';
const DISMISS_CLASS = 'dismiss';
const QUESTION_CLASS = 'question-mark';

const symbolToClass = {
  '✔️': CHECKMARK_CLASS,
  '✅': CHECKMARK_CLASS,
  '☑️': CHECKMARK_CLASS,
  '✓': CHECKMARK_CLASS,
  '✔︎': CHECKMARK_CLASS,
  yes: CHECKMARK_CLASS,
  x: DISMISS_CLASS,
  '❌': DISMISS_CLASS,
  '✖️': DISMISS_CLASS,
  '×': DISMISS_CLASS,
  '✕': DISMISS_CLASS,
  no: DISMISS_CLASS,
  '?': QUESTION_CLASS,
  '❓': QUESTION_CLASS,
};

/**
 * Add CSS classes to table cells that contain symbols like '✔️' or '❌'.
 * Since CMS does not allow manually tagging classes on table cells,
 * this allows CMS users to simply enter text content and this script adds the classes to enable custom styling.
 * @param {*} params
 */
function addClassesToSymbolTable(tableSelector) {
  const table = document.querySelector(tableSelector);
  if (!table) return;
  const tableCells = table.querySelectorAll('td');
  tableCells.forEach((el) => {
    const text = el.textContent.trim().toLowerCase();
    if (text in symbolToClass) {
      el.classList.add(symbolToClass[text]);
    }
  });
}

addClassesToSymbolTable('section#services-table table');
