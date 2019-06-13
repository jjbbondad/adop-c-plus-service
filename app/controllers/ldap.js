const path = require('path');

var LDAP = require('ldap-client');
var ldap = new LDAP({
    uri: 'ldap://ldap:389',
});

   ldap.bind({binddn: 'cn=admin,dc=ldap,dc=example,dc=com', password: '8e6092e4b8a93665'}, function(err) {
   });

exports.addUser = function(req, res) {
	var dn = req.params.id.split('.')

	var attrs = [
	   { attr: 'objectClass', vals: [ 'inetOrgPerson', 'organizationalPerson', 'person', 'top' ] },
	   { attr: 'cn', vals: [ req.params.id ] },
	   { attr: 'displayName', vals: [ req.params.id ] },
	   { attr: 'givenName', vals: [ dn[0]+' '+dn[parseInt(dn.length) - 1] ] },
	   { attr: 'mail', vals: [ req.params.id+'@ldap.example.com' ] },
	   { attr: 'sn', vals: [ 'User' ] },
	   { attr: 'uid', vals: [ req.params.id ] },
	   { attr: 'userPassword', vals: [ req.params.password ] }
        ]

	ldap.add('cn='+req.params.id+',ou=people,dc=ldap,dc=example,dc=com',attrs,function(err){
	   if (err) {
	      res.send('User may already exist.');
	   }
	   else {
              res.send('Sucessfully Added '+req.params.id);
	   }
	});
};

exports.removeUser = function(req, res) {
	ldap.remove('cn='+req.params.id+',ou=people,dc=ldap,dc=example,dc=com',function(err){
	   if (err) {
	      res.send('User does not exist.');
	   }
	   else {
	      res.send(req.params.id+' has been successully removed.');
	   }
	});
};

exports.search = function(req, res) {
	search_options = {
	    base: 'dc=ldap,dc=example,dc=com',
	    scope: LDAP.SUBTREE,
	    filter: '(objectClass='+req.params.class+')',
	    attrs: req.params.cn
   	}

	ldap.search(search_options, function(err, data){
	    res.send(data)
	});
};

exports.modify = function(req, res) {

        var attrs = [
           { op: req.params.ops,
	     attr: 'uniqueMember',
	     vals: [ 'cn='+req.params.id+',ou=people,dc=ldap,dc=example,dc=com' ] }
        ]

        ldap.modify('cn='+req.params.group+',ou=groups,dc=ldap,dc=example,dc=com',attrs,function(err){
           if (err) {
              res.send('Invalid User or may already exist on '+req.params.group+' group');
           }
           else {
              res.send(req.params.ops+': '+req.params.id+' => '+req.params.group);
           }
        });
};

exports.changepassword = function(req, res) {

        var attrs = [
           { op: 'replace',
             attr: 'userPassword',
             vals: [ req.params.password ] }
        ]

        ldap.modify('cn='+req.params.id+',ou=people,dc=ldap,dc=example,dc=com',attrs,function(err){
           if (err) {
              res.send('User does not exist');
           }
           else {
              res.send(req.params.id+ ' changed password successfully.');
           }
        });
};

