(function (window, $, nv) {
  
  // Lets start our app!
  $(document).ready(function () {
    var data;

    $("#content").prepend('<h1>Hello. This is our application.</h1>');
    $("#content").append('<div id="chart"><svg></svg></div>');
    
    function success(data) {
      console.log("Bro!");
      nv.addGraph(function() {
        var chart = nv.models.pieChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .showLabels(true);
          d3.select("#chart svg")
              .datum(data.values)
            .transition().duration(1200)
              .call(chart);
        return chart;
      });
    }

    $.getJSON("assets/testdata/testForPie.json", success);

  });

}(window, jQuery, nv));