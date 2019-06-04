const path = require('path');

exports.addUser = function(req, res) {
    docker.getContainer(req.params.id).start(function (err, data) {
        console.log(data)
    });
};

exports.removeUser = function(req, res) {
    docker.getContainer(req.params.id).stop(function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};

exports.Search = function(req, res) {
    docker.getContainer(req.params.id).inspect(function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data.State.Status);
        }
    });
};