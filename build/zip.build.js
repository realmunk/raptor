var path = require('path'),
  AdmZip = require('adm-zip'),
  zip = new AdmZip(),
  localPath = path.resolve(__dirname, "..", "versions");

zip.addLocalFolder(path.resolve(__dirname, "..", "app-prod"), '/');
// add a local file
zip.addLocalFile(localPath + '/manifest.webapp');
zip.writeZip(localPath + '/raptor.zip');