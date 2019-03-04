import bcrypt from 'bcrypt';

class EncryptData {
  static generateHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static validPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

export default EncryptData;
