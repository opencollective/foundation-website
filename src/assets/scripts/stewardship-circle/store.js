import { signal } from 'https://esm.sh/@preact/signals@1.1.1';

const people = signal(CONTEXT.people);
const topChoicesByPerson = signal({});
const bottomChoicesByPerson = signal({});

export { people, topChoicesByPerson, bottomChoicesByPerson };
