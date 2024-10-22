import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import router from "./routes/rutas.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware para analizar JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(join(__dirname, "public")));

app.use(router);

app.listen(4000, () => {
  console.log("http://localhost:3000");
});
