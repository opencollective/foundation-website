import html from './html.js';

function graphToDot(graph) {
  const lines = [];
  lines.push('digraph {');
  for (const [from, to] of Object.entries(graph)) {
    lines.push(`  "${from}" -> "${to}";`);
  }
  lines.push('}');
  return lines.join('\n');
}

export default function GraphVisualization({ graph }) {
  const dot = graphToDot(graph);
  const url = `https://quickchart.io/graphviz?graph=${encodeURIComponent(
    dot
  )}&layout=circo`;
  return html`
    <a href="${url}" target="_blank"
      ><img src=${url} width="100%" height="auto"
    /></a>
  `;
}
