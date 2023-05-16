import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import logger from "../logger";
import config from "../config";

class AuthController {
    public async authenticate(req: Request, res: Response): Promise<void> {
        try {
          // Generate a JWT token
          const token = jwt.sign({}, config.jwtSecret);

          res.json({ token });
        } catch (error) {
          logger.error(error)
          res.status(400).send(error);
        }
    }
}

export default new AuthController();
