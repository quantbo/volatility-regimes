//Add a vertical grid.
'use strict';
const vGran = 10; //Control granularity of vertical grid.
const vLocs = [0]; //Locations of vertical grid lines.
const vVals = [max]; //Values corresponding to vertical tick marks.
for (let ii = 1; ii <= vGran; ++ii) {
  vLocs.push(ii * vbHeight / vGran);
  let val = (vGran - ii) * max / vGran;
  vVals.push(Math.round(10 * val) / 10); //Round to 1 decimal place.
}
//Add a vertical grid line, tick mark, and label.
function vGrid(ii) {
  //ii: The index of the grid line.
  let tick = document.createElementNS(namespaceURI, 'line');
  let loc = vLocs[ii];
  tick.setAttribute('y1', loc);
  tick.setAttribute('y2', loc);
  tick.setAttribute('x1', -0.015 * vbWidth); //Overflow to create a tick mark.
  tick.setAttribute('x2', 0);
  tick.setAttribute('class', 'tick');
  inner.appendChild(tick);
  let gridLine = document.createElementNS(namespaceURI, 'line');
  gridLine.setAttribute('y1', loc);
  gridLine.setAttribute('y2', loc);
  gridLine.setAttribute('x1', 0);
  gridLine.setAttribute('x2', vbWidth);
  gridLine.setAttribute('class', 'gridLine');
  inner.appendChild(gridLine);
  let text = document.createElementNS(namespaceURI, 'text');
  text.setAttribute('y', loc);
  let x = -0.03 * vbWidth;
  text.setAttribute('x', x);
  text.setAttribute('class', 'tick-text');
//  text.setAttribute('transform', `rotate(-45, ${loc}, ${vbHeight * vbh_factor})`)
  text.textContent = vVals[ii];
  inner.appendChild(text);
}
for (let ii = 0; ii <= vGran; ++ii) {
  vGrid(ii);
}
