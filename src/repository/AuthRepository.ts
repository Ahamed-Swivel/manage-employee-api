import jwt from 'jsonwebtoken';

import config from "../config";

class AuthRepository {
  public getToken(): string {
    return jwt.sign({}, config.jwtSecret);
  }
}

export default AuthRepository;
