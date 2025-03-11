const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const { urlencoded } = require("express");
require("dotenv").config();
const app = express();

mongoose
	.connect(process.env.URI)
	.then(() => console.log("Database connected"))
	.catch((err) => console.log(err));

app.use(express.json({ limit: "5mb" }));
app.use(urlencoded({ extended: true }));
app.use(
	cors({
		origin: "*",
	})
);
app.get("/", (req, res) => {
	res.send("<h1>Hello,Welcome to TweenLab</>");
});
app.use("/api", require("./route/auth"));
app.use("/post", require("./route/post"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/.next"));
}
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server running on port ${port}`));
