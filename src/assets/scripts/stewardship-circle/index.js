// import { html, render } from 'https://esm.sh/htm/preact/standalone';
import { render } from 'https://esm.sh/preact@10';

import html from './html.js';

import { people } from './store.js';

import PersonChoices from './PersonChoices.js';
import computedCircle from './computedCircle.js';
import GraphVisualization from './GraphVisualization.js';

const StewardshipCircle = () => {
  return html`
    <h1>Stewardship Circle</h1>
    <h2>Preferences</h2>
    <div class="people-choices">
      ${people.value.map((person) => html`<${PersonChoices} name=${person} />`)}
    </div>
    <hr />
    <h2>Computed Circle</h2>
    <ul>
      ${Object.entries(computedCircle.value).map(
        ([from, to]) =>
          html`<li>
            <strong>${from}</strong> supports <strong>${to}</strong>
          </li>`
      )}
    </ul>
    <div>
      <${GraphVisualization} graph=${computedCircle.value} />
    </div>
  `;
};

render(
  html`<${StewardshipCircle} />`,
  document.getElementById('stewardship-circle')
);
