require('express-group-routes');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const bodyParser = require('body-parser');
const { executeCommand } = require('./app/utils/commandRunner');
const dockerRouter = require('./app/routes/v1/docker');
const ansibleRouter = require('./app/routes/v1/ansible');
const ldapRouter = require('./app/routes/v1/ldap');
var fs = require('fs');

app.set('port', process.env.PORT || 5000)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.group('/api/v1', (router) => {
    router.use('/docker', dockerRouter)
    router.use('/ansible', ansibleRouter)
    router.use('/ldap', ldapRouter)
});

app.get('/test', function(req, res) {
    res.sendFile(`${__dirname}/app/views/test.html`);
});

app.get('/api/getData', function(req, res) {
 res.json(req.query.name)
 fs.appendFile('tools_selection.json', req.query.name, function (err) {
     if (err) throw err;
     console.log('Saved!');
 });
});

app.get('/api/readData', (req, res) => {
 var jsonfile;
 fs.readFile('tools_selection.json', 'utf8', function (err, data) {
    if (err) throw err
    jsonfile = JSON.parse(data)
    console.log(jsonfile)
    
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
 });
 // console.log(data)
});

io.on('connection', function(socket) {
    socket.on('execute', (command) => {
        executeCommand(socket, command);
    });
});

http.listen(app.get('port'), () => {
    console.log(`Node app is running on port ${app.get('port')}`)
});
