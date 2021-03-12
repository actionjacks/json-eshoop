import { layout } from "../layout";
import { getError } from "./../../helpers";

export const signupTemplate = ({ req, errors }) => {
  return layout({
    content: `
    <div class="container__singUp">
    <form class="form__singUp" method="POST">
      <h1 class="singUp__title">Sign Up</h1>
      <div class="singUp__field">
        <label class="label">Email</label>
        <input required class="singUp__input" placeholder="Email" name="email" />
        <p class="help is-danger">${getError(errors, "email")}</p>
      </div>
      <div class="singUp__field">
        <label class="label">Password</label>
        <input required class="singUp__input" placeholder="Password" name="password" type="password" />
        <p class="singUp__errorContainer">${getError(errors, "password")}</p>
      </div>
      <div class="singUp__field">
        <label class="label">Password Confirmation</label>
        <input required class="singUp__input" placeholder="Password Confirmation" name="passwordConfirm"
          type="password" />
        <p class="singUp__errorContainer">${getError(
          errors,
          "passwordConfirm"
        )}</p>
      </div>
      <button class="singUp__button">Submit</button>
    </form>
    <a class="singUp__link" href="/signin">Have an account? Sign In</a>
  </div>
    `,
  });
};
