import React from 'react';
import styled from 'styled-components';

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var _templateObject;
var StyledLightbox = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: #000;\n\n  z-index: 99999999999999999;\n"])));

var Lightbox = function Lightbox() {
  return /*#__PURE__*/React.createElement(StyledLightbox, null, "Funfou");
};

export default Lightbox;
