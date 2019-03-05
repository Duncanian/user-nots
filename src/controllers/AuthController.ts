import User from '../models/user';
import reqResponses from '../helpers/Responses';
import encPass from '../helpers/Encrypt';
import genToken from '../helpers/Authenticate';

class AuthController {
  static async RegisterUser(req: any, res: any) {
    try {
      const { username, email, password } = req.body;
      
      const hashedPass = encPass.generateHash(password);
      const registeredUser: any = await User.create({
        username,
        email,
        password: hashedPass,
      });

      const token = genToken.generateToken({
        id: registeredUser.id,
        email: registeredUser.email,
        username: registeredUser.username,
      });

      const message = [201, 'User created successfully', true];
      return res.status(message[0]).json({
        success: message[2],
        message: message[1],
        user: registeredUser,
        token,
      });
    } catch (error) {
      reqResponses.handleError(error.toString(), 500, res);
    }
  }

  static async LoginUser(req: any, res: any) {
    try {
      const { email } = req.body;
      const loggedInUser: any = await User.findOne({ email },
        { "__v": 0 }
      );

      const token = genToken.generateToken({
        id: loggedInUser.id,
        email: loggedInUser.email,
        username: loggedInUser.username,
      });

      const message = [201, 'Login successful!', true];
      return res.status(message[0]).json({
        success: message[2],
        message: message[1],
        user: loggedInUser,
        token,
      });
    } catch (error) {
      return reqResponses.handleError(error.toString(), 500, res);
    }
  }
}

export default AuthController;
