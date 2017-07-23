//The present code assumes that 'initialize.js' has been loaded.
'use strict';

//Horizontal grid.
function tick(loc) {
  //loc: Location on x axis,
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
  text.setAttribute('class', 'tick-text');
  text.setAttribute('transform', `rotate(-45, ${loc}, ${vbHeight * vbh_factor})`)
  text.textContent = date[loc];
  inner.appendChild(text);
}
//Set up tick mark locations so that there will be a tick mark at the beginning and end of the time series.
let ticks = [0];
const granularity = 16;
const tickSpace = (vbWidth - 1) / granularity;
for (let ii = 1; ii <= granularity; ++ii) {
  ticks.push(Math.round(ii * tickSpace));
}

let polyline = document.createElementNS(namespaceURI, 'polyline');
let points = '';
const step = 1; //This can be used to diagnose issues.
for (let ii = 0; ii < vbWidth; ii = ii+step) {
  //Generate tick mark before checking for null.
  if (ticks.indexOf(ii) >= 0) {
    tick(ii);
  }
  //Skip if null.
  if (value[ii] == null) continue;
  //Transform the data to fit the viewBox.
  let el = vbHeight * value[ii] / max;
  //Place y = 0 at bottom of inner.
  el = vbHeight - el;
  points = points + ii + ' ' + el;
  if (ii < vbWidth - step) {
    points = points + ', '
  }
}
polyline.setAttribute('points', points);
inner.appendChild(polyline);
