(function (window, $, nv) {

  window.RAPTOR = window.RAPTOR || {};
  var ns = window.RAPTOR;

  ns.Comparisons = function () {
    var self = this;

    this.parseComparison = function parseComparison (data, ids) {
      
      _.each(ids, function(id) {
        self.drawComparison(data, id);
      });

    } 

    self.drawComparison = function drawComparison (data, id) { 
      $("#comparisons").append("<h2>" + data.metaData.names[id] + "<h2>");
      $("#comparisons").append('<div id=' + id + '><svg></svg></div>');
      console.log("Drawing comparison");
      drawHisto(data, id);

    };

    function drawHisto(data, id) {
      var rows = data.rows,
        plotData = {
          "key" : "TestHisto", 
          "values" : []
        };

      function getPoints() {
        var i;
        for (i = 0; i < rows.length; i += 1) {
          console.log(id);
          if (id === rows[i][0]) {
            plotData.values.push({ "label" : rows[i][1],
            "value" : parseFloat(rows[i][2])});
        
          }
        }
        return [plotData];
      }

      var points = getPoints();

      nv.addGraph(function () {
        var chart = nv.models.discreteBarChart()
          .x(function(d) { return d.label; })
          .y(function(d) { return d.value; })
          .showValues(true);

        d3.select("#" + id + " svg")
          .datum(points)
          .transition().duration(500)
          .attr("width", 400)
          .attr("height",100)
          .call(chart);
        
        nv.utils.windowResize(chart.update);
        return chart;
      });
    } 

  };

}(window, jQuery, nv));