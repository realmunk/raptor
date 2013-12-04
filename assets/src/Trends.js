(function (window, $, nv) {

	window.RAPTOR = window.RAPTOR || {};
	var ns = window.RAPTOR;

	ns.Trends = function () {
		var self = this;

		this.parseTrend = function parseTrend(data, ids) {
      _.each(ids, function(id) {
        self.drawTrend(data, id);
      });
		};

		self.drawTrend = function drawTrend(data, id) {
			var rows = data.rows,
				names = data.metaData.names,
				plotData = [{
					"key": names[id],
					"values": []
				}];

			$("#trends").append('<div class="content" id="' + id + '"><h4>' + data.metaData.names[id] + '</h4><hr/></div>');

			_.each(rows, function (row) {
				if (id === row[0]) {
					plotData[0].values.push({
						x: new Date(row[1].slice(0, 4), row[1].slice(4, 6)),
						y: parseFloat(row[2])
					});
				}
			});

      function setHeight() {
        var height = $(window).height();
        $('svg').css('height', height - 150);
      }

			nv.addGraph(function () {
        try {
          var chart = nv.models.lineChart();
          chart.lines.xScale(d3.time.scale.utc());
          
          chart.margin({"left": 50, "bottom": 75 });

          chart.xAxis
            .tickFormat(function (d) {
              return d3.time.format('%b %y')(new Date(d));
            })
            .ticks(d3.time.days, 1)
            .axisLabel('Time');

            chart.yAxis
              .axisLabel(id)
              .tickFormat(d3.format('.02f'));

            chart.xAxis.rotateLabels(-45);

            d3.select("#" + id).append('svg:svg')
              .datum(plotData)
              .transition().duration(500)
              .call(chart);

            nv.utils.windowResize(function () {
              setHeight();
              chart.update(); 
            });
          setHeight();
          chart.update();
          return chart;
        } catch (e) {
          console.warn("We just caught an error");
        }
      });
		};
	};

}(window, jQuery, nv));