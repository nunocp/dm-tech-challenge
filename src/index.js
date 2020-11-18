require('./config');

const server = require('./server');

const port = process.env.SERVER_PORT || 4000;

server.listen(port, () => {
	console.log(`Server is listening at http://localhost:${port}`);
});