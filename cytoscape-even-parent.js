(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeEvenParent"] = factory();
	else
		root["cytoscapeEvenParent"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * TODO
 * Choose the type of layout that best suits your usecase as a starting point.
 *
 * A discrete layout is one that algorithmically sets resultant positions.  It
 * does not have intermediate positions.
 *
 * A continuous layout is one that updates positions continuously, like a force-
 * directed / physics simulation layout.
 */
module.exports = __webpack_require__(3);
// module.exports = require('./continuous');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return tgt[k] = src[k];
    });
  });

  return tgt;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var impl = __webpack_require__(0);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('layout', 'evenParent', impl); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(window.cytoscape);
}

module.exports = register;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// n.b. .layoutPositions() handles all these options for you

var assign = __webpack_require__(1);

var defaults = Object.freeze({
  // animation
  animate: undefined, // whether or not to animate the layout
  animationDuration: undefined, // duration of animation in ms, if enabled
  animationEasing: undefined, // easing of animation, if enabled
  animateFilter: function animateFilter() {
    return true;
  }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions

  // viewport
  pan: undefined, // pan the graph to the provided position, given as { x, y }
  zoom: undefined, // zoom level as a positive number to set after animation
  fit: 25, // fit the viewport to the repositioned nodes, overrides pan and zoom

  // modifications
  padding: undefined, // padding around layout
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  spacingFactor: undefined, // a positive value which adjusts spacing between nodes (>1 means greater than usual spacing)
  nodeDimensionsIncludeLabels: undefined, // whether labels should be included in determining the space used by a node (default true)
  transform: function transform(node, pos) {
    return pos;
  }, // a function that applies a transform to the final node position

  // layout event callbacks
  ready: function ready() {}, // on layoutready
  stop: function stop() {}, // on layoutstop

  // User options
  startingSize: {
    w: 10000,
    h: 10000
  },
  horizontalPadding: 1000,
  verticalPadding: 2000,
  fontSize: 1000,
  edgeSize: 200,
  childrenSize: 1,
  horizontalSpread: false,
  smart: false
});

var Layout = function () {
  function Layout(options) {
    _classCallCheck(this, Layout);

    this.options = assign({}, defaults, options);
  }

  _createClass(Layout, [{
    key: "run",
    value: function run() {
      var layout = this;
      var options = this.options;
      var cy = options.cy;
      var eles = options.eles;
      var nodes = eles.nodes();

      var topNodes = nodes.roots();

      // Place top nodes
      topNodes.forEach(function (topNode, i) {
        var startingSize = options.horizontalSpread ? { w: options.startingSize.h, h: options.startingSize.w } : { w: options.startingSize.w, h: options.startingSize.h };
        topNode.style("width", startingSize.w);
        topNode.style("height", startingSize.h);
        topNode.style("font-size", options.fontSize + "px");
        var horizontalSpread = options.horizontalSpread ? { x: 0, y: i * options.startingSize.h + options.verticalPadding * i } : { x: i * options.startingSize.w + options.horizontalPadding * i, y: 0 };
        topNode.position(horizontalSpread);
        topNode.connectedEdges().style('width', options.edgeSize);
        childrenPlacement(topNode, options.horizontalPadding, options.verticalPadding, options.fontSize, options.edgeSize);
      });

      if (options.smart) {
        var availableSpace = options.horizontalSpread ? topNodes.first().height() * topNodes.length : topNodes.first().width() * topNodes.length;
        var arrayOfDepth = [];
        topNodes.forEach(function (topNode, i) {
          // placement of topNode
          var spaceBetweenTopNodes = availableSpace / topNodes.length;
          var center = options.horizontalSpread ? {
            x: 0,
            y: spaceBetweenTopNodes * i
          } : {
            x: spaceBetweenTopNodes * i,
            y: 0
          };
          var topNodeSize = options.horizontalSpread ? spaceBetweenTopNodes - options.verticalPadding : spaceBetweenTopNodes - options.horizontalPadding;
          topNode.position(center);
          if (topNodeSize < 1) {
            topNodeSize = 1;
          }
          topNode.style('width', topNodeSize);
          topNode.style('height', topNodeSize);

          // Placement of children
          var depthObj = {};
          cy.elements().bfs({
            roots: "#" + topNode.id(),
            visit: function visit(v, e, u, i, depth) {
              if (!depthObj[depth]) {
                depthObj[depth] = v.id();
              } else {
                depthObj[depth] += " " + v.id();
              }
            },
            directed: true
          });
          arrayOfDepth.push(depthObj);
        });
        var newDepthObj = {};
        arrayOfDepth.forEach(function (aDepthObj) {
          for (var key in aDepthObj) {
            if (!newDepthObj[key]) {
              newDepthObj[key] = aDepthObj[key];
            } else {
              newDepthObj[key] += " " + aDepthObj[key];
            }
          }
        });

        for (var key in newDepthObj) {
          if (key !== "0") {
            (function () {
              var arrayOfIDs = newDepthObj[key].split(' ');
              var newWidth = availableSpace * options.childrenSize / arrayOfIDs.length;
              var horizontalPadding = options.horizontalPadding / arrayOfIDs.length;
              var verticalPadding = options.verticalPadding / arrayOfIDs.length;
              var spaceBetweenNodes = options.horizontalSpread ? newWidth + verticalPadding : newWidth + horizontalPadding;
              var center = options.horizontalSpread ? topNodes.boundingBox().y1 + topNodes.boundingBox().h / 2 : topNodes.boundingBox().x1 + topNodes.boundingBox().w / 2;

              arrayOfIDs.forEach(function (id, i) {
                var parentNode = cy.elements("node#" + id).incomers("node");
                var childrenWidth = parentNode.width() > newWidth ? newWidth : parentNode.width();
                cy.elements("node#" + id).first().style("width", childrenWidth);
                cy.elements("node#" + id).first().style("height", childrenWidth);

                var startingPos = options.horizontalSpread ? center - spaceBetweenNodes / 2 * (arrayOfIDs.length - 1) : center - spaceBetweenNodes / 2 * (arrayOfIDs.length - 1);

                var nodePosition = options.horizontalSpread ? {
                  x: parentNode.position().x + parentNode.width() / 2 + childrenWidth / 2 + parseInt(horizontalPadding, 10),
                  y: startingPos + spaceBetweenNodes * i
                } : {
                  x: startingPos + spaceBetweenNodes * i,
                  y: parentNode.position().y + parentNode.height() / 2 + childrenWidth / 2 + parseInt(options.verticalPadding, 10)
                };
                var changingNode = cy.elements("node#" + id).first();
                changingNode.position(nodePosition);

                // Fix edge width
                var edgeSize = options.edgeSize * changingNode.width() / topNodes.first().width();
                changingNode.connectedEdges().style('width', edgeSize);
                // Fix font size
                var topNodeFontSize = parseInt(topNodes.first().style("font-size"), 10);
                var newFontSize = topNodeFontSize * childrenWidth / topNodes.first().width();
                cy.elements("node#" + id).first().style("font-size", newFontSize + "px");
              });
            })();
          }
        }
      }

      function childrenPlacement(node, hp, vp, fs, es) {
        var outgoers = node.outgoers('node');
        if (outgoers.length > 0) {
          var newHorizontalPadding = hp / outgoers.length;
          var newverticalPadding = vp / outgoers.length;
          var newFontSize = fs / outgoers.length;
          var newEdgeSize = es / outgoers.length;
          var width = node.width() * options.childrenSize / outgoers.length;
          var height = node.height() * options.childrenSize / outgoers.length;
          var spaceBetweenNodes = options.horizontalSpread ? height + newverticalPadding : width + newHorizontalPadding;
          outgoers.forEach(function (outgoer, i) {
            outgoer.connectedEdges().style('width', newEdgeSize);
            outgoer.style("width", width);
            outgoer.style("height", height);
            outgoer.style("font-size", newFontSize + "px");
            var startingPos = options.horizontalSpread ? node.position().y - spaceBetweenNodes / 2 * (outgoers.length - 1) : node.position().x - spaceBetweenNodes / 2 * (outgoers.length - 1);
            var outgoerPosition = options.horizontalSpread ? {
              x: node.position().x + node.width() / 2 + width / 2 + newHorizontalPadding,
              y: startingPos + spaceBetweenNodes * i
            } : {
              x: startingPos + spaceBetweenNodes * i,
              y: node.position().y + node.height() / 2 + height / 2 + newverticalPadding
            };
            outgoer.position(outgoerPosition);
            childrenPlacement(outgoer, newHorizontalPadding, newverticalPadding, newFontSize, newEdgeSize);
          });
        }
      }

      var getNodePos = function getNodePos(ele) {
        return ele.position();
      };

      nodes.layoutPositions(layout, options, getNodePos);
      if (options.fit) {
        nodes.cy().fit(nodes, options.fit);
      }
    }
  }]);

  return Layout;
}();

module.exports = Layout;

/***/ })
/******/ ]);
});