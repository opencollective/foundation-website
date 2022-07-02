// Inserts a row with a button into the table that toggles a class
// CSS handles visibility
function insertShowMoreButtonIntoServicesTable(table) {
  const showMoreButton = document.createElement('button');
  showMoreButton.textContent = 'Show all features';
  showMoreButton.setAttribute('class', 'show-more-button');
  const showMoreButtonOnClick = () => {
    table.classList.toggle('show-all');
    showMoreButton.textContent = table.classList.contains('show-all')
      ? 'Show less features'
      : 'Show all features';
  };
  showMoreButton.addEventListener('click', showMoreButtonOnClick);

  const buttonRowEl = document.createElement('tr');
  buttonRowEl.classList.add('show-more-row');
  const buttonCellEl = document.createElement('td');
  buttonRowEl.appendChild(buttonCellEl);
  buttonCellEl.appendChild(showMoreButton);

  const lastRow = table.querySelector(`tbody > tr:last-child`);

  if (!lastRow) return;

  const nColumns = lastRow.children.length;
  // span all columns
  buttonCellEl.setAttribute('colspan', nColumns);

  lastRow.before(buttonRowEl);
}

insertShowMoreButtonIntoServicesTable(
  document.querySelector('.services-table-container table')
);
