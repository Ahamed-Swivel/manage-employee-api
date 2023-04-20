import { Request, Response, NextFunction } from "express";

const validateEmployee = (req: Request, res: Response, next: NextFunction): any => {
  const { firstName, lastName, email, number, gender } = req.body;

  // Check if required fields are missing
  if (!firstName || !lastName || !email || !number || !gender) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate firstName and lastName
  const nameRegex = /^[a-zA-Z]+$/;
  const minLength = 6;
  const maxLength = 10;
  if (!nameRegex.test(firstName) || firstName.length < minLength || firstName.length > maxLength) {
    return res.status(400).json({ message: "Invalid firstName" });
  }
  if (!nameRegex.test(lastName) || lastName.length < minLength || lastName.length > maxLength) {
    return res.status(400).json({ message: "Invalid lastName" });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  // Validate number
  const numberRegex = /^\+?\d{10}$/;
  if (!numberRegex.test(number)) {
    return res.status(400).json({ message: "Invalid number" });
  }

  // Validate gender
  if (gender !== "M" && gender !== "F") {
    return res.status(400).json({ message: "Invalid gender" });
  }

  next();
};

export default validateEmployee
