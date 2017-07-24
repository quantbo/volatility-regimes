//The present code assumes that 'initialize.js' has been loaded.
'use strict';

//Generate a curve, and shading below the curve.
//It is necessary to generate the shading first. This way we avoid overwriting with shading the section of the stroke falling below the theoretical curve.

let points = '';
//In production set step = 1. During development increasing step can help to diagnose issues.
const step = 1;
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

//Generate shading.
//Add to 'points' the lower right and lower left corners.
let corners = ', ' + vbWidth + ' ' + vbHeight + ', 0 ' + vbHeight;
points = points + corners;
let shading = document.createElementNS(namespaceURI, 'polygon');
shading.setAttribute('points', points);
inner.appendChild(shading);
//Remove corners.
let index = points.search(corners + '$');
points = points.substring(0, index);

//Generate curve.
let polyline = document.createElementNS(namespaceURI, 'polyline');
polyline.setAttribute('points', points);
inner.appendChild(polyline);
