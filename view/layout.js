module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop</title>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
        <link href="/css/main.css" rel="stylesheet">
        
      </head>

      <body>
        <section id="header">
          <a href="#"><img src="/images/metropots-logo.png" class="logo" alt=""></a>
          <div>
            <ul id="navbar">
              <li><a class="active" href="/home">Home</a></li> 
              <li><a href="/shop">Shop</a></li>
              <li><a href="/signin">Login</a></li>
              <li><a href="/signup">Sign up</a></li>
              <li><a href="/cart"><i class="far fa-shopping-bag"></i></a></li>   
                
            </ul>
          </div>
        </section>
        ${content}
      </body>
    </html>
  `;
};
