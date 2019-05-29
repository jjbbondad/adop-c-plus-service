const ansible = require('node-ansible')
exports.ansibleStart = function(req, res) {
    var command = new ansible.AdHoc().module('shell').hosts('localhost').args("echo 'hello'");
    var promise = command.exec();
    promise.then(function(successResult) {
      console.log(successResult.code); // Exit code of the executed command
      console.log(successResult.output) // Standard output/error of the executed command
	  res.send(successResult.output)
    }, function(error) {
      console.error(error);
	  res.send(error)
    })
};
