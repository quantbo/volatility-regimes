'use strict';
outer = document.getElementsByClassName('outer');
inner = document.getElementsByClassName('inner');
graphTitle = document.getElementsByClassName('graph-title');
if (tseries == 'VALUE') {
  outer = outer[0];
  inner = inner[0];
  graphTitle = graphTitle[0];
} else {
  outer = outer[1];
  inner = inner[1];
  graphTitle = graphTitle[1];
}
var aspectRatioOuter = outer.getAttribute('width') / outer.getAttribute('height');
var aspectRatioInner = inner.getAttribute('width') / inner.getAttribute('height');
var value = DATA['VALUE'];
var date = DATA['DATE'];
//Provide svg with a viewBox whose width matches the length of the data.
var vbWidth = value.length;
var vbHeight = vbWidth / aspectRatioInner;
var viewBox = `0 0 ${vbWidth} ${vbHeight}`
inner.setAttribute('viewBox', viewBox);

//Use a rectangle to provide a background and border for the inner SVG.
var frame = document.createElementNS(namespaceURI, 'rect');
frame.setAttribute('x', 0);
frame.setAttribute('y', 0);
frame.setAttribute('width', vbWidth);
frame.setAttribute('height', vbHeight);
frame.setAttribute('class', 'frame');
inner.appendChild(frame);

//To find the max and min of the data we must filter out null values.
var max = Math.ceil(Math.max(...value.filter((x) => {return typeof(x) == 'number';})));
var min = Math.floor(Math.min(...value.filter((x) => {return typeof(x) == 'number';})));
//We assume that the max is positive, i.e., that we will not be dealing with strictly non-positive time series. Therefore, how to display the data will depend on whether min is negative. If it is non-negative then the origin is placed at the lower left corner of the graph. If min is negative the origin is placed in the middle left of the graph.
