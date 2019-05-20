const Dockerode  = require('dockerode');
const docker  = new Dockerode({ socketPath: '/var/run/docker.sock' });

exports.containerStart = function(req, res) {
    docker.getContainer(req.params.id).start(function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};

exports.containerStop = function(req, res) {
    docker.getContainer(req.params.id).stop(function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};

exports.containerStatus = function(req, res) {
    docker.getContainer(req.params.id).inspect(function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({ status: data.State.Status });
        }
    });
};

// eslint-disable-next-line capitalized-comments
/*
 * exports.composeUp = function(req, res) {
 *     compose.upAll({ cwd: '', log: true }).then(() => { 
 *         console.log('done')
 *     },
 *     (err) => { 
 *         console.log('something went wrong:', err.message) 
 *     });
 * };
 */