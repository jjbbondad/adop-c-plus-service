const path = require('path');
const fs = require('fs');
const LDAP = require('ldap-client');
const ldap = new LDAP({
    uri: 'ldap://ldap:389',
});

   ldap.bind({binddn: 'cn=admin,dc=ldap,dc=example,dc=com', password: '0774e91cb3961243'}, function(err) {
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

exports.searchAllUsers = function(req, res) {
    user_search_options = {
        base: 'dc=ldap,dc=example,dc=com',
        scope: LDAP.SUBTREE,
        filter: '(&(objectClass=inetOrgPerson)(cn=*))',
        attrs: '*'
    }
    group_name_regex = /cn=([a-zA-Z0-9]+),ou=groups/;
    var obj = {
      variables: []
    };
	ldap.search(user_search_options, function(err, data){
		data.forEach(function(item) {
		group_search_options = {
			base: 'dc=ldap,dc=example,dc=com',
			scope: LDAP.SUBTREE,
			filter: '(&(objectClass=inetOrgPerson)(cn='+ item.cn +'))',
			attrs: '+'
		};
		ldap.search(group_search_options, function(err, data) {
			 array = data[0].memberOf;
			 groupsOf = [];
			 array.forEach(function(item) {
				group = item.match(group_name_regex);
				groupsOf.push(group[1]);
			 })
			 console.log(item.cn[0]);
			 console.log(groupsOf);
			 groupsval = JSON.stringify(groupsOf);
			 obj.variables.push({user: item.cn[0], groups: groupsOf});
			 console.log(obj);
			 json = JSON.stringify(obj);
			  fs.writeFile("output.json", json, 'utf8', function (err) {
				if (err) {
				   console.log("An error occured while writing JSON Object to File.");
					return console.log(err);
				}
			  });
		   });
	 });
		res.send('Created JSON file');
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
