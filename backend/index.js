import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { router } from "./routes/admin/auth";

const app = express();
const PORT = process.env.PORT || 9000;

//middleware
//body parser jest odpowiedzialny za req.body
app.use(bodyParser.urlencoded({ extended: true }));
//cookies
app.use(
  cookieSession({
    keys: ["18tataczytacytatytacyta66"],
  })
);

app.use(router);

app.listen(PORT, () => {
  console.log("listening at " + PORT);
});
