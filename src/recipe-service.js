const { RecipePuppyAPI } = require('./api/recipepuppy-api');
const { GiphyAPI } = require('./api/giphy-api');

require('./config');

const giphyAPI = new GiphyAPI (process.env.GIPHY_KEY);
const recipePuppyAPI = new RecipePuppyAPI ();

class RecipeService {
	constructor() {}

	// Search using a Array of ingredients.
	async searchByIngredients (ingredients) {
		// Max of 3 ingredients.
		ingredients = ingredients.slice(0, 3).sort();

		var response;

		// Get recipes first.
		var res = await recipePuppyAPI.searchByIngredients(ingredients);
		if (res.data) {
			response = {
				keywords: ingredients,
				recipes: [],
			};

			response.recipes = res.data.results.map((recipe) => {
				return {
					title: recipe.title,
					ingredients: recipe.ingredients.split(/\s*,\s*/).sort(),
					link: recipe.href,
				};
			});

			// Start multiple requests looking for gifs based on recipe's title.
			var gifPromises = [];
			response.recipes.forEach((recipe) => {
				var promise = giphyAPI.search(recipe.title)
				.then((res) => {
					if (res.data.data.length > 0) {
						// Get url of first image
						recipe.gif = res.data.data[0].images.original.url;						
					}
				})
				.catch((err) => {
					response = err;
				});

				gifPromises.push(promise);
			});

			await Promise.all(gifPromises)
		} else {
			response = res;
		}

		return response;
	}
}

module.exports = { RecipeService };