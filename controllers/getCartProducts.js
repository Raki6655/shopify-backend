const User = require("../models/user");
const getCartProducts = async (req, res) => {
	const id = req.body.id;
	const postId = req.body.post._id;

	const post = req.body.post;
	console.log(req.body.quantity);
	var duplicate;
	let total = req.body.total;

	try {
		const user = await User.findOne({ _id: id });
		user.newCart.forEach((element) => {
			if (element.post._id == req.body.post._id) {
				duplicate = true;
			} else {
				duplicate = false;
			}
		});
		if (!duplicate || user.newCart.length === 0) {
			User.findOneAndUpdate(
				{ _id: id },
				{
					$push: {
						newCart: {
							post: post,

							date: Date.now(),
							total: total,
							quantity: req.body.quantity,
						},
					},
				},
				{ new: true }
			).then((resp) => {
				console.log(resp.newCart);
				return res.status(200).send({
					message: "Item added to cart successfully",
					cart: resp.newCart,
				});
				// res.status(200).send({
				// 	message: "Item added to cart successfully",
				// 	cart: user.cart,
				// });/
			});
		} else {
			return res.status(400).send({ message: "Item already in cart" });
		}
	} catch (err) {
		res.status(400).send("Invalid request");
	}

	//  user.newCart.forEach((element) => {
	//  	if (element.post._id == req.body.post._id) {
	//  		return console.log("Item exists");
	//  	} else {
	//
	//  	}
	//  });

	//  User.findOne({ _id: id }, (err, userInfo) => {
	//  	//console.log(userInfo.cart);
	//  	userInfo.cart.forEach((item) => {
	//  		if (item.post._id == req.body.post._id) {
	//  			console.log("Item already in cart");
	//  		}
	//  		User.findOneAndUpdate(
	//  			{ _id: req.body.id },
	//  			{
	//  				$push: {
	//  					cart: req.body.post,
	//  					date: Date.now(),
	//  				},
	//  			},
	//  			{ new: true },
	//  			(err, userInfo) => {
	//  				console.log(userInfo);
	//  				if (err) return res.json({ success: false, err });
	//  				res.status(200).json(userInfo.cart);
	//  			}
	//  		);
	//  	});
	//  });
	//
	//  user.forEach((item) => {
	//  	//console.log("ff", item);
	//  	item.cart.forEach((i) => {
	//  		console.log("kk", i.post._id);
	//  		if (i.post._id == req.body.post._id) {
	//  			//res.json({ message: "sorry,Item is already in cart" });
	//  			console.log("hello");
	//  		} else {
	//  			console.log("hellooo");
	//  			const user = User.findOneAndUpdate(
	//  				{ _id: id },
	//  				{
	//  					$push: {
	//  						cart: {
	//  							post: req.body.post,
	//  							date: Date.now(),
	//  						},
	//  					},
	//  				},
	//  				{ new: true },
	//  				function (err, result) {
	//  					if (err) res.status(400).send("Something went wrong");
	//  					res.status(200).send("successfully added item to the cart");
	//  				}
	//  			);
	//  			console.log(user);
	//  		}
	//  	});
	//  });
};
module.exports = getCartProducts;

////.then((result, err) => {
//	return res.status(200).send("successfull", result);
//});
