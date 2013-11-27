(function (window, $, nv) {
  "use strict";

  window.RAPTOR = window.RAPTOR || {};
  var ns = window.RAPTOR;

  ns.Application = function () {

    var graphTypes = ['Proportions', 'Trends', 'Comparison'],
      app = $.sammy('#content'),
      graphs = new ns.Graphs(),
      user = {},
      orgUnit,
      indicatorGroups,
      indicator,
      graphType;
    // This is used as a "constructor", gets and sets our data on initiation 
    this.run = function run () {
      $.getJSON("api/me.json", setUserData);
      app.run("#/");
    };

    function setUserData(data) {
      user.location = data.organisationUnits[0].name;
      user.name = data.name;
      orgUnit = data.organisationUnits[0].id;
      drawUserData();
    }

    // If we need to further parse this data, this can be done here.
    function setIndicatorGroups(data) {
      indicatorGroups = data.indicatorGroups;
    }


    function setGraphType(type) {
      graphType = type;
    }

    function setIndicator(id) {
      indicator = id;
    }
    function drawUserData () {
      var $element = $("#title");
      $element.find('.navbar-brand').text(user.location);
    }

    function drawGraphTypes() {
      var $element = $("#graphTypes");
      $.each(graphTypes, function (index, item) {
        $element.append('<a href="#/indicator/' + indicator + '/graph/' + item + '" class="btn btn-info" id="' + item + '">' + item + '</a>');
        $element.find('#' + item).click(function () {
          setGraphType(item);
          $element.find('.btn-info').removeClass('active');
          $(this).toggleClass('active');
        });
      });
    }

    /**
      OK ... alot of stuff happening here.
      _.each accepts a collection, and applies a function for every single item in the collection.
      Here we select our list ... and append a list item.
      Then we select the appended item and create a click function for the baby. 
      The click function sets the proper class, and the correct indicator.
    */
    function drawIndicatorGroups() {
      var $allElements, 
        $element,
        date;

      $allElements = $('#indicators');

      _.each(indicatorGroups, function (indicatorGroup) {
        date = new Date(indicatorGroup.lastUpdated);
        $allElements.append('<a href="#/indicator/' + indicatorGroup.id + '"><li class="indicator" id="' + indicatorGroup.id +'">' + '<span class="name">' + indicatorGroup.name + '<span class="pull-right">' + date.toLocaleString() + '</span></li></a>');
        $element = $allElements.find('#' + indicatorGroup.id);

        $element.click(function () {
          setIndicator(indicatorGroup.id);
          $allElements.find('li').removeClass('active');
          $(this).toggleClass('active');
        });
      });
    }

    // OK ... so this is where the magic happens. 
    // We define routes, so we can utilize the standard history for browsers
    app.get('#/', function () {

      this.load("/views/indicators.html", function (HTML) {

        $("#content").html(HTML);

        $.getJSON("api/indicatorGroups.json", function (data) { 
          setIndicatorGroups(data);
          drawIndicatorGroups();
        });

      });

    });

    app.get('#/indicator/:indicator', function () {
      if (!indicator) {
        indicator = this.params.indicator;
      }
      this.load("/views/graphtypes.html", function (HTML) {
        $("#content").html(HTML);
        drawGraphTypes();
      });
    });

    app.get('#/indicator/:indicator/graph/:type', function () {

      if (!indicator) {
        indicator = this.params.indicator;
      }

      if (!graphType) {
        graphType = this.params.type;
      }
      if (graphType === 'Comparison') {     
        this.load("/views/comparison.html", function (HTML) {
          $("#content").html(HTML);
          graphs.drawComparison();
        });
      } else if (graphType === 'Trends') {
        this.load("/views/trends.html", function (HTML) {
          $("#content").html(HTML);
          graphs.drawTrends();
        });
      } else {
        this.load("/views/proportions.html", function (HTML) {
          $("#content").html(HTML);
          graphs.drawProportions();
        });
      }
    });

  };

  // Lets start our app!
  $(document).ready(function () {
    var app = new ns.Application();
    app.run();
  });

}(window, jQuery, nv));