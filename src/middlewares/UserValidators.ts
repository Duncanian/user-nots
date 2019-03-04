import User from '../models/user';
import reqResponses from '../helpers/Responses';
import checkPass from '../helpers/Encrypt';

let message;

class AuthValidator {
  static async validateSignup(req: any, res: any, next: any) {
    try {
      const { username, email, password } = req.body;

      let re;
      if (username === '' || email === '' || password === '') {
        message = 'Kindly fill all fields in order to sign up';
        return reqResponses.handleError(message, 400, res);
      }
      if (username) {
        re = /[a-zA-Z]{3,}_*[0-9_]*[a-zA-Z]*_*/;
        message = 'Username should have at least 3 letters';
        if (!re.test(username)) return reqResponses.handleError(message, 400, res);
      }
      if (email) {
        re = /(^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-z]+$)/;
        message = 'Email should have the format user@mail.com';
        if (!re.test(email)) return reqResponses.handleError(message, 400, res);
      }
      if (password) {
        re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{7,}$/;
        message = 'Password should contain capital and small letters, numbers and special characters e.g. @,#,!';
        if (!re.test(password)) return reqResponses.handleError(message, 400, res);
      }

      const emailExists = await User.findOne({ email });
      
      if (emailExists) {
        message = `Sorry, a user with the email ${email} already exists`;
        return reqResponses.handleError(message, 400, res);
      }
      next();
    } catch (error) {
      return reqResponses.handleError(error.toString(), 500, res);
    }
  }

  static async validateSignin(req: any, res: any, next: any) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        message = 'Kindly enter both email and password fields';
        return reqResponses.handleError(message, 400, res);
      }

      const passExists: any = await User.findOne({ email });

      if (passExists === null) {
        message = 'Sorry, you don\'t have an account. Kindly sign up';
        return reqResponses.handleError(message, 400, res);
      }

      const checkedPass = checkPass.validPassword(password, passExists.password);

      if (!checkedPass) {
        message = 'Sorry, incorrect password!';
        return reqResponses.handleError(message, 400, res);
      }
      next();
    } catch (error) {
      return reqResponses.handleError(error.toString(), 500, res);
    }
  }
}

export default AuthValidator;
