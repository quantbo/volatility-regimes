'use strict';
inner = document.getElementsByClassName('inner');
if (tseries == 'VALUE') {
  inner = inner[0];
} else {
  inner = inner[1];
}
var aspectRatio = inner.getAttribute('width') / inner.getAttribute('height');
var value = DATA['VALUE'];
var date = DATA['DATE'];
//Provide svg with a viewBox whose width matches the length of the data.
var vbWidth = value.length;
var vbHeight = vbWidth / aspectRatio;
var viewBox = `0 0 ${vbWidth} ${vbHeight}`
inner.setAttribute('viewBox', viewBox);

//Use a rectangle to set off the inner svg.
var frame = document.createElementNS(namespaceURI, 'rect');
frame.setAttribute('x', 0);
frame.setAttribute('y', 0);
frame.setAttribute('width', vbWidth);
frame.setAttribute('height', vbHeight);
frame.setAttribute('id', 'frame');
inner.appendChild(frame);

//To find the max and min of the data we must filter out null values.
var max = Math.ceil(Math.max(...value.filter((x) => {return typeof(x) == 'number';})));
var min = Math.floor(Math.min(...value.filter((x) => {return typeof(x) == 'number';})));
//We assume that the max is positive, i.e., that we will not be dealing with strictly non-positive time series. Therefore, how to display the data will depend on whether min is negative. If it is non-negative then shading is placed under the curve and the origin is placed in the lower left corner of the graph. If min is negative, then shading is not placed under the curve and the origin is placed in the middle left of the graph.
console.log(`tseries ${tseries}  max ${max}  min ${min}`);