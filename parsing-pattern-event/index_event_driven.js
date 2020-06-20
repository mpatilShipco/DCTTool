const fs = require('fs');
const multer = require('multer');
const express = require('express');
let url = "mongodb://localhost:27017/";
let {PythonShell} = require('python-shell')
var events = require("events");
var eventsEmitter = new events.EventEmitter();
var chokidar = require('chokidar');
const fsex = require('fs-extra')

// chokidar.watch('.').on('all', (event, path) => {
//   console.log(event, path);
// });

const app = express();
 
global.__basedir = __dirname;

var cors = require('cors')
app.use(cors())
app.options('*', cors())


var pathtowatch = __basedir + '/uploads/';
var watcher = chokidar.watch(pathtowatch, {ignored: /^\./, persistent: true});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});
 
const upload = multer({storage: storage});

function readFileContent(fileName){
    console.log("Reading " + fileName + " file started:");
    fs.readFile(fileName, 'utf8', readFile);
}

function finished(){
  console.log("Reading and Printing File content job is done successfully.");
}

function readFile(err,data,fileName) {
    console.log("Reading " + fileName + " file done successfully.");
    eventsEmitter.emit('display',data);
}

function readFileContent(fileName){
    console.log("Reading " + fileName + " file started:");
    fs.readFile(fileName, 'utf8', readFile);
}

function  displayFileContent(data){
    console.log("File Data:");
    //console.log(data);
    eventsEmitter.emit('finished');
}

function finished(){
  console.log("Reading and Printing File content job is done successfully.");
}

function readFile(err,data,fileName) {
    console.log("Reading " + fileName + " file done successfully.");
    eventsEmitter.emit('display',data);
}

app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
  //copy to diff directory once file come
  var pathtowatch = __basedir + '/uploads/';
  var oldpathwithfile = pathtowatch + req.file.filename;
  var newpathwithfile = __basedir + '/python_file_writer/copy_' + req.file.filename;

  watcher
    .on('add', function(pathtowatch) {
      console.log('File', pathtowatch, 'has been added');
      fsex.copy(oldpathwithfile, newpathwithfile)
    })
    .on('change', function(pathtowatch) {
      console.log('File', pathtowatch, 'has been changed');
    })
    .on('unlink', function(pathtowatch) {
      console.log('File', pathtowatch, 'has been removed');
    });

  //Read using Node JS
  eventsEmitter.on('read',readFileContent);
  eventsEmitter.on('display',displayFileContent);
  eventsEmitter.on('finished',finished);
  eventsEmitter.emit('read',__basedir + '/uploads/' + req.file.filename);

    if (fs.existsSync(__basedir + '/uploads/' + req.file.filename)) {
        filePath = __basedir + '/uploads/' + req.file.filename;
        let options = {
          mode: 'text',
          pythonPath: 'python',
          pythonOptions: ['-u'],
          scriptPath: 'C:/Users/RahulS/appDir/DCTTool/parsing-pattern-event/',
          args: [req.file.filename]
        };
        
        PythonShell.run('fileparsing.py', options, function (err, results) {
          if (err) throw err;
          console.log('results: %j', results);
        });
        

        res.json({
            'msg': 'File uploaded/import successfully!', 'file': req.file
        });
    }    
});

app.listen(8080, () => {
    console.log('PythonShell');
})