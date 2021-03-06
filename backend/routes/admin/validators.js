const { check } = require("express-validator");
import UsersRepository from "../../repositories/users";

module.exports = {
  requireTitle: check("title")
    .trim()
    .isLength({ min: 5, max: 40 })
    .withMessage("Must be between 5 and 40 characters"),

  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage("Must be between 5 and 40 characters"),

  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const existingUser = await UsersRepository.getOneBy({ email });
      if (existingUser) {
        throw new Error("Email in use");
      }
    }),

  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),
  //bug !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //cant resolve password confirmation
  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        res.send("Passwords must match");
      }
      return true;
    }),

  requireEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await UsersRepository.getOneBy({ email });
      if (!user) {
        throw new Error("Email not found!");
      }
    }),

  requireValidPasswordForUser: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await UsersRepository.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error("Invalid password");
      }

      const validPassword = await UsersRepository.comparePasswords(
        user.password,
        password
      );
      if (!validPassword) {
        throw new Error("Invalid password");
      }
    }),
};
