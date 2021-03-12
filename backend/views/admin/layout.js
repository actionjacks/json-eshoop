export const layout = ({ content }) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet"> 
        <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@100&display=swap" rel="stylesheet">
        <link href="/css/main.css" rel="stylesheet">
      </head>

      <body>
        <header class="admin__header">
          <a class="admin__headerBack" href="/">{ BACK:"go back" }</a>
          <h3 class="admin__headerTitle">Admin Panel</h3>
        </header>
          <div class="admin__container">
            ${content}
          </div>
        </body>
    </html>
  `;
};
