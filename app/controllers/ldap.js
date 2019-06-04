const path = require('path');

var LDAP = require('ldap-client');
var ldap = new LDAP({
    uri: 'ldap://ldap:389',
});

   ldap.bind({binddn: 'cn=admin,dc=ldap,dc=example,dc=com', password: '500c099813aa2200'}, function(err) {
   });

exports.addUser = function(req, res) {
	var attrs = [
	   { attr: 'objectClass', vals: [ 'inetOrgPerson', 'organizationalPerson', 'person', 'top' ] },
	   { attr: 'cn', vals: [ req.params.id ] },
	   { attr: 'displayName', vals: [ req.params.id2 ] },
	   { attr: 'givenName', vals: [ req.params.id3 ] },
	   { attr: 'mail', vals: [ req.params.id+'@ldap.example.com' ] },
	   { attr: 'sn', vals: [ 'User' ] },
	   { attr: 'uid', vals: [ req.params.id ] }
        ]

	ldap.add('cn='+req.params.id+',ou=people,dc=ldap,dc=example,dc=com',attrs,function(err){
	   if (err) {
	      res.send(err);
	   }
	   else {
              res.send('Sucessfully Added '+req.params.id);
	   }
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

exports.search = function(req, res) {
	search_options = {
	    base: 'dc=ldap,dc=example,dc=com',
	    scope: LDAP.SUBTREE,
	    filter: '(objectClass=inetOrgPerson)',
	    attrs: '*'
   	}

	ldap.search(search_options, function(err, data){
	    res.send(data)
	});

};
