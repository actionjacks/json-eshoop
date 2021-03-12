import { layout } from "../layout";
import { getError } from "./../../helpers";

export const signinTemplate = ({ errors }) => {
  return layout({
    content: `
    <div class="container__singIn">
    <form class="form__singIn" method="POST">
      <h1 class="singIn__title">Sign in</h1>
      <div class="singIn__field">
        <label class="label">Email</label>
        <input required class="singIn__input" placeholder="{ Email }" name="email" />
        <p class="singIn__errorContainer">${getError(errors, "email")}</p>
      </div>
      <div class="singIn__field">
        <label class="label">Password</label>
        <input required class="singIn__input" placeholder="{ Password }" name="password" type="password" />
        <p class="singIn__errorContainer">${getError(errors, "password")}</p>
      </div>
      <button class="singIn__button">Submit</button>
    </form>
    <a class="singUp__link" href="/signup">Need an account? Sign Up</a>
  </div>
    `,
  });
};
