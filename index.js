var mercury = require('mercury');
var h = mercury.h;

var screenReaderTextInlineStyle = {
  position: 'absolute',
  top: '-9999px',
  left: '-9999px'
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
  var className = state.className

  return h('div.icon', { style: style.icon }, [
    h('span', {className: icon.className}),
    h('span.screen-reader-text', {
      style: screenReaderTextInlineStyle
    }, model.screenReaderText )
  ]
  )
};

module.exports = FontIcon;
