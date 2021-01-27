import express from "express";
import { check, validationResult } from "express-validator";
import UsersRepository from "../../repositories/users";
//views templates
import { signupTemplate } from "../../views/admin/auth/signup";
import { signinTemplate } from "../../views/admin/auth/signin";

export const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [
    check("email").trim().normalizeEmail().isEmail(),
    check("password").trim().isLength({ min: 4, max: 20 }),
    check("passwordConfirmation").trim().isLength({ min: 4, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await UsersRepository.getOneBy({ email });
    if (existingUser) {
      return res.send("mail in use");
    }
    if (password !== passwordConfirmation) {
      return res.send("Password must match");
    }

    const user = await UsersRepository.create({ email, password });
    //store the id of that user inside the users cookie
    req.session.userId = user.id; //req sesion give to req on app.get(/)

    res.send("account created");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate({ req }));
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await UsersRepository.getOneBy({ email });
  if (!user) {
    return res.send("Email not found");
  }

  const validPassword = await UsersRepository.comparePasswords(
    user.password,
    password
  );
  if (!validPassword) {
    return res.send("Invalid password");
  }
  req.session.userId = user.id;

  res.send("You are signed in !!");
});
