import express from "express";
import { routes } from "./routes/routes.js";
import { environment } from "./utils/enviroment.js"

var app = express();

const PORT = environment.EXPRESS_PORT;
const HOST = environment.EXPRESS_HOST;

app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes(app)

app.listen(PORT, () => {
    console.log(`Escuchando por el puerto https://${HOST}:${PORT}`);
})

