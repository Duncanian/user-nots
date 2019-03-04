import express from 'express';
import UserValidators from '../middlewares/UserValidators';
import AuthController from '../controllers/AuthController';

const Router = express.Router();

Router.post(
  '/signup',
  UserValidators.validateSignup,
  AuthController.RegisterUser,
);

Router.post(
  '/signin',
  UserValidators.validateSignin,
  AuthController.LoginUser,
);

export default Router;
