(function (window, $, nv) {

  window.RAPTOR = window.RAPTOR || {};
  var ns = window.RAPTOR;

  ns.Proportions = function () {
    var self = this;

    this.parseProportion = function parseProportion (data, ids) { 
      _.each(ids, function(id) {
        self.drawProportion(data, id);
      });
    };

    self.drawProportion = function drawProportion (data, id) {
      var rows = data.rows,
          names = data.metaData.names,
          plotData = [{
					"key": id,
					"values": []
				}];

      $("#proportions").append("<h2>" + data.metaData.names[id] + "<h2>");
      $("#proportions").append('<div id=' + id + '><svg></svg></div>');

      _.each(rows, function(row) {
        if (id === row[1]) {
          //console.log(row[1]);
          plotData[0].values.push({ 
            "label" : names[row[0]],
            "value" : parseFloat(row[2])
          });
		  //console.log(plotData[0]);
        }
      });

      nv.addGraph(function () {
        var chart = nv.models.pieChart()
			.x(function(d) { return d.label; })
			.y(function(d) { return d.value; })
			.showLabels(true);
			
		
        d3.select("#" + id + " svg")
          .datum(function (){
			return [
			plotData[0]
		  ];})
          .transition().duration(1200)
          .call(chart);
        
        nv.utils.windowResize(chart.update);
        return chart;
      });

    };

  };

}(window, jQuery, nv));