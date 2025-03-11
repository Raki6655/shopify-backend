const express = require("express");

const getAllPosts = require("../controllers/getAllPosts");
const getSinglePost = require("../controllers/getSinglePost");
const uploadPost = require("../controllers/uploadPost");
const getCartProducts = require("../controllers/getCartProducts");
const getCartItem = require("../controllers/getCartItems");
const removeFromCart = require("../controllers/removeFromCart");

const router = express.Router();
const stripe = require("stripe")(
	"sk_test_51Ks9rESGIDSGcSMpQeSxCpAb5LWdmx1OU0qScHxY1MfFv5sl1yMKoj5DdfmwByykSpbwgiHXGl0vVdd04w2NVCeR00SlolJHEx"
);
const uuid = require("uuid").v4;
const User = require("../models/user");
const getPurchasedGoods = require("../controllers/getPurchasedGoods");

router.get("/get-post", getAllPosts);
router.post("/upload-post", uploadPost);
router.get("/get-single-post/:_id", getSinglePost);
router.post("/add-to-cart", getCartProducts);
router.get("/get-cart-items/:_id", getCartItem);
router.patch("/remove-item/:_id", removeFromCart);
router.get("/get-purchased-goods/:id", getPurchasedGoods);
router.post("/test/", async (req, res) => {
	console.log(typeof req.body.price);
	c = {};
	req.body.cartItem.forEach((item) => {
		c.post = item;
		//console.log(c);
	});
});

router.post("/payment", async (req, res) => {
	const { product, token, price, cartItem, params } = req.body;
	console.log(price);

	let param = params.id;

	//console.log(cartItem);

	const indempondency = uuid();
	const user = await User.findOne({ _id: param });

	//console.log(newCartItem);
	//console.log(user);

	// return stripe.customers
	// 	.create({ email: token.email, source: token.id })
	// 	.then((customer) => {
	// 		stripe.paymentIntents.create(
	// 			{ amount: price, customer: customer.id, currency: "usd" },
	// 			{ idempotencyKey: indempondency }
	// 		);
	// 	})
	// 	.then((result) => console.log("this is the result" + result))
	// 	.catch((err) => console.log(err));
	const data = await stripe.customers.create({
		email: token.email,
		source: token.id,
	});
	const result = await stripe.paymentIntents.create(
		{ amount: price, customer: data.id, currency: "usd" },
		{ idempotencyKey: indempondency }
	);
	let post = await User.findOneAndUpdate(
		{ _id: param },
		{
			$push: {
				my_products: {
					post: cartItem,
					date: Date.now(),
					total: price,
				},
			},
		},
		{ new: true }
	);
	let postt = await User.findOneAndUpdate(
		{ _id: param },
		{
			$unset: {
				newCart: "post",
			},
		},
		{ new: true }
	);
	//console.log(post.newCart);

	res.status(200).send({
		result,
		ok: true,
		user: user.my_products.newCartItems,
	});
});

module.exports = router;
