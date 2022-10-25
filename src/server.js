const express= require('express');
const app=express();
const upload = require('./middleware/upload');
const csvController = require('./controller/csvcontroller');
const db = require("./models");

app.set('view engine','ejs');//using ejs template for front end
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

global.__basedir = __dirname + "/..";

app.get('/',(req,res)=>{
  res.render('home')
})
app.post('/upload',upload.single("file"),csvController.upload);
app.get('/getdata',csvController.getTicker);

db.sequelize.sync()


app.listen(8888, () => {
  console.log(`Running at port 8888 `);
});

//Paste ->http://localhost:8888/ in browser after running this server.js to view page to upload csv file. 