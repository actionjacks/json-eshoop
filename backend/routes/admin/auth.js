import express from "express";
import UsersRepository from "../../repositories/users";
const { handleErrors } = require("./middlewares");
//views templates
import { signupTemplate } from "../../views/admin/auth/signup";
import { signinTemplate } from "../../views/admin/auth/signin";
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser,
} = require("./validators");

export const authRouter = express.Router();

authRouter.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

authRouter.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signupTemplate),
  async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = UsersRepository.create({ email, password });
    //store the id of that user inside the users cookie
    req.session.userId = user.id; //req sesion give to req on app.get(/)
    res.send("account created");
  }
);

authRouter.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

authRouter.get("/signin", (req, res) => {
  res.send(signinTemplate({ req }));
});

authRouter.post(
  "/signin",
  [requireEmailExists, requireValidPasswordForUser],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;
    const user = await UsersRepository.getOneBy({ email });
    req.session.userId = user.id;

    res.send("You are signed in!!!");
  }
);
