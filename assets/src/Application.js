(function (window, $, nv) {
  "use strict";  

  window.RAPTOR = window.RAPTOR || {};
  var ns = window.RAPTOR;

  ns.Application = function (dev) {

    var orgUnit,
      indicatorGroups,
      indicator,
      graphType,
      graphTypes = ['Proportions', 'Trends','Comparison'];

    function setOrganisationUnit(data) {
      orgUnit = data.organisationUnits[0].id;
    }


    function setGraphType(type) {
      console.log(type);
      graphType = type;
    }

    function drawGraphTypes() {
      var $element = $("#content").append('<div class="btn-group btn-group-justified">').find('.btn-group');

      $.each(graphTypes, function (index, item) {
        $element.append('<a href="javascript:void(0);" class="btn btn-info" id="' + item + '">' + item + '</a>');
        $element.find('#'+ item).click(function () {
          setGraphType(item);
          $element.find('.btn-info').removeClass('active');
          $(this).toggleClass('active');
        });
      });
    }

    function setIndicator(id) {
      indicator = id;
      console.log(indicator);
    }

    function setIndicatorGroups(data) {
      // If we need to further parse the data, this can be done here.
      indicatorGroups = data.indicatorGroups;
      // lets draw it in our view
      drawIndicatorGroups(indicatorGroups);
    }


    /**
      OK ... alot of stuff happening here.
      _.each accepts a collection, and applies a function for every single item in the collection.
      Here we select our list ... and append a list item.
      Then we select the appended item and create a click function for the baby. 
      The click function sets the proper class, and the correct indicator.
    */
    function drawIndicatorGroups(indicatorGroups) {
      var $allElements, $element;

      $('#content').append('<ul class="list-group"></ul>');
      $allElements = $('#content ul');

      _.each(indicatorGroups, function (indicatorGroup) {
        
        $allElements.append('<li class="list-group-item" id="' + indicatorGroup.id +'">' + indicatorGroup.name + '</li>');
        $element = $allElements.find('#' + indicatorGroup.id);
        
        $element.click(function () {
          setIndicator(indicatorGroup.id);
          $allElements.find('li').removeClass('active');
          $(this).toggleClass('active');
        });
      });
    }

    // This is a constructor, gets and sets our data on initiation 
    (function () {
      $.getJSON("api/me.json", setOrganisationUnit);
      $.getJSON("api/indicatorGroups.json", setIndicatorGroups);
      drawGraphTypes();
    }());
  };

  // Lets start our app!
  $(document).ready(function () {
    var app = new ns.Application(true); 
  });

}(window, jQuery, nv));