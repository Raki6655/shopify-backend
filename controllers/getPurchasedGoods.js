const User = require("../models/user");

const getPurchasedGoods = async (req, res) => {
	console.log(req.params.id);
	let id = req.params.id;
	const user = await User.findById(id);
	res.status(200).send({
		success: true,
		items: user.my_products,
	});
};
module.exports = getPurchasedGoods;
