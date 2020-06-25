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


async function runPythonShelltoParseFile(reqestedfilename) {
  let options = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'],
      scriptPath: 'C:/Users/RahulS/appDir/DCTTool/node-consolidate/backend/',
      args: [reqestedfilename]
    };

  const { success, err = '', results } = await new Promise((resolve, reject) => {
    PythonShell.run('fileparsing.py', options, function(
      err,
      results
    ) {
      if (err) {
        //logger.error(err, '[ config - runManufacturingTest() ]');
        reject({ success: false, err });
      }
      resolve({ success: true, results });
    });

    if (success) {
      const provisioningresultjson = fs.readFileSync(filePaths.provisioningresults);
      const parsedResult = JSON.parse(provisioningresultjson);
      // rest of your Code
    }
  });
}




function run(reqestedfilename) {
  return new Promise((resolve, reject) => {
    
    console.log('reqestedfilename ======================== ' + reqestedfilename);

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
          /*let options = {
            mode: 'text',
            pythonPath: 'python',
            pythonOptions: ['-u'],
            scriptPath: 'C:/Users/RahulS/appDir/DCTTool/node-consolidate/backend/',
            args: [req.file.filename]
          };*/

          /*PythonShell.run('fileparsing.py', options, function (err, results) {
            if (err) throw err;
            //console.log('results: %j', results);
            //console.log("results = ");
            console.log(results);
          });*/
          
          /*PythonShell.run('fileparsing.py', options, function (err, results) {
            if (err) throw err;
            //console.log('results: %j', results);
            //console.log("results = ");
            console.log(results);
          });*/


          /*let pyshell = new PythonShell('fileparsing.py');
          //pyshell.send(options);
          console.log("filename send args = " + req.file.filename);
          pyshell.send(req.file.filename);
          pyshell.end(function (err) {
            console.log('The script work has been finished.');
            if(err) { res.status(200).send({ error: err }); }
            else { res.status(200).send({ message : 'Success' }); }
          });*/


          //let shell = new PythonShell('fileparsing.py', options);
          /*shell.on('message', function (message) {
            //console.log('The script work has been finished.');
            //res.status(200).send({ message : 'Success' });
            res.json({
              'msg': 'File uploaded/import successfully!'
            });
          });*/


          /*shell.on('message', async (message) => {
              let msg = await message;
              console.log(msg);
              res.json({
                'msg': 'File uploaded/import successfully!', 'newmsg' : msg
              });
          });*/



          /*const { success, err = '', results } = await new Promise((resolve, reject) => {
            PythonShell.run(scriptParameters.scriptFileName, scriptParameters.options, function(
              err,
              results
            ) {
              if (err) {
                //logger.error(err, '[ config - runManufacturingTest() ]');
                reject({ success: false, err });
              }
              resolve({ success: true, results });
            });

            if (success) {
              //const provisioningresultjson = fs.readFileSync(filePaths.provisioningresults);
              //const parsedResult = JSON.parse(provisioningresultjson);
              // rest of your Code
              res.json({
                'msg': 'File uploaded/import successfully!', 'newmsg' : 'msg'
              });
            }
          });*/


          /*const runPy = async (code) => {
            try {
                const options = {
                  mode: 'text',
                  pythonPath: 'python',
                  pythonOptions: ['-u'],
                  scriptPath: 'C:/Users/RahulS/appDir/DCTTool/node-consolidate/backend/',
                  args: [req.file.filename]
                };

              // wrap it in a promise, and `await` the result
              const result = await new Promise((resolve, reject) => {
                PythonShell.run('fileparsing.py', options, (err, results) => {
                  if (err) return reject(err);
                  return resolve(results);
                });
              });
              console.log(result.stdout);
            } catch (err) {
              console.log(err);
            }             
          };

          res.json({
            'msg': 'File uploaded/import successfully!', 'newmsg' : runPy
          });*/


          (async () => {
            try {
              const output = await run(req.file.filename)
              logOutput('main')(output.message)
              res.json({
                'msg': 'File uploaded/import successfully!', 'newmsg' : 'success'
              });
              process.exit(0)
            } catch (e) {
              console.error('Error during script execution ', e.stack);
              process.exit(1);
            }
          })();


          /*async function myRequest(options) {
            return new Promise(resolve => {
                PythonShell.run('fileparsing.py', options, function (err, result) {
                    if (err) throw err;
                    console.log("in my request")
                      var myres = fileparser.OnlineUploads(req.file.filename);
                      res.json({
                        'msg': 'File uploaded/import successfully!', 'file': myres
                      });
                });
            });
          }*/

          /*return res.json({ 'msg': new Promise((resolve, reject) => {
            let result;
            let pyshell = new PythonShell('fileparsing.py', options);
            
            //pyshell.send(JSON.stringify(data['someProperty']));
            
            pyshell.on('message', function (message) {
              //result = JSON.parse(message);
              result = message;
              console.log('message');
              console.log(message);
            });
            
            pyshell.on('stderr', function (stderr) {
              console.log(stderr);
            });
            
            pyshell.end(function (err, code, signal) {
                if (err) reject(err);
                console.log('The exit code was: ' + code);
                console.log('The exit signal was: ' + signal);
                console.log('finished');
                return resolve(result);
                //res.json({
                    //'msg': 'File uploaded/import successfully!', 'file': code
                  //});
              });
            
          }) });*/


          //let varPythonShelltoParseFile = runPythonShelltoParseFile(req.file.filename);

          
      }
  });

};
