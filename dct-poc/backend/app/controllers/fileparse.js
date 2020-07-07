class Fileparser {
    constructor(mylbl) {
        this.label = mylbl;
    }

  OnlineUploads(reqestedfilename) {
        //return this.label = "Online Uploads " + filename;
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

    AccurateUploads() {
        return this.label = "Accurate Uploads " + filename;
    }
}

module.exports = Fileparser;
