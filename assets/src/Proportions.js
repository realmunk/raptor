define('proportions', ['nvd3', 'jquery', 'underscore'], 
  function (nvd3, $, _) {   
    var self = this;

    function drawProportion (data, id) {
      var rows = data.rows,
          names = data.metaData.names,
          plotData = [{
          "key": id,
          "values": []
        }];

      $("#proportions").append('<div class="content" id="' + id + '"><h4>' + data.metaData.names[id] + '</h4><hr/></div>');

      function setHeight() {
        var height = $(window).height();
        $('svg').css('height', height - 75);
      }
      _.each(rows, function(row) {
        if (id === row[1]) {
          plotData[0].values.push({ 
            "label" : names[row[0]],
            "value" : parseFloat(row[2])
          });
        }
      });

      nv.addGraph(function () {
        try {
          var chart = nv.models.pieChart()
            .x(function(d) { return d.label; })
            .y(function(d) { return d.value; })
            .showLabels(true);

          d3.select("#" + id).append('svg:svg')
            .datum(plotData[0].values)
            .transition().duration(1200)
            .call(chart);
          
          nv.utils.windowResize(function () {
            setHeight();
            chart.update();
          });

          setHeight();
          chart.update();

          return chart;
        } catch (e) {
         console.warn("We just caught an error.");
        }
      });
    };

    return {
      'parse': function parseProportion (data, ids) { 
        _.each(ids, function(id) {
          drawProportion(data, id);
        });
      }
    }
  }
);