var prefixes = ["ms", "Moz", "Webkit", "O"];

var initialized = false;
var element = null;
var actualPrefix = '';

const properties = [
  'userSelect',
  'transform',
  'transition',
  'transitionend',
  'transformOrigin',
  'transformStyle',
  'transitionProperty',
  'transitionDuration',
  'transitionTimingFunction',
  'transitionDelay',
  'borderImage',
  'borderImageSlice',
  'boxShadow',
  'backgroundClip',
  'backfaceVisibility',
  'perspective',
  'perspectiveOrigin',
  'animation',
  'animationStart',
  'animationEnd',
  'animationDuration',
  'animationName',
  'animationDelay',
  'animationDirection',
  'animationIteration',
  'animationIterationCount',
  'animationTimingFunction',
  'animationPlayState',
  'animationFillMode',
  'appearance'
];

const cache = {};
const getElement = () => {
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
}

const applyVendorPrefix = (property) => {
  const el = getElement();
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
}


const getPrefix = (property) => {
  if (!cache[property]) {
    cache[property] = applyVendorPrefix(property);
  }
  return cache[property];
}

const prefixer = (obj) => {
  var result = {};
  for (var key in obj) {
    result[getPrefix(key)] = obj[key];
  }
  return result;
};

exports.getPrefix = getPrefix;
exports.prefixer = prefixer;
exports.default = prefixer;
