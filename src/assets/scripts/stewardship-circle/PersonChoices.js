import { produce } from 'https://esm.sh/immer@9';
import without from 'https://esm.sh/lodash/without';
import range from 'https://esm.sh/lodash/range';

import html from './html.js';

import { topChoicesByPerson, bottomChoicesByPerson, people } from './store.js';

const PersonChoicesSelects = ({
  choices,
  onChoicesChanged,
  maximum = Infinity,
}) => {
  const handleChoiceChanged = (i, e) => {
    const newChoices = produce(choices, (draft) => {
      const value = e.target.value;
      if (value) {
        draft[i] = value;
      } else {
        draft.splice(i, 1);
      }
    });
    onChoicesChanged(newChoices);
  };

  return html`
    ${range(0, Math.min(choices.length + 1, maximum)).map((i) => {
      const validOptions = without(people.value, ...choices.slice(0, i));

      return html`<select
        value=${choices[i]}
        onChange=${handleChoiceChanged.bind(this, i)}
        className="choice-select"
      >
        <option value="">--</option>
        ${validOptions.map(
          (person) => html`<option value="${person}">${person}</option>`
        )}
      </select>`;
    })}
  `;
};

const PersonChoices = ({ name }) => {
  const handleChoicesChanged = (choicesSignal, newChoices) => {
    choicesSignal.value = produce(choicesSignal.value, (draft) => {
      draft[name] = newChoices;
    });
  };

  return html`
    <div class="person-choices">
      <h3>${name}</h3>
      <div class="top-choices">
        <div>People they <strong>most</strong> want to be supported by</div>
        <${PersonChoicesSelects}
          choices=${topChoicesByPerson.value[name] || []}
          onChoicesChanged=${handleChoicesChanged.bind(
            this,
            topChoicesByPerson
          )}
          maximum=${2}
        />
      </div>
      <div class="bottom-choices">
        <div>People they <strong>least</strong> want to be supported by</div>
        <${PersonChoicesSelects}
          choices=${bottomChoicesByPerson.value[name] || []}
          onChoicesChanged=${handleChoicesChanged.bind(
            this,
            bottomChoicesByPerson
          )}
          maximum=${2}
        />
      </div>
    </div>
  `;
};

export default PersonChoices;
