let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/getMovies', (req, res) => {
	console.log('get movies')
	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT * from movies`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		
		res.send(results);
	});
	connection.end();
});

app.post('/api/addMovie', (req, res) => {
	console.log('add movies')
	let connection = mysql.createConnection(config);
	const movie = req.body
	console.log(movie)
	console.log(req.body)

	let sql = "INSERT INTO Review (reviewTitle, reviewContent, reviewScore, movieID, userID) VALUES ('" + req.body.title+"','" + req.body.review+"',"+ req.body.rating+","+ req.body.movie+","+ req.body.userId+")";
	console.log(sql);

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		
		res.send(results);
	});
	connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
