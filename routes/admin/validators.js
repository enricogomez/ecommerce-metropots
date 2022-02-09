const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
  validateTitle: check('title')
  .trim()
  .isLength({min: 5, max: 40})
  .withMessage('Product title must be between 5 and 20 characters'),

  validatePrice: check('price')
  .trim()
  .toFloat()
  .isFloat({min: 1})
  .withMessage('Must be a number greater than 1'),

  validateEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a vald email')
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email: email });
      if (existingUser) {
        throw new Error('Email in use');
      }
    }),

  validatePassword: check('password')
      .trim()
      .isLength({min: 4, max: 20})
      .withMessage('Must be between 4 and 20 characters'),
  
  validatePasswordConfirmation: check('passwordConfirmation')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Must be between 4 and 20 characters')
    .custom((passwordConfirmation, {req}) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error('Passwords must match');
      } else {
        return true;
      } 
  }),
  
  requireEmailExists: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide valid email')
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email });
      if (!existingUser) {
        throw new Error('No email found')
      }
  }),

  requireCorrectPassword: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({email: req.body.email});
      if (!user) {
        throw new Error('Invalid Password');
      }
      const savedPassword = user.password;
      const validPassword = await usersRepo.comparePasswords(savedPassword, password);
      if (!validPassword) {
      throw new Error('Invalid password')
      } else {
      return true;
      }
  })
  
};