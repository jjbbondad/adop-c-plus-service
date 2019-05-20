const { exec } = require('child_process');

exports.executeCommand = function (socket, command) {
    var process = exec(command)

    process.stdout.setEncoding('utf-8');
    process.stdout.on('data', function (data) {
        socket.emit('logs', data);
    });
    process.stderr.setEncoding('utf-8');
    process.stderr.on('data', function (data) {
        socket.emit('err-logs', data);
    });
};
