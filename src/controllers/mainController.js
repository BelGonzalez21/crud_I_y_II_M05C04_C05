const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let offers = products.filter(product => {
			return product.discount > 0
		})
		let visited = products.filter(product => {
			return product.discount > 0
		})
		res.render('index', {
			offers,
			visited,
			toThousand
		})
	},
	search: (req, res) => {
		let buscar = req.query.search.toLowerCase();
		let productos = products.filter( product => product.name == buscar)
		res.render('results', {
			productos,
			buscar
		})
	},
};

module.exports = controller;
