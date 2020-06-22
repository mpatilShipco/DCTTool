const fs = require('fs');
const multer = require('multer');
const express = require('express');
let url = "mongodb://localhost:27017/";
let {PythonShell} = require('python-shell')
var events = require("events");
var eventsEmitter = new events.EventEmitter();
var chokidar = require('chokidar');
const fsex = require('fs-extra')

const { authJwt } = require("../middlewares");

global.__basedir = __dirname;
var aGlobPathUpload = __basedir.split("app\\");
global.__cGlobPathUpload = aGlobPathUpload[0] + '/uploads/';
global.__cGlobPathSuccess = aGlobPathUpload[0] + '/python_file_writer/';

var pathtowatch = __cGlobPathUpload;
var watcher = chokidar.watch(pathtowatch, {ignored: /^\./, persistent: true});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __cGlobPathUpload)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});
 
const upload = multer({storage: storage});

const fileparserDef = require("../fileparserDef/fileparserDef");
var fileparser = fileparserDef.fileuploadsTemplateOne("Uploads");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
    //copy to diff directory once file come
    var pathtowatch = __cGlobPathUpload;
    var oldpathwithfile = pathtowatch + req.file.filename;
    var newpathwithfile = __cGlobPathSuccess + 'copy_' + req.file.filename;

    //console.log('__cGlobPathUpload ********************************* ' + __cGlobPathUpload);
    //console.log('__cGlobPathSuccess ********************************* ' + __cGlobPathSuccess);

    watcher
      .on('add', function(pathtowatch) {
        console.log('File', pathtowatch, 'has been added');
        fsex.copy(oldpathwithfile, newpathwithfile)
      })
      // .on('change', function(pathtowatch) {
      //   console.log('File', pathtowatch, 'has been changed');
      // })
      .on('unlink', function(pathtowatch) {
        console.log('File', pathtowatch, 'has been removed');
      });

    //Read using Node JS
    // eventsEmitter.on('read',readFileContent);
    // eventsEmitter.on('display',displayFileContent);
    // eventsEmitter.on('finished',finished);
    // eventsEmitter.emit('read',__basedir + '/uploads/' + req.file.filename);

      if (fs.existsSync(__cGlobPathUpload + req.file.filename)) {
          filePath = __cGlobPathUpload + req.file.filename;
          let options = {
            mode: 'text',
            pythonPath: 'python',
            pythonOptions: ['-u'],
            scriptPath: 'C:/Users/RahulS/appDir/DCTTool/node-consolidate/backend/',
            args: [req.file.filename]
          };
          
          PythonShell.run('fileparsing.py', options, function (err, results) {
            if (err) throw err;
            //console.log('results: %j', results);
            //console.log("results = ");
            console.log(results);
          });

          var myres = fileparser.OnlineUploads(req.file.filename);
          res.json({
            'msg': 'File uploaded/import successfully!', 'file': myres
          });
      }
  });

};
