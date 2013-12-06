var requirejs = require('requirejs'),
  path = require('path'),
  fs = require('fs'),
  localpath = path.resolve(__dirname, "..", "versions");

var config = {
  appDir: "public",
  baseUrl: "assets",
  dir: "app-prod",
  mainConfigFile: 'public/assets/src/reqconf.js',
  modules: [{  name: "application" }],
  findNestedDependencies: true,
  removeCombined: true,
  uglify: {
    no_mangle: false,
    no_mangle_functions: true
  },
  logging: 1,
  fileExclusionRegExp: /^\./,
  onBuildRead: function (moduleName, path, contents) {
    console.log("Reading " + moduleName);
    return contents;
  },
  onModuleBundleComplete: function (data) {
    console.log("==================================");
    console.log("    Build successful: " + data.name);
    console.log("==================================");
    console.log("Removing unecessary files and optimizing ...");  
  }
};

requirejs.optimize(config, function (buildResponse) {
    //buildResponse is just a text output of the modules
    //included. Load the built file for the contents.
    //Use config.out to get the optimized file contents.
    var contents = fs.readFileSync(config.out, 'utf8');
  }, function(err) {
    //optimization err callback
    console.error("Build failed on: ");
    console.error(err);
  }
);

fs.readFile(localpath + '/manifest.webapp', function (err, data) {
  if (err) {
    throw err;
  }
  var manifest = JSON.parse(data);
  manifest.version =  parseInt(manifest.version) + 0.1;
  manifest.name = "Easy Visualization " + manifest.version;
  fs.writeFile(localpath + '/manifest.webapp', JSON.stringify(manifest), {'flags': 'w'}, function (err) {
    if (err) {
      console.error("Failed while updating manifest. Contact Kristian!");
    } else {
      console.log("Succesfully updated version");
    }
  });
});

// // create a zip!
// var AdmZip = require('adm-zip'),
//   zip = new AdmZip();

// zip.addLocalFolder(path.resolve(__dirname, "..", "app-prod"), '/');
// // add a local file
// zip.addLocalFile(localpath + '/manifest.webapp');
// zip.writeZip(localpath + '/raptor.zip');