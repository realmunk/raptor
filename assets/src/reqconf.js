require.config({
  baseUrl: "assets",
  paths: {
    // loading libraries
    jquery: 'lib/jquery',
    d3: 'lib/d3.v3.min',
    underscore: 'lib/underscore-min',
    nvd3: 'lib/nv.d3.min',
    sammy: 'lib/sammy',
    bootstrap: 'lib/bootstrap.min',
    // loading src
    application: 'src/Application',
    comparisons: 'src/Comparisons',
    trends: 'src/Trends',
    proportions: 'src/Proportions'

  },
  shim: {
    d3: {
      exports: 'd3'
    },
    underscore: {
      exports: '_'
    },
    nvd3: {
      deps: ['d3'],
      exports: 'nvd3'
    },
    sammy: {
      deps: ['jquery']
    }
  }
});

require(['application'], function (app) {
  app.run();
});