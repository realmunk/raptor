(function (window, $, nv) {

  window.RAPTOR = window.RAPTOR || {};
  var ns = window.RAPTOR;

  ns.Graphs = function () {
    var indicators = []

    this.drawTrends = function drawTrends (indicators) { 
      console.log("Drawing trends");
    };

    this.drawProportions = function drawProportions (indicators) { 
      console.log("Drawing proportions");
    };

    this.parseComparison = function parseComparison (indicators) {
      
    } 

    this.drawComparison = function drawComparison (indicator) { 
      console.log("Drawing comparison");
    };

  };

}(window, jQuery, nv));