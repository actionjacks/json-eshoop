export const layout = ({ content }) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@100&display=swap" rel="stylesheet">
        <script src="https://kit.fontawesome.com/40cc81707e.js" crossorigin="anonymous"></script>
        <link href="./css/main.css" rel="stylesheet">
        </link>
        <title>JSON-SHOOP</title>
      </head>

      <body>
      <header class="header">
        <img class="header__logo" src="../images/logo_json.png">
        <div class="header__adminPanel">
            <h3 class="adminPanel__title">{ Admin Panel }</h3>
            <a href="/signin" class="header__signIn">{ Sign in }</a>
            <a href="/signup" class="header__signiUp">{ Sign up }</a>
        </div>
          <div class="cart__container">
            <p>{ Your cart</p>
            <a href="/cart"><i class="fab fa-opencart"> }</i></a>
          </div>
      </header>
      
      <div class="wrapper">
        ${content}
      </div>

      <footer class="footer">
        <p class="footer__copyright">
         {} © 2021 Jsonshoop {}
        </p>
      </footer>
      </body>
    </html>
  `;
};
//<img src="./images/logo_json.png" alt="" class="header__logo">
