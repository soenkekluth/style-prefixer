"use strict";

var prefixes = ["ms", "Moz", "Webkit", "O"];

var initialized = false;
var element = null;
var actualPrefix = '';

var properties = ['userSelect', 'transform', 'transition', 'transitionend', 'transformOrigin', 'transformStyle', 'transitionProperty', 'transitionDuration', 'transitionTimingFunction', 'transitionDelay', 'borderImage', 'borderImageSlice', 'boxShadow', 'backgroundClip', 'backfaceVisibility', 'perspective', 'perspectiveOrigin', 'animation', 'animationStart', 'animationEnd', 'animationDuration', 'animationName', 'animationDelay', 'animationDirection', 'animationIteration', 'animationIterationCount', 'animationTimingFunction', 'animationPlayState', 'animationFillMode', 'appearance'];

var cache = {};
var getElement = function getElement() {
  if (element !== null) {
    return element;
  }
  if (typeof document === 'undefined') {
    console.warn('prefixer is used without document');
    return { style: {} };
  } else {
    element = document.createElement('div');
  }

  return element;
};

var applyVendorPrefix = function applyVendorPrefix(property) {
  var el = getElement();
  if (properties.indexOf(property) === -1 || !!el.style[property]) {
    return property;
  }

  if (initialized) {
    return actualPrefix + property;
  } else {
    initialized = true;
    var temp;
    var prop = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      temp = prefixes[i] + prop;
      if (el.style[temp]) {
        actualPrefix = prefixes[i].toLocalLowerCase();
        prefixes = [prefixes[i]];
        return temp;
      }
    }
  }
  return property.charAt(0).toLowerCase() + property.slice(1);
};

var getPrefix = function getPrefix(property) {
  if (!cache[property]) {
    cache[property] = applyVendorPrefix(property);
  }
  return cache[property];
};

var prefixer = function prefixer(obj) {
  var result = {};
  for (var key in obj) {
    result[getPrefix(key)] = obj[key];
  }
  return result;
};

exports.getPrefix = getPrefix;
exports.prefixer = prefixer;
exports.default = prefixer;