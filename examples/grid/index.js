var mercury = require('mercury');
var Ndarray = require('ndarray');
var insertCss = require('insert-css');
var cfs = require('css-face-string');
var Icon = require('../..');
var Grid = require('grid-ui');
var fs = require('fs');
var _ = require('lodash');
var CSSOM = require("cssom");

//insert font-face 'icons'
var fontFaceName = 'icons';
var fontAwesome = cfs.file({
  name: fontFaceName,
  files: [
    {url: 'node_modules/font-awesome/fonts/fontawesome-webfont.eot', format: 'eot'},
    {url: 'node_modules/font-awesome/fonts/fontawesome-webfont.svg', format: 'svg'},
    {url: 'node_modules/font-awesome/fonts/fontawesome-webfont.ttf', format: 'ttf'},
    {url: 'node_modules/font-awesome/fonts/fontawesome-webfont.woff', format: 'woff'},
  ]
});
insertCss(fontAwesome);

var shape = [5, 5];
var numItems = shape[0] * shape[1];

//transform font-awesome css file into JSON object
var faCss = fs.readFileSync('node_modules/font-awesome/css/font-awesome.css').toString()
var cssObj = CSSOM.parse(faCss);

var icons = _.filter(cssObj.cssRules, function(obj) {
  if (obj.selectorText) {
    return obj.selectorText.slice(-6) === 'before';
  }
}).slice(0, numItems);

//construct icon data array ready for componentification
icons = _.map(icons, function(obj) {
  var name = obj.selectorText.match(/fa-(.*):before/).pop()
  return {
    iconName: name,
    fontFamily: fontFaceName,
    unicode: obj.style.content.replace(/["]+/g, ''),
    screenReaderText: name.split('-').join(' ') + ' icon'
  }
});

icons = _.map(icons, function(iconObj) {
  return Icon({
    model: iconObj
  }).state;
});

var grid = Grid({
  model: new Ndarray(icons, shape),
  config: {}
});

// start app
mercury.app(document.body, grid.state, Grid.render);






