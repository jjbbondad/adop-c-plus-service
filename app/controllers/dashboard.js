const path = require('path');
const fs = require('fs');

exports.getData = function(req, res) {
 res.json(req.query.name)
 fs.writeFile('tools_selection.json', req.query.name, function (err) {
     if (err) throw err;
     console.log('Saved!');
 });
};

exports.saveUser = function(req, res) {
 res.json(req.query.list)
 fs.writeFile('ldap_user.json', req.query.list, function (err) {
     if (err) throw err;
     console.log(req.query.list);
 });
}

exports.listUser = (req, res) => {
 var jsonfile;
 fs.readFile('ldap_user.json', 'utf8', function (err, data) {
    if (err) throw err
    jsonfile = JSON.parse(data)
    console.log(jsonfile)
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
 });
};

exports.readData = (req, res) => {
 var jsonfile;
 fs.readFile('tools_selection.json', 'utf8', function (err, data) {
    if (err) { res.send("File not available") }
    else {
    jsonfile = JSON.parse(data)
    console.log(jsonfile)
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
    }
 });
 // console.log(data)
};

exports.readLdapUserData = (req, res) => {
 var jsonfile;
 fs.readFile('output.json', 'utf8', function (err, data) {
    if (err) { res.send("File not available") }
    else {
    jsonfile = JSON.parse(data)
    console.log(jsonfile)
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
    }
 });
};
