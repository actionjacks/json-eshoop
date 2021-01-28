import express from "express";
import { validationResult } from "express-validator";
import UsersRepository from "../../repositories/users";
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

export const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { email, password, passwordConfirmation } = req.body;
      const user = await UsersRepository.create({ email, password });

      //store the id of that user inside the users cookie
      req.session.userId = user.id; //req sesion give to req on app.get(/)

      res.send("account created");
    }

    if (!errors.isEmpty()) {
      return res.send(signupTemplate({ req, errors }));
    }
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate({ req }));
});

router.post(
  "/signin",
  [requireEmailExists, requireValidPasswordForUser],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signinTemplate({ errors }));
    }

    const { email } = req.body;

    const user = await UsersRepository.getOneBy({ email });

    req.session.userId = user.id;

    res.send("You are signed in!!!");
  }
);
