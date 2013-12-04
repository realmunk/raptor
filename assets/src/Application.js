(function (window, $, nv) {
  "use strict";

  window.RAPTOR = window.RAPTOR || {};
  var ns = window.RAPTOR;

  ns.Application = function () {

    var graphTypes = ['Proportions', 'Trends', 'Comparison'],
      app = $.sammy('#content', function () {
        this.notFound = function () {
          this.setLocation('#/');
        };
      }),
      graphs = new ns.Comparisons(),
      trendGraph = new ns.Trends(),
      proportionGraph = new ns.Proportions(),
      helpText = 'Select a graph type and a indicator group',
      apiBaseURL = '',
      user = {},
      orgUnit,
      indicatorGroups,
      indicatorGroup,
      graphType;

    // This is used as a "constructor", gets and sets our data on initiation 
    this.run = function run () {
		console.log("CONSTRUCTOR!");
      $.getJSON(apiBaseURL + 'manifest.webapp', function (data) {
        apiBaseURL = data.activities.dhis.href;
		console.log("URL: " + apiBaseURL);
        if (apiBaseURL == '*') {
          apiBaseURL = '';
        }
        $.getJSON(apiBaseURL + '/api/me.json', setUserData); 
      });      
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
      $('#graphTypes').find('.graphGroup').removeClass('active');
      $("#" + graphType).children('li').addClass('active');
    }

    function setIndicatorGroup(id) {
      indicatorGroup = id;
      $("#" + indicatorGroup).addClass('active');
    }

    function drawUserData () {
      var $element = $("#title");
      $element.find('.navbar-brand').append('<span>'+ user.location + '</span>');
    }

    function drawGraphTypes() {
      var $element = $("#graphTypes");
      $.each(graphTypes, function (index, item) {
        $element.append('<a href="javascript:void(0);" id="' + item + '"><li class="graphGroup">' + item + '</li></a>');
        $element.find('#' + item).click(function () {
          setGraphType(item);
          app.trigger('interactedEvent');
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
        $allElements.append('<a href="javascript:void(0);"><li class="indicatorGroup" id="' + indicatorGroup.id +'">' + '<div>' + indicatorGroup.name + '</div><div class="text-right">' + date.toLocaleString() + '</div></li></a>');
        $element = $allElements.find('#' + indicatorGroup.id);

        $element.click(function () {
          $allElements.find('li').removeClass('active');
          $(this).toggleClass('active');
          setIndicatorGroup(indicatorGroup.id);
          app.trigger('interactedEvent');
        });
      });
    }

    // OK ... so this is where the magic happens. 
    // We define routes, so we can utilize the standard history for browsers
    app.get('#/', function () {
      $('#content').html('');
      this.load("views/frontpage.html", function (HTML) {
        $("#content").append(HTML);
        drawGraphTypes();

        $.getJSON(apiBaseURL + "/api/indicatorGroups.json", function (data) { 
          setIndicatorGroups(data);
          drawIndicatorGroups();
          if (indicatorGroup && graphType) {
            setGraphType(graphType);
            setIndicatorGroup(indicatorGroup);
          }
          app.trigger('interactedEvent');
        });


        $('#loveButton a').click(function () {
          if (indicatorGroup && graphType) {
            app.setLocation('#/indicatorGroup/' + indicatorGroup + '/graph/' + graphType);
          }
        });
      });
    });


    app.bind('interactedEvent', function () {
      var $triggerButton = $('#loveButton a');
      var indicatorObject =_.where(indicatorGroups, { 'id': indicatorGroup })[0];
      if (indicatorGroup && graphType) {
        helpText = 'Click to load ' + graphType + ' for ' + indicatorObject.name;
        $triggerButton
          .removeClass('disabled')
          .addClass('btn-success')
          .text(helpText);
      } else {
        if (!indicatorGroup && !graphType) {
          helpText = 'Select a graph type and a indicator group';
        } else if (indicatorGroup) {
          helpText = 'Select a graph type';
        } else {
          helpText = 'Select an indicator group';
        }
        $triggerButton
          .addClass('disabled')
          .text(helpText);
      }
    });

    function getTrendData(ids) {
      var url = "/api/analytics1.json?dimension=dx:";
      _.each(ids, function(id) {
        url += id+ ";";
      });
      url += "&dimension=pe:LAST_12_MONTHS&filter=ou:" + orgUnit;
      //console.log(url);
      $.getJSON(apiBaseURL + url, function(data) {
        if(data.error) {
          console.error("dataerror2");
          return;
        }
        trendGraph.parseTrend(data, ids);
      });
    }

    app.get('#/indicatorGroup/:indicatorGroup/graph/Trends', function () {
      setGraphType('Trends');
      setIndicatorGroup(this.params.indicatorGroup);

      this.load("views/trends.html", function(HTML) {
        $("#content").html(HTML);

        $.getJSON(apiBaseURL + "/api/indicatorGroups/" + indicatorGroup, function(data) {
          if (data.error) {
            console.error("dataerror");
            return;
          }
          getTrendData(_.pluck(data.indicators, 'id'));
        });
      });

    });


    function getComparisonData(ids) {
      //console.log(ids);
      var url = "/api/analytics2.json?dimension=dx:";
      _.each(ids, function(id) {
        url += id+ ";";
      });
      url += "&dimension=ou:USER_ORGUNIT_CHILDREN&filter=pe:LAST_QUARTER";
      $.getJSON(apiBaseURL + url, function(data) {
        if(data.error) {
          console.error("dataerror2");
          return;
        }
        graphs.parseComparison(data, ids);
      });
    }

    app.get('#/indicatorGroup/:indicatorGroup/graph/Comparison', function () {
      setGraphType('Comparison');
      setIndicatorGroup(this.params.indicatorGroup);

      this.load("views/comparison.html", function(HTML) {
        $("#content").html(HTML);
        $.getJSON(apiBaseURL + "/api/indicatorGroups/" + indicatorGroup, function(data) {
          if (data.error) {
            console.error("dataerror");
            return;
          }
          getComparisonData(_.pluck(data.indicators, 'id'));
        });
      });
    });

    function getProportionData(ids) {
      var url = "/api/analytics3.json?dimension=J5jldMd8OHv:CXw2yu5fodb;EYbopBOJWsW;RXL3lPSK8oG;tDZVQ1WtwpA;uYxK4wmcPqA";
      url += "&dimension=dx:";

      _.each(ids, function(id) {
        url += id+ ";";
      });

      url += "&filter=pe:LAST_QUARTER&filter=ou:" + orgUnit; 
      $.getJSON(apiBaseURL + url, function(data) {
        if(data.error) {
          console.error("dataerror2");
          return;
        }
        proportionGraph.parseProportion(data, ids);
      });
    }

    app.get('#/indicatorGroup/:indicatorGroup/graph/Proportions', function () {
      
      setGraphType('Proportions');
      setIndicatorGroup(this.params.indicatorGroup);

      this.load('views/proportions.html', function(HTML) {
        $.getJSON(apiBaseURL + "/api/indicatorGroups/" + indicatorGroup, function(data) {
          if (data.error) {
            console.error("dataerror");
            return;
          }        
          getProportionData(_.pluck(data.indicators, 'id'));
        });
        $("#content").html(HTML);
      });
    
    });

  };

  // Lets start our app!
  $(document).ready(function () {
    var app = new ns.Application();
    app.run();
  });

}(window, jQuery, nv));