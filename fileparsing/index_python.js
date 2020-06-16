const fs = require('fs');
const multer = require('multer');
const express = require('express');

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

//import {PythonShell} from 'python-shell';
let {PythonShell} = require('python-shell')


const excelToJson = require('convert-excel-to-json');
 
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

app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
    //importfile(__basedir + '/uploads/' + req.file.filename);
    if (fs.existsSync(__basedir + '/uploads/' + req.file.filename)) {
        console.log('__basedir = ' + __basedir);
        console.log("File Existsssssssssssssssssssssssssssssssssssssssssssssssssssssss" + __basedir + '/uploads/' + req.file.filename);
    }
    
    //importfile(__basedir + '/uploads/' + req.file.filename);
    filePath = __basedir + '/uploads/' + req.file.filename;
    let options = {
      mode: 'text',
      pythonPath: 'C:/Users/RahulS/AppData/Local/Programs/Python/Python38-32',
      //pythonPath: '/usr/bin/python',
      //pythonPath: 'C:\\Users\\RahulS\\AppData\\Local\\Programs\\Python\\Python38-32',
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: 'C:/Users/RahulS/appDir/DCTTool/fileparsing/my_script.py',
      //scriptPath: 'C:\\Users\\RahulS\\appDir\\DCTTool\\fileparsing\\my_script.py,'
      //scriptPath: 'C://Users//RahulS//appDir//DCTTool//fileparsing//my_script.py,'
      //args: [req.file.fieldname]
      args: ['value1', 'value2', 'value3']
    };

    // var options = {
    //   mode: 'text',
    //   pythonPath: 'C:\\Python\\pythonw.exe',
    //   pythonOptions: ['-u'],
    //   scriptPath: 'C:\\Users\\Shubham\\Google Drive\\Capstone\\Theme Extraction',
    //   args: ['value1', 'value2', 'value3']
    // }; 

    PythonShell.run('C:/Users/RahulS/appDir/DCTTool/fileparsing/my_script.py', options, function (err, results) {
    //PythonShell.run('C:/Users/RahulS/appDir/DCTTool/fileparsing/my_script.py', null, function (err, results) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log('results: %j', results);
    });


    res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
    });
});

app.listen(8080, () => {
    console.log('PythonShell');
})

