module.exports = ({ content }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shop</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
  </head>

  <body class="admin">
    <header>
      <nav class="navbar navbar-bottom">
        <div class="container navbar-container">
          <div>
            <a href="/admin/products">
              <h3 class="title">Admin Panel</h3>
            </a>
          </div>
          <div class="navbar-item">
            <div class="navbar-buttons">
              <div class="navbar-item">
                <a href="/admin/products"><i class="fa fa-star"></i> Products</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <div class="container">
      ${content}
    </div>
  </body>
</html>
  `;
};  