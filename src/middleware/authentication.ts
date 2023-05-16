import jwt from 'jsonwebtoken';
import config from "../config";

// AuthenticateToken middleware function
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, config.jwtSecret, (err: any, decoded: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded.user;
    next();
  });
}

export default authenticateToken
