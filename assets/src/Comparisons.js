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
      var rows = data.rows,
          names = data.metaData.names,
          plotData = [];

      $("#comparisons").append("<h2>" + data.metaData.names[id] + "<h2>");
      $("#comparisons").append('<div id=' + id + '><svg></svg></div>');

      _.each(rows, function(row) {
        if (id === row[0]) {
          plotData[0].values.push({ "label" : names[row[1]],
          "value" : parseFloat(row[2])});
        }
      });

      nv.addGraph(function () {
        var chart = nv.models.discreteBarChart()
          .x(function(d) { return d.label; })
          .y(function(d) { return d.value; })
          .showValues(true);

        chart.xAxis.rotateLabels(-45);

        d3.select("#" + id + " svg")
          .datum(plotData)
          .transition().duration(500)
          .attr("width", 400)
          .attr("height",130)
          .call(chart);
        
        nv.utils.windowResize(chart.update);
        return chart;
      });

    };

  };

}(window, jQuery, nv));