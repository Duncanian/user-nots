import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Utils {
  static generateToken(payload: object) {
    const token = jwt.sign(payload, process.env.JWT_PUBLIC_KEY, { expiresIn: 60 * 60 * 24 * 7 });
    return token;
  }
}

export default Utils;
