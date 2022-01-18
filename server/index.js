// Inject the .env file to the api file
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

// Execute the express package, gives us access to the .get .use method etc
const app = express();

// The port the api will run on, use the PORT in .env or the default port number
const port = process.env.PORT || 4000;

// When serving the app in production mode serve the client application as well as serve the api routes
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '..', '/client/build/')));
	app.use(express.static(path.join(__dirname, '..', '/client/public/')));
}

// Enable CORS support for the server, allows the server and client to connect
app.use(cors());

const todos = [
	{
		id: '1',
		title: 'Go to Tescos',
		completed: false
	},
	{
		id: '2',
		title: 'Go to Aldi',
		completed: true
	}
];

app.get('/api/todos', (req, res) => {
	res.send(todos);
});

app.get('/api/todos/:id', (req, res) => {
	res.send(todos.find((todo) => todo.id === req.params.id));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
