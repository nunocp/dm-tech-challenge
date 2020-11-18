const express = require('express');

const { RecipeService } = require('./recipe-service');

const recipeService = new RecipeService();


const server = express();

// === API / Endpoints / Routes ===
/*
A valid path/endpoint (ex: '/recipes/') returns a json object: { data: } or { error: }.
A invalid path (ex: '/') is handled by Express module and returns a text message.
*/

server.get('/recipes/', async (req, res) => {
	var response = {};

	// Ex: /recipes/?i=onion,tomato
	if (req.query.i) {
		response = await recipeService.searchByIngredients( req.query.i.split(/\s*,\s*/) );
	}

	res.send(response);
});


module.exports = server;