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
const corsOptions = {
	origin: "*", // Allow all origins (you can replace with a specific origin)
	methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
	credentials: true, // Allow cookies/auth headers
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.send("<h1>Hello,Welcome Home</>");
});
app.use("/api", require("./route/auth"));
app.use("/post", require("./route/post"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/.next"));
}
app.use(cors());
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server running on port ${port}`));
