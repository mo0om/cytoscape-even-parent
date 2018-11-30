// n.b. .layoutPositions() handles all these options for you

const assign = require('../assign');

const defaults = Object.freeze({
  // animation
  animate: undefined, // whether or not to animate the layout
  animationDuration: undefined, // duration of animation in ms, if enabled
  animationEasing: undefined, // easing of animation, if enabled
  animateFilter: () => true, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions

  // viewport
  pan: undefined, // pan the graph to the provided position, given as { x, y }
  zoom: undefined, // zoom level as a positive number to set after animation
  fit: 25, // fit the viewport to the repositioned nodes, overrides pan and zoom

  // modifications
  padding: undefined, // padding around layout
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  spacingFactor: undefined, // a positive value which adjusts spacing between nodes (>1 means greater than usual spacing)
  nodeDimensionsIncludeLabels: undefined, // whether labels should be included in determining the space used by a node (default true)
  transform: ( node, pos ) => pos, // a function that applies a transform to the final node position

  // layout event callbacks
  ready: () => {}, // on layoutready
  stop: () => {}, // on layoutstop

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
  horizontalSpread: true
});

class Layout {
  constructor( options ){
    this.options = assign( {}, defaults, options );
  }

  run(){
    let layout = this;
    let options = this.options;
    let eles = options.eles;
    let nodes = eles.nodes();

    const topNodes = nodes.roots();

    // Place top nodes
    topNodes.forEach((topNode, i) => {
      let startingSize =  options.horizontalSpread ? {w: options.startingSize.h, h:options.startingSize.w} :
          {w: options.startingSize.w, h: options.startingSize.h};
      topNode.style("width", startingSize.w);
      topNode.style("height", startingSize.h);
      topNode.style("font-size", `${options.fontSize}px`);
      let horizontalSpread =  options.horizontalSpread ? { x: 0, y: i * options.startingSize.h + options.verticalPadding * i} :
          { x: i * options.startingSize.w + options.horizontalPadding * i, y: 0}
      topNode.position(horizontalSpread);
      topNode.connectedEdges().style('width', options.edgeSize);
      childrenPlacement(topNode, options.horizontalPadding, options.verticalPadding, options.fontSize, options.edgeSize);
    });

    function childrenPlacement (node, hp, vp, fs, es) {
      let outgoers = node.outgoers('node');
      if (outgoers.length > 0) {
        let newHorizontalPadding = hp / outgoers.length;
        let newverticalPadding = vp / outgoers.length;
        let newFontSize = fs / outgoers.length;
        let newEdgeSize = es / outgoers.length;
        let width = node.width() * options.childrenSize / outgoers.length;
        let height = node.height() * options.childrenSize / outgoers.length;
        let spaceBetweenNodes = options.horizontalSpread ? height + newverticalPadding : width + newHorizontalPadding;
        outgoers.forEach((outgoer, i) => {
          outgoer.connectedEdges().style('width', newEdgeSize);
          outgoer.style("width", width);
          outgoer.style("height", height);
          outgoer.style("font-size", `${newFontSize}px`);
          let startingPos = options.horizontalSpread ? node.position().y - (spaceBetweenNodes / 2 * (outgoers.length - 1)) :
              node.position().x - (spaceBetweenNodes / 2 * (outgoers.length - 1));
          let outgoerPosition = options.horizontalSpread ? {
              x: node.position().x + (node.width() / 2) + (width / 2) + newHorizontalPadding,
              y: startingPos + spaceBetweenNodes *  i
            } : {
              x: startingPos + spaceBetweenNodes *  i,
              y: node.position().y + (node.height() / 2) + (height / 2) + newverticalPadding
          };
          outgoer.position(outgoerPosition);
          childrenPlacement(outgoer, newHorizontalPadding, newverticalPadding, newFontSize, newEdgeSize);
        });
      }
    }

    let getNodePos = function( ele ){
      return ele.position();
    };

    nodes.layoutPositions( layout, options, getNodePos );
    if (options.fit) {
      nodes.cy().fit(nodes, options.fit);
    }

  }
}

module.exports = Layout;
