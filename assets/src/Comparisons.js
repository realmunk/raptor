(function (window, $, nv) {

  window.RAPTOR = window.RAPTOR || {};
  var ns = window.RAPTOR;

  ns.Comparisons = function () {
    var self = this;

    this.parseComparison = function parseComparison (indicators) {
      self.drawComparison(indicators);
    } 

    self.drawComparison = function drawComparison (indicator) { 
      $("#comparisons").prepend("<h2>Some comparison<h2>");
      $("#comparisons").append('<div id="comparison"><svg></svg></div>');
      console.log("Drawing comparison");
      drawHisto(indicator);

    };

    function drawHisto(data) {
      var rows = data.rows,
        meta = data.metaData,
        plotData = {
          "key" : "TestHisto", 
          "values" : []
        };

      function getPoints() {
        var i;
        for (i = 0; i < rows.length; i += 1) {
          plotData.values.push({ "label" : meta.pe[i],
            "value" : parseFloat(rows[i][2])});
        }
        return [plotData];
      }

      points = getPoints();

      nv.addGraph(function () {
        var chart = nv.models.discreteBarChart()
          .x(function(d) { return d.label; })
          .y(function(d) { return d.value; })
          .showValues(true);

        d3.select("#comparison svg")
          .datum(points)
          .transition().duration(500)
          .attr("width", 400)
          .attr("height",100) //Kristian, hvorfor funker ikke dette?
          .call(chart);
        
        nv.utils.windowResize(chart.update);
        return chart;
      });
    } 

  };

}(window, jQuery, nv));