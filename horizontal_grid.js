//Generate a horizontal grid.
'use strict';

//Set horizontal grid locations.
//It improves clarity for the observer if there is a tick mark and tick label at the beginning and end of the time series.
var hLocs = [0];
var hStep = (vbWidth - 1) / hGran;
for (let ii = 1; ii <= hGran; ++ii) {
  hLocs.push(Math.round(ii * hStep));
}

function hGrid(ii) {
  //ii: Index governing for-loop.
  let loc = hLocs[ii];
  let tick = document.createElementNS(namespaceURI, 'line');
  tick.setAttribute('x1', loc);
  tick.setAttribute('x2', loc);
  tick.setAttribute('y1', vbHeight);
  tick.setAttribute('y2', vbHeight * 1.03); //Overflow to create a tick mark.
  tick.setAttribute('class', 'tick');
  inner.appendChild(tick);
  let gridLine = document.createElementNS(namespaceURI, 'line');
  gridLine.setAttribute('x1', loc);
  gridLine.setAttribute('x2', loc);
  gridLine.setAttribute('y1', 0);
  gridLine.setAttribute('y2', vbHeight);
  gridLine.setAttribute('class', 'gridLine');
  inner.appendChild(gridLine);
  let text = document.createElementNS(namespaceURI, 'text');
  text.setAttribute('x', loc);
  const vbh_factor = 1.05;
  text.setAttribute('y', vbHeight * vbh_factor);
  text.setAttribute('class', 'tick-label');
  text.setAttribute('transform', `rotate(-45, ${loc}, ${vbHeight * vbh_factor})`)
  text.textContent = date[loc];
  inner.appendChild(text);
}
for (let ii = 0; ii <= hGran; ++ii) {
  hGrid(ii);
}
