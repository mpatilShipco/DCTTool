const fs = require('fs');
const multer = require('multer');
const express = require('express');
let url = "mongodb://localhost:27017/";
let {PythonShell} = require('python-shell')
var events = require("events");
var eventsEmitter = new events.EventEmitter();
var chokidar = require('chokidar');
const fsex = require('fs-extra')

const { spawn } = require('child_process')
const logOutput = (name) => (data) => console.log(`[${name}] ${data}`)

const { authJwt } = require("../middlewares");

global.__basedir = __dirname;
global.aGlobPathUpload = __basedir.split("backend\\");
global.__cGlobPathUpload = aGlobPathUpload[0] + '/src/assets/uploads/';
global.__cGlobPathSuccess = aGlobPathUpload[0] + '/src/assets/python_file_writer/';

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
//const upload = multer({storage: storage}).single("uploadfile");

const fileparserDef = require("../fileparserDef/fileparserDef");
//var fileparser = fileparserDef.fileuploadsTemplateOne("Uploads");


function runPythonShelltoParseFile(reqestedfilename) {
  return new Promise((resolve, reject) => {
    
    //console.log('reqestedfilename ======================== ' + reqestedfilename);

    const process = spawn('python', ['fileparsing.py', reqestedfilename, reqestedfilename]);
    const out = []
    process.stdout.on(
      'data',
      (data) => {
        out.push(data.toString());
        logOutput('stdout')(data);
      }
    );
    const err = []
    process.stderr.on(
      'data',
      (data) => {
        err.push(data.toString());
        logOutput('stderr')(data);
      }
    );
    process.on('exit', (code, signal) => {
      logOutput('exit')(`${code} (${signal})`)
      resolve(out);
    });
  });
}


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
    
    //console.log('aGlobPathUpload = ')
    //console.log(aGlobPathUpload[0]);

    //console.log('REQUESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT = ')
    //console.log(req.file);

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

          (async () => {
            try {
              //var fileparser = fileparserDef.fileuploadsTemplateOne(req.file.filename);

              const output = await fileparserDef.fileuploadsTemplateOne(req.file.filename)

              //const output = await runPythonShelltoParseFile(req.file.filename)
              logOutput('main')(output.message)
              res.json({
                'msg': 'File uploaded/import successfully!',
                'filename' : req.file.filename
              });
              process.exit(0)
            } catch (e) {
              console.error('Error during script execution ', e.stack);
              process.exit(1);
            }
          })();
          
      }
  });

};
