const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
    );

  product
    .save()
		.then(result => {
			console.log('Product created');
			res.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
  const prodId = req.params.productId;
	Product.findById(prodId)
		.then(product => {
			if (!product) {
				res.redirect('/');
			} else {
				res.render('admin/edit-product', {
					pageTitle: 'Edit Product',
					path: '/admin/edit-product',
					editing: editMode,
					product: product
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  
  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedImageUrl,
    prodId
    );
    product.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        products: products,
        pageTitle: 'Admin products',
        path: '/admin/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  
  Product.deleteById(productId)
    .then(() => {
      console.log('product destroyed');
      res.redirect('/admin/products');			
    })
    .catch(err => {
      console.log(err);
    });
};