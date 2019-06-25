require('express-group-routes');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const bodyParser = require('body-parser');
const ansible = require('node-ansible');
const Dockerode  = require('dockerode');
const docker  = new Dockerode({ socketPath: '/var/run/docker.sock' });

const { executeCommand } = require('./app/utils/commandRunner');
const dockerRouter = require('./app/routes/v1/docker');
const ldapRouter = require('./app/routes/v1/ldap');
const dashBoard = require('./app/routes/v1/dashboard');

app.set('port', process.env.PORT || 5000)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.group('/api/v1', (router) => {
    router.use('/docker', dockerRouter)
    router.use('/ldap', ldapRouter)
    router.use('/dashboard',dashBoard)
});

app.get('/test', function(req, res) {
    res.sendFile(`${__dirname}/app/views/test.html`);
});

io.on('connection', function(socket) {
    socket.on('ansible', (command) => {
      const playbook = new ansible.Playbook().playbook('adop-docker-compose/ansible-playbook-tools/playbook');
      const promise = playbook.exec();
      promise.then(function(successResult) {
        console.log(successResult.code); // Exit code of the executed command
        console.log(successResult.output) // Standard output/error of the executed command
        socket.emit('logs', successResult.output);
      }, function(error) {
        console.error(error);
      })
    });
    socket.on('container', (command) => {
      docker.getContainer('proxy').logs({ stdout: true, stderr: true, follow: false },function (err, data) {
        console.log(data);
        socket.emit('containerlogs', data);
      });
    });
});

http.listen(app.get('port'), () => {
    console.log(`Node app is running on port ${app.get('port')}`)
});
