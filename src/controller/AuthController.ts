import { Request, Response } from "express";

import logger from "../logger";
import AuthRepository from "../repository/AuthRepository";

class AuthController {
    public async authenticate(req: Request, res: Response): Promise<void> {
        try {
          // Generate a JWT token
          const token = new AuthRepository().getToken()

          res.json({ token });
        } catch (error) {
          logger.error(error)
          res.status(400).send(error);
        }
    }
}

export default new AuthController();
