import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { authRouter } from "./routes/admin/auth";
import { productsRouter } from "./routes/admin/products";

const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.static("public"));
//middleware
//body parser jest odpowiedzialny za req.body
app.use(bodyParser.urlencoded({ extended: true }));
//cookies
app.use(
  cookieSession({
    keys: ["18tataczytacytatytacyta66"],
  })
);

app.use(authRouter);
app.use(productsRouter);

app.listen(PORT, () => {
  console.log("listening at " + PORT);
});
