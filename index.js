//The present code assumes that 'initialize.js' has been loaded.
'use strict';

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
let polyline = document.createElementNS(namespaceURI, 'polyline');
polyline.setAttribute('points', points);
inner.appendChild(polyline);

//Add shading under the curve.
//Add to 'points' the lower right and lower left corners.
points = points + ', ' + vbWidth + ' ' + vbHeight + ', 0 ' + vbHeight;
let shading = document.createElementNS(namespaceURI, 'polygon');
shading.setAttribute('points', points);
inner.appendChild(shading);
