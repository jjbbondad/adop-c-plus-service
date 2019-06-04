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

app.set('port', process.env.PORT || 5000)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.group('/api/v1', (router) => {
    router.use('/docker', dockerRouter)
    router.use('/ansible', ansibleRouter)
	router.use('/ldap', ldapRouter)
});

app.get('/test', function(req, res) {
    res.sendFile(`${__dirname}/app/views/test.html`);
});

io.on('connection', function(socket) {
    socket.on('execute', (command) => {
        executeCommand(socket, command);
    });
});

http.listen(app.get('port'), () => {
    console.log(`Node app is running on port ${app.get('port')}`)
});
