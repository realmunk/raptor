(function (window, $, nv) {

  window.RAPTOR = window.RAPTOR || {};
  var ns = window.RAPTOR;

  ns.Comparisons = function () {
    var self = this;

    this.parseComparison = function parseComparison (data, ids) { 
      _.each(ids, function(id) {
        console.log(id);
        self.renderComparison(data, id);
      });
    };

    self.renderComparison = function drawComparison (data, id) {
      // lets format the data for a single graph
      var rows = data.rows,
          names = data.metaData.names,
          plot = [
          {
            'key': 'Issues at home',
            'values': []
          }
        ],
        plotValues = plot[0].values;

      _.each(rows, function(row) {
        if (id === row[0]) {
          plotValues.push({ 
            "label" : names[row[1]],
            "value" : parseFloat(row[2])
          });
        }
      });

      $("#comparisons").append('<div id="' + id + '" class="content"><h4>' + data.metaData.names[id] + '</h4><hr/></div>');

      nv.addGraph(function () {
        var chart = nv.models.discreteBarChart()
          .x(function(d) { return d.label; })
          .y(function(d) { return d.value; })
          .margin({"bottom": 60 })
          .showValues(true);

        chart.xAxis.rotateLabels(-45);

        d3.select("#" + id).append('svg:svg')
          .datum(plot)
          .transition().duration(500)
          .call(chart);
        
        nv.utils.windowResize(chart.update);
        return chart;
      });

    };

  };

}(window, jQuery, nv));