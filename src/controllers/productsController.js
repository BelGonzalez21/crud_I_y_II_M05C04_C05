const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const readJSON = () => {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products
}
const writeJSON = (data) => {
	fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(data), 'utf-8')
}
const controller = {
	// Root - Show all products
	index: (req, res) => {
		/*renderizo vista*/
	res.render('products', {
	title: 'Productos',
	products,
	toThousand /*leo db*/
	})	
},

	// Detail - Detail from one product
	detail: (req, res) => {
		/*traer el p que tenga el id*/
		let product = products.find( product => product.id == +req.params.id)
		/*renderizo la vista*/
		res.render('detail', {
			product, toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form', {
			title: 'Crear producto'
		})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		/*buscar por id*/
		let lastId = 0;
		products.forEach(product=> {
			if(product.id > lastId){
				lastId = product.id
			}
		});
		/*querystring*/
		let newProduct = {
			...req.body,
			id: lastId + 1,
			image: req.file ? req.file.filename : "default-image.jpg"
		}
		
		products.push(newProduct)/*agrego a db el newProduct*/
		writeJSON(products) 

		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let products = readJSON();
		let product = products.find(product => product.id == +req.params.id)
		return res.render('product-edit-form', {
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		let products = readJSON();
		const {name, price,discount, description, category} = req.body;

		const product = products.find(product => product.id === +req.params.id)

		const productsModify = products.map(product => {
			if(product.id === +req.params.id){
				let productModify = {
					...product,
					name : name.trim(), 
					price : +price,
					discount : +discount,
					description : description.trim(), 
					image : req.file ? req.file.filename : product.image,
					category
				}
				return productModify
			}
			return product
		});

		if(req.file && product.image !== "default-image.png"){
			if(fs.existsSync('./public/images/products/' + product.image)){
				fs.unlinkSync('./public/images/products/' + product.image)
			}
		}
		writeJSON(productsModify);
		return res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let products = readJSON();
		const productsModify = products.filter(product => product.id !== +req.params.id)
		writeJSON(productsModify);
		return res.redirect('/products');
	}
};

module.exports = controller;