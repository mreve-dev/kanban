import express from "express";
import routes from "./routes/route.js";

const app = express();
app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log("API sur http://localhost:3000"));
