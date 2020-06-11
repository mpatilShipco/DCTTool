const fs = require('fs');
const multer = require('multer');
const express = require('express');

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

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
    try {
      if (fs.existsSync(__basedir + '/uploads/' + req.file.filename)) {
        console.log("File Existsssssssssssssssssssssssssssssssssssssssssssssssssssssss" + __basedir + '/uploads/' + req.file.filename);
      }
    } catch(err) {
      console.error(err)
    }

    importfile(__basedir + '/uploads/' + req.file.filename);
    res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
    });
});


app.listen(8080, () => {
    console.log(`Express is running on port 8080`)
})

function importfile(filePath){
    console.log("filePath " + filePath);
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets:[{
            name: 'ofr',
            header:{
               rows: 1
            },
            columnToKey: {
                A: '_id',
                B: 'Customer',
                C: 'WWA_Member',
                D: 'Origin_Region',
                E: 'Origin_Inland_CFS',
                F: 'Consol_CFS',
                G: 'Port_Of_Loading',
                H: 'Transhipment_1',
                I: 'Transhipment_2',
                J: 'Transhipment_3',
                K: 'Destination_Region',
                L: 'Port_of_Discharge',
                M: 'Deconsol_CFS',
                N: 'Destination_Inland_CFS',
                O: 'Quoting_Region',
                P: 'Transit_Time',
                Q: 'Currency',
                R: 'Container_Loading',
                S: 'Rate_basis',
                T: 'Minimum',
                U: 'Maximum',
                V: 'Notes',
                W: 'Effective_Date',
                X: 'Expiration_Date',
                Y: 'Currency',
                Z: 'Container_Dray',
                AA: 'Rate_basis',
                AB: 'Minimum',
                AC: 'Maximum',
                AD: 'Notes',
                AE: 'Effective_Date',
                AF: 'Expiration_Date',
                AG: 'Currency',
                AH: 'Ocean_Freight',
                AI: 'Rate_basis',
                AJ: 'From',
                AK: 'To',
                AL: 'Minimum',
                AM: 'Maximum',
                AN: 'Notes',
                AO: 'Effective_Date',
                AP: 'Expiration_Date',
                AQ: 'Currency',
                AR: 'Documentation',
                AS: 'Rate_basis',
                AT: 'Minimum',
                AU: 'Maximum',
                AV: 'Notes',
                AW: 'Effective_Date',
                AX: 'Expiration_Date',
                AY: 'Currency',
                AZ: 'Low_Sulphur_Fuel'
            }
        }]
    });
 
    console.log(excelData);      
    const tot = 0; 
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        let dbo = db.db("wwa");
        //dbo.collection("grdb_OceanFreight_Write").insertMany(excelData.Customers, (err, res) => {
        dbo.collection("grdb_OceanFreight_Write").insertMany(excelData.ofr, (err, res) => {
            if (err) throw err;
            console.log("Total Inserted: " + res.insertedCount);
            tot = res.insertedCount;
            db.close();
        });
    });
      
    fs.unlinkSync(filePath);

    //return tot;
}