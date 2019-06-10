var express = require('express');
var app     = express();
var Docker  = require('dockerode');
var docker  = new Docker({ socketPath: '/var/run/docker.sock' });
const cors = require('cors')
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
var fs = require('fs');
// Renn
const bodyParser = require('body-parser')
// Renn

  
app.use(cors(corsOptions))    
app.get('/start', function(req, res) {
    targetcontainer = docker.getContainer(req.query.name).start();
    res.send('Started ' + req.query.name);
	console.log('Started ' + req.query.name);
});

app.get('/stop', function(req, res) {
    targetcontainer = docker.getContainer(req.query.name).stop();
    res.send('Stopped ' + req.query.name);
	console.log('Stopped ' + req.query.name);
});

app.get('/status', function(req, res) {
    targetcontainer = docker.getContainer(req.query.name).inspect(function (err, data) {
    res.send(data.State.Status)
    });
});

app.get('/getData', (req, res) => {
    res.json(req.query.name)
    fs.appendFile('tools_selection.json', JSON.stringify(JSON.parse(req.query.name)), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
})

app.get('/readData', (req, res) => {
    var jsonfile;
    fs.readFile('tools_selection.json', 'utf8', function (err, data) {
    if (err) throw err
    jsonfile = JSON.stringify(data)
    // console.log(jsonfile)
    console.log(res)
    res.json(data)
    });
    // console.log(data)
})

app.listen(5000, console.log.call(console, 'Server started at port 5000'));


