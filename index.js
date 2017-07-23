//The present code assumes that 'initialize.js' has been loaded.
'use strict';

let polyline = document.createElementNS(namespaceURI, 'polyline');
let points = '';
const step = 1; //This can be used to diagnose issues.
for (let ii = 0; ii < vbWidth; ii = ii+step) {
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
