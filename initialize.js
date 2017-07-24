'use strict';
const inner = document.getElementById('inner');
const aspectRatio = inner.getAttribute('width') / inner.getAttribute('height');
const value = DATA['VALUE'];
const date = DATA['DATE'];
//Provide svg with a viewBox whose width matches the length of the data.
const vbWidth = value.length;
const vbHeight = vbWidth / aspectRatio;
const viewBox = `0 0 ${vbWidth} ${vbHeight}`
inner.setAttribute('viewBox', viewBox);

//Use a rectangle to set off the inner svg.
//CRITICAL: The URL below must not contain leading or trailing spaces.
const namespaceURI = 'http://www.w3.org/2000/svg';
const frame = document.createElementNS(namespaceURI, 'rect');
frame.setAttribute('x', 0);
frame.setAttribute('y', 0);
frame.setAttribute('width', vbWidth);
frame.setAttribute('height', vbHeight);
frame.setAttribute('id', 'frame');
inner.appendChild(frame);

//To find the max of the data we must filter out null values.
const max = Math.ceil(Math.max(...value.filter((x) => {return typeof(x) == 'number';})));
