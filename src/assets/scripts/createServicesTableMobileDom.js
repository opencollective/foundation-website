// The mobile "table" is totally different, and would be very hard to style soley with css due to the carousel design
// Read <table> and create a different dom with the same data
// Output is div with children ordered column-wise
function createServicesTableMobileDom(table) {
  const mobileRootEl = document.createElement('div');
  mobileRootEl.setAttribute(
    'class',
    'services-table-mobile hidden show-mobile'
  );

  const columnsEl = document.createElement('div');
  columnsEl.setAttribute('class', 'table-columns');

  // will be initialized after insertion into DOM
  let flkty;

  // show more button, to be cloned into each column before the footer
  // it toggles a class on the root
  const showMoreButton = document.createElement('button');
  showMoreButton.textContent = 'Show all features';
  showMoreButton.setAttribute('class', 'show-more-button');
  const showMoreButtonOnClick = () => {
    mobileRootEl.classList.toggle('show-all');
    flkty.resize();
  };
  showMoreButton.addEventListener('click', showMoreButtonOnClick);

  mobileRootEl.append(columnsEl);

  // create heading rows from table headings
  const ths = table.children[0].children[0].children;

  for (let thEl of ths) {
    // first column header not useful
    if (thEl.matches(':first-child')) continue;

    const headingEl = document.createElement('div');
    headingEl.setAttribute('class', 'table-heading-row');
    headingEl.innerHTML = thEl.innerHTML;

    // create column
    const columnEl = document.createElement('div');
    columnEl.setAttribute('class', 'table-column');

    columnEl.append(headingEl);
    columnsEl.append(columnEl);
  }

  const trs = table.children[1].children;
  let rowI = 0;
  for (let trEl of trs) {
    let colI = 0;
    let rowHeadingEl;
    const isFooter = rowI === trs.length - 1;
    for (let tdEl of trEl.children) {
      if (colI === 0) {
        // row headings
        rowHeadingEl = document.createElement('div');
        rowHeadingEl.setAttribute('class', 'row-heading');
        rowHeadingEl.innerHTML = tdEl.innerHTML;
      } else {
        const columnEl = columnsEl.children[colI - 1];

        const rowEl = document.createElement('div');
        rowEl.classList.add('table-row');
        rowEl.classList.toggle('row-footer', isFooter);

        const dataEl = document.createElement('div');
        dataEl.setAttribute('class', 'table-data');
        dataEl.innerHTML = tdEl.innerHTML;
        rowEl.append(dataEl);
        rowEl.append(rowHeadingEl.cloneNode(true));

        // Add show more button before footer
        if (isFooter) {
          const showMoreButtonClone = showMoreButton.cloneNode(true);
          showMoreButtonClone.addEventListener('click', showMoreButtonOnClick);
          columnEl.append(showMoreButtonClone);
        }

        columnEl.append(rowEl);
      }
      colI++;
    }
    rowI++;
  }

  table.after(mobileRootEl);

  flkty = new Flickity(columnsEl, {
    pageDots: false,
  });
}

createServicesTableMobileDom(
  document.querySelector('.services-table-container table')
);
