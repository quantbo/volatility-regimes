//Generate a curve and shading below the curve.
//In the code below the d attribute is generated so as to minimize space consumption at the expense of readability.
'use strict';

//The vertical extent (vx) of the curve.
if (min >= 0) {
  var vx = max;
} else {
  var vx = max - min;
}

//Resize a time series value to fit the viewBox.
function resize(value, round=2) {
  let el = vbHeight * value / vx;
  if (min >= 0) {
    el = vbHeight - el;
  } else {
    el = vbHeight * (max/vx) - el;
  }
  return Math.round(el * Math.pow(10, round)) / Math.pow(10, round);
}

//Initialize the SVG path d attribute.
if (tseries == 'VALUE') {
  var d = `M 0 ${resize(value[0])}`;
  var loop_begin = 1;
} else {
  //There is no price change for the first day of the time series.
  var d = `M 1 ${resize(value[1])}`;
  var loop_begin = 2;
}

//If the value at index ii is null, return the next non-null index, value pair.
function findNN(ii) {
  while(value[++ii] == null);
  return {'loc':ii, 'val': resize(value[ii])};
}

//In production set step = 1. During development increasing step can help to diagnose issues.
var step = 1;
for (let ii = loop_begin; ii < vbWidth; ii = ii+step) {
  //If null, move to the next non-null point.
  if (value[ii] == null) {
    let nn = findNN(ii);
    d = d + ` L${nn.loc} ${nn.val}`
    ii = nn.loc;
    continue;
  }
  let el = resize(value[ii]);
  d = d + `L${ii} ${el}`;
}

//Generate shading.
//It is necessary to generate shading before the curve to avoid overwriting the latter.
//Add to 'd' the lower right and lower left corners and a closepath (Z).
if (tseries == 'VALUE') {
  var corners = `V${vbHeight-1}H0Z`;
} else {
  var corners = `V${vbHeight-1}H1Z`;  
}
d = d + corners;
var shading = document.createElementNS(namespaceURI, 'path');
shading.setAttribute('d', d);
shading.setAttribute('class', 'shading');
inner.appendChild(shading);
//Remove corners.
var index = d.search(corners + '$');
d = d.substring(0, index);

//Generate curve.
var curve = document.createElementNS(namespaceURI, 'path');
curve.setAttribute('d', d);
curve.setAttribute('class', 'curve');
inner.appendChild(curve);
