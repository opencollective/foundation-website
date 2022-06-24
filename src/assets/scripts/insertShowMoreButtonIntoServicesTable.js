const AFTER_N = 6;

// Inserts a row with a button into the table that toggles a class
// CSS handles visibility
function insertShowMoreButtonIntoServicesTable(table) {
  const showMoreButton = document.createElement('button');
  showMoreButton.textContent = 'Show all features';
  showMoreButton.setAttribute('class', 'show-more-button');
  const showMoreButtonOnClick = () => {
    table.classList.toggle('show-all');
  };
  showMoreButton.addEventListener('click', showMoreButtonOnClick);

  const buttonRowEl = document.createElement('tr');
  buttonRowEl.classList.add('show-more-row');
  const buttonCellEl = document.createElement('td');
  buttonRowEl.appendChild(buttonCellEl);
  buttonCellEl.appendChild(showMoreButton);

  const nthRow = table.querySelector(`tbody > tr:nth-child(${AFTER_N})`);

  if (!nthRow) return;

  const nColumns = nthRow.children.length;
  // span all columns
  buttonCellEl.setAttribute('colspan', nColumns);

  nthRow.after(buttonRowEl);
}

insertShowMoreButtonIntoServicesTable(
  document.querySelector('.services-table-container table')
);
