(function (window, $, nv) {

	$(document).ready(function () {

		$("#indicatorGroups").prepend("<h2>Please choose your indicator<h2>");
		$("#indicatorGroups").append("<p>Some selector<p>");

		function selectIndicator(data) {

		}

		$("#content").prepend("<h2>Some histogram<h2>");
    	$("#content").append('<div id="histo"><svg></svg></div>');

		function drawHisto(data) {
			var rows = data.rows,
				meta = data.metaData,
				plotData = {"key" : "TestHisto", "values" : []};

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

				d3.select("#histo svg")
					.datum(points)
					.transition().duration(500)
					.attr("width", 400)
					.attr("height",100) //Kristian, hvorfor funker ikke dette?
					.call(chart);
				
				nv.utils.windowResize(chart.update);
				return chart;
			});
		}	

		$("#content").append("<h2>Some pie<h2>");
    	$("#content").append('<div id="pie"><svg></svg></div>');

		function drawPie(data) {
			var rows = data.rows,
				meta = data.metaData,
				plotData = {"key" : "TestPie", "values" : []};

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
				var chart = nv.models.pieChart()
					.x(function(d) { console.log(d.label); return d.label; })
					.y(function(d) { return d.value; })
					.showLabels(true);

				d3.select("#pie svg")
					.datum(points[0].values)
					.transition().duration(1200)
					.call(chart);

				return chart;
			});

		}


		function drawTrend() {

		}

		$.getJSON("assets/testdata/analytics.json", drawHisto);
		$.getJSON("assets/testdata/analytics.json", drawPie);
	});


}(window, jQuery, nv));