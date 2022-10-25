const multer = require('multer')
// const path = require('path');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log('inside multer..');
      cb(null, __basedir + "/uploads/");//storing the uploaded .csv filein this directory
    },
    filename: (req, file, cb) => {
      console.log(file.originalname);
      cb(null,Date.now()+file.originalname);//to keep the csv files unique
    },
});
  

var upload = multer({ storage: storage});
module.exports = upload;