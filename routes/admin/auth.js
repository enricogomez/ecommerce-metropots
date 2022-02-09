const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../view/admin/auth/signup');
const signinTemplate = require('../../view/admin/auth/signin');
const { 
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  requireEmailExists,
  requireCorrectPassword } = require('./validators');
const router = express.Router();


router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

// const bodyParser = (req, res, next) => {
//   if(req.method === 'POST'){
//   req.on('data', data => {
//     const parsed = data.toString('utf8').split('&');
//     const formData = {};
//     for (let pair of parsed) {
//       const [ key, value ] = pair.split('=');
//       formData[key] = value; 
//     }
//     req.body = formData;
//     next();
//     });
//   } else {
//     next();
//   }
// };

router.post('/signup', 
  [ 
    validateEmail,
    validatePassword,
    validatePasswordConfirmation 
  ], 
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.create({ email, password })
    req.session.userId = user.id; // COOKIES
    res.redirect('/admin/products');
  }
);

router.get('/signout', (req, res) => {
  req.session = null; 
  res.send('You are logged out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({ }));
});

router.post('/signin', [
    requireEmailExists,
    requireCorrectPassword
  ], 
  handleErrors(signinTemplate),
  async (req, res) => {
  const { email } = req.body;
  const existingUser = await usersRepo.getOneBy({email});
  req.session.userId = existingUser.id; //Generates cookie
  
  res.redirect('/admin/products');
});

module.exports = router;