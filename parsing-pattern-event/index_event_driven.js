const fs = require('fs');
const multer = require('multer');
const express = require('express');
let url = "mongodb://localhost:27017/";
let {PythonShell} = require('python-shell')
var events = require("events");
var eventsEmitter = new events.EventEmitter();

const app = express();
 
global.__basedir = __dirname;

var cors = require('cors')
app.use(cors())
app.options('*', cors())

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

app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
    if (fs.existsSync(__basedir + '/uploads/' + req.file.filename)) {
        filePath = __basedir + '/uploads/' + req.file.filename;
        let options = {
          mode: 'text',
          pythonPath: 'python',
          pythonOptions: ['-u'],
          scriptPath: 'C:/Users/RahulS/appDir/DCTTool/parsing-pattern-event/',
          args: [req.file.filename]
        };
        eventsEmitter.emit('read',req.file.filename);
        eventsEmitter.on('read',readFileContent);
        PythonShell.run('fileparsing.py', options, function (err, results) {
          if (err) throw err;
          console.log('results: %j', results);
        });
        eventsEmitter.on('finished',finished);

        res.json({
            'msg': 'File uploaded/import successfully!', 'file': req.file
        });
    }    
});

app.listen(8080, () => {
    console.log('PythonShell');
})

