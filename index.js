const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const { urlencoded } = require("express");
require("dotenv").config();
const app = express();

mongoose
	.connect(
		"mongodb+srv://alannpn75:alan@cluster0.xdtj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	)
	.then(() => console.log("Database connected"))
	.catch((err) => console.log(err));

app.use(express.json({ limit: "5mb" }));
app.use(urlencoded({ extended: true }));
const corsOptions = {
	origin: ["http://localhost:3000", "https://your-frontend-domain.com"], // Replace with your actual frontend domains
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};
app.use(cors(corsOptions));

app.use("/api", require("./route/auth"));
app.use("/post", require("./route/post"));

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static("client/.next"));
// }
//
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server running on port ${port}`));
