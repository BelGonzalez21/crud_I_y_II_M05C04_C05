const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let offers = products.filter(product => {
			return product.category === "in-sale"
		})
		let visited = products.filter(product => {
			return product.category === "visited"
		})
		res.render('index', {
			offers,
			visited,
			toThousand
		})
	},
	search: (req, res) => {
		let keywords = req.query.keywords;
		let result = products.filter( product => product.name.toLowerCase().includes(keywords.toLowerCase() || product.description.toLowerCase().includes(keywords.toLowerCase())))
		res.render('results', {
			result,
			keywords,
			toThousand
		})
	},
};

module.exports = controller;
