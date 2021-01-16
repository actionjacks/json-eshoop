import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 9000;
//middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
  <div>
    <form method="POST">
      <input name="email" placeholder="email"/>
      <input name="password" placeholder="password"/>
      <input name="passwordConfirmation" placeholder="password confirmation"/>
      <button>Sign Up</button>
    </form>
  </div>
  `);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("account created");
});

app.listen(port, () => {
  console.log("listening");
});
