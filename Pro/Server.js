var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "root",
database: "project"
});

app.use(bodyParser.urlencoded({extended: true}));

app.post('/myaction', function(req, res) {
	var name = "\'"+req.body.name+"\'";
   	var age = req.body.age;
   	var gender = "\'"+req.body.gender+"\'";
   	var pincode = "\'"+req.body.pincode+"\'";
   	var city = "\'"+req.body.city+"\'";
	res.send('Recieved your info '+req.body.name);
	con.connect(function(err) {
 		//if (err) throw err;
  		console.log("Connected!");
  		var entry = "insert into customer values ("+name+", "+age+", "+gender+", "+pincode+", "+city+")";
  		con.query(entry, function(err, record){
  			if (err) throw err;
    			console.log("Entered!");
 		});
	});

});

app.post('/search', function(req, res) {
	var search = "\'"+req.body.search+"\'";
	con.connect(function(err) {
		//if(err) throw err;
		console.log("Connected!");
		var ent = "select * from customer where name = "+search+" OR pincode = "+search+" OR city = "+search;
		con.query(ent, function(err, result) {
			if (err) throw err;
			res.send(result);
		});
	});
});

app.listen(8080, function() {
	console.log('Server running at http://127.0.0.1:8080/');
});
