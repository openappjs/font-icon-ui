var mercury = require('mercury');
var h = mercury.h;
var RCSS = require('rcss');
var xtend = require('xtend');
var doubleQuote = require('to-double-quotes');
var singleQoute = require('to-single-quotes');

var screenReaderTextInlineStyle = {
  position: 'absolute',
  top: '-9999px',
  left: '-9999px'
};

var fontCSS = {
  speak: 'none',
  textTransform: 'none',
  "-webkit-font-smoothing": 'antialiased',
  "-moz-osx-font-smoothing": 'grayscale',
  textDecoration: 'none'
};

var FontIcon = function (options) {
  options = options || {};
  var config = options.config || {};
  var model = options.model || {};
  var style = options.style || {};

  var state = mercury.struct({
    config: mercury.struct(config),
    model: mercury.struct(model),
    style: mercury.struct(style),
    render: mercury.value(FontIcon.render)
  });

  return {state: state};
};

FontIcon.render = function (state, events) {
  var model = state.model || {};
  var style = state.style || {};
  var css = {};

  // var unicode = model.unicode.valueOf("'") !== -1 ? model.unicode.

  css[':before'] = xtend(
    fontCSS, 
    {fontFamily: model.fontFamily, content: model.unicode},
    style);

  var icon = RCSS.registerClass(css);

  RCSS.injectAll();

  return h('div.icon', { style: style.icon }, [
    h('span', {className: icon.className}),
    h('span.screen-reader-text', {
      style: screenReaderTextInlineStyle
    }, model.screenReaderText )
  ]
  )
};

module.exports = FontIcon;
