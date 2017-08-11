//Resize SVG elements to fit body element.
//Place 'resize.js' after all other scripts that set up graph elements.
//The parameters that must be adjusted:
// outer width
// outer height
// graphTitle x
// graphTitle y
// inner x
// inner y
// inner width
// inner height
//We also must set font sizes and stroke widths.
'use strict';

//Use to adjust a graph to fit the width of the <body> element.
var resizeFactor = width / outer.getAttribute('width');

outer.setAttribute('width', outer.getAttribute('width') * resizeFactor);
outer.setAttribute('height', outer.getAttribute('height') * resizeFactor);
graphTitle.setAttribute('x', graphTitle.getAttribute('x') * resizeFactor);
graphTitle.setAttribute('y', graphTitle.getAttribute('y') * resizeFactor);
inner.setAttribute('x', inner.getAttribute('x') * resizeFactor);
inner.setAttribute('y', inner.getAttribute('y') * resizeFactor);
inner.setAttribute('width', inner.getAttribute('width') * resizeFactor);
inner.setAttribute('height', inner.getAttribute('height') * resizeFactor);

//Getting the font size turns out to be non-obvious. Here are two Stack Overflow dialogs dealing with this, one initiated by me:
//https://stackoverflow.com/questions/45377888/can-javascript-read-svg-text-element-font-size
//https://stackoverflow.com/questions/9485626/svg-get-font-size-of-a-textelement
//I prefer to use brackets to get and set a hyphenated style element as it makes it easier to search without having to search on both hyphenated and camel case formats.
var fontSize = window.getComputedStyle(graphTitle)['font-size'];
fontSize = (parseFloat(fontSize) * resizeFactor) + 'px'
graphTitle.style['font-size'] = fontSize;

//This is the number of viewBox pixels per screen pixel for the inner SVG.
//It must be calculated AFTER the inner SVG is resized.
//We assume that the aspect ratio of 'inner' and of its viewBox are identical. This implies that vbPixels could also be calculated as vbHeight / inner.getAttribute('height').
var vbPixels = vbWidth / inner.getAttribute('width');

//Set font size of tick mark labels.
var tickLabel = inner.getElementsByClassName('tick-label');
//Firefox does not set the font-size unless the suffix 'px' is applied. Chrome works with or without 'px'.
for (let ii = 0; ii < tickLabel.length; ++ii) tickLabel[ii].style['font-size'] = parseInt(11 * vbPixels) + 'px';

//Set stroke-width for inner. Then override for tick marks and curve.
inner.style['stroke-width'] = 0.0018 * vbHeight;
//Set stroke-width for tick marks.
var tick = inner.getElementsByClassName('tick');
for (let ii=0; ii < tick.length; ++ii) tick[ii].style['stroke-width'] = 0.0014 * vbHeight;
//Set stroke-width of curve.
if (tseries == 'VALUE') {
  curve.style['stroke-width'] = 0.0026 * vbHeight;
} else {
  curve.style['stroke-width'] = 0.0020 * vbHeight;

}
