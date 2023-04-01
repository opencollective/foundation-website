import { computed } from 'https://esm.sh/@preact/signals@1.1.1';
import { topChoicesByPerson, bottomChoicesByPerson, people } from './store.js';
import without from 'https://esm.sh/lodash/without';
import { MinPriorityQueue } from 'https://esm.sh/@datastructures-js/priority-queue';
import shuffle from 'https://esm.sh/lodash/shuffle';

// We assign weights between people based on their ranking
// 0..n for top choices
// n..2n for unranked choices
// 2n..3n for bottom choices (reversed, so #1 bottom choice is the highest weight)
// There are gaps because it ensures unranked choices cannot have the same weight as top or bottom choices

// Computes a rank of how much the provided person wants to be supported by each other person
function computeWeightsForPerson(personName) {
  const weights = {};

  const topChoices = topChoicesByPerson.value[personName] || [];
  const bottomChoices = bottomChoicesByPerson.value[personName] || [];

  // We want to shuffle the unranked choices to avoid bias from the original order
  const unrankedChoices = shuffle(
    without(people.value, personName, ...topChoices, ...bottomChoices)
  );
  const n = people.value.length;

  topChoices.forEach((choice, i) => {
    weights[choice] = i;
  });
  bottomChoices.forEach((choice, i) => {
    weights[choice] = 2 * n + bottomChoices.length - i;
  });
  unrankedChoices.forEach((choice, i) => {
    weights[choice] = n + i;
  });

  return weights;
}

function calculateCircle() {
  // This is an instance of the assymetric traveling salesman problem, which is NP-hard
  // We're going to use a greedy algorithm to find a solution
  // https://en.wikipedia.org/wiki/Travelling_salesman_problem#Asymmetric_TSP

  const edgeQueue = new MinPriorityQueue(([_from, _to, weight]) => weight);

  // Add all edges to the queue
  people.value.forEach((person) => {
    const weights = computeWeightsForPerson(person);
    Object.entries(weights).forEach(([supportedBy, weight]) => {
      edgeQueue.enqueue([supportedBy, person, weight]);
    });
  });

  // Use union-find to ensure we do not add an edge that would create a cycle
  // https://en.wikipedia.org/wiki/Disjoint-set_data_structure

  const parent = people.value.reduce((acc, person) => {
    acc[person] = person;
    return acc;
  }, {});
  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };
  const union = (x, y) => {
    const xRoot = find(x);
    const yRoot = find(y);
    parent[xRoot] = yRoot;
  };

  const graph = {};
  const reverseGraph = {};
  let numEdges = 0;
  while (!edgeQueue.isEmpty()) {
    const [from, to, _weight] = edgeQueue.dequeue();
    if (from in graph) {
      // already have an edge from this person
      continue;
    }
    if (to in reverseGraph) {
      // already have an edge to this person
      continue;
    }
    if (find(from) === find(to) && numEdges < people.value.length - 1) {
      // would create a cycle prematurely
      continue;
    }
    union(from, to);
    graph[from] = to;
    reverseGraph[to] = from;
    numEdges++;
  }

  return graph;
}

export default computed(calculateCircle);
