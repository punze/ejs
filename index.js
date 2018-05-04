var mysql      = require('mysql');
var express    = require('express');
var app = express();
app.set('view engine', 'ejs'); 

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'nodejs',
  password : 'wordpass',
  database : 'nodejs'
});

 app.get('/', function(req, res) {  
  res.render('default', {  
   title: '首頁',  
   users: ['Kai', 'aYen', 'Kyousuke']  
  });  
 });  

app.get('/listWebs', function (req, res) {
//	connection.connect();
	var param = req.query || req.params;
//console.log(param.name);
	var  sql = "SELECT * FROM website WHERE name LIKE '%"+param.name+"%'";
console.log(sql);
	//查
	connection.query(sql,function (err, result) {
	        if(err){
	          console.log('[SELECT ERROR] - ',err.message);
          	  return;
        	}	
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
//res.send( result );
  res.render('index', {  
   title: '首頁',  
//   users: ['Kai', 'aYen', 'Kyousuke']  
	sites:result
  });  
	});
//	connection.end();
})

app.get('/addWeb', function (req, res) {
//	connection.connect();
	var paramObj = req.query || req.params;
//console.log(paramObj);
	var params = Object.keys(paramObj).map(function(_) { return paramObj[_]; });
//console.log(params);
	var  sql = "INSERT INTO website(name,url,user) VALUES (?,?,?)";
//	var  params = [];
console.log(sql);
	//查
	connection.query(sql,params,function (err, result) {
	        if(err){
	          console.log('[SELECT ERROR] - ',err.message);
          	  return;
        	}	
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
res.send( result );
	});
//	connection.end();
})
 
app.get('/modyWeb', function (req, res) {
//	connection.connect();
	var paramObj = req.query || req.params;
console.log(paramObj);
	var params = Object.keys(paramObj).map(function(_) { return paramObj[_]; });
console.log(params);
	var  sql = "UPDATE website SET name=?,url=?,user=? WHERE uid=?";
	//查
console.log(sql);
	connection.query(sql,params,function (err, result) {
	        if(err){
	          console.log('[SELECT ERROR] - ',err.message);
          	  return;
        	}	
/*
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
*/
       console.log('----get one request-----\n\n');  
res.send( result );
	});
//res.end( 'result' );
//	connection.end();
})

app.get('/delWeb', function (req, res) {
//	connection.connect();
	var params = req.query || req.params;
//console.log(params);
	var  sql = "DELETE FROM website WHERE uid=?";
	//查
console.log(sql);
	connection.query(sql,params.uid,function (err, result) {
	        if(err){
	          console.log('[DELETE ERROR] - ',err.message);
          	  return;
        	}	
/*
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
*/
       console.log('----get one request-----\n\n');  
res.send( result );
	});
//	connection.end();
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

}) 
