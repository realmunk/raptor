(function (window, $, nv) {

  window.RAPTOR = window.RAPTOR || {};
  var ns = window.RAPTOR;

  ns.Trends = function () {
    var self = this;

    this.parseTrend = function parseTrend (data, ids) { 
      _.each(ids, function(id) {
        //self.drawTrend(data, id);
      });
      self.drawTrend(data, ids[0]);
    }

    self.drawTrend = function drawTrend (data, id) {
      var rows = data.rows,
          names = data.metaData.names,
          plotData = [{
          "key" : id,
          "values" : []
          }];

      $("#trends").append("<h2>" + data.metaData.names[id] + "<h2>");
      $("#trends").append('<div id=' + id + '><svg></svg></div>');

      console.log("heidu " + id);
      console.log(rows);

      _.each(rows, function(row) {
        if (id === row[0]) {
          plotData[0].values.push({x : new Date(row[1]) , y: parseFloat(row[2])});
        }
      });

      console.log("yolotolo");
      console.log(plotData);

      nv.addGraph(function () {
        var chart = nv.models.lineChart();

        d3.scale.ordinal();
		
		    chart.xAxis
              .tickFormat(function(d) { console.log(d); return d3.time.format('%b %d')(new Date(d)); })
            //.tickFormat(function(d, i) { return "yolo " + d[1]; })
            .axisLabel('Time');
 
		    chart.yAxis       
		        .axisLabel(id)
		        .tickFormat(d3.format('.02f'));

        chart.xAxis.rotateLabels(-45);

        d3.select("#" + id + " svg")
          .datum(plotData)
          .transition().duration(500)
          .call(chart);
        
        nv.utils.windowResize(chart.update);
        return chart;

      });
    };
  };

}(window, jQuery, nv));