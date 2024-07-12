import express, { Request, Response } from "express";

const handleError = (res: Response, error: any) => {
  console.error(error);
  res.status(400).json({ error: error.message || "An error occurred" });
};

const validateToken = (tokenString: any, res: Response): number | null => {
  if (!tokenString) {
    res.status(400).json({ error: "Authorization header missing" });
    return null;
  }

  const token = Number(tokenString);

  if (isNaN(token)) {
    res.status(401).json({ error: "Invalid token format - token should be a number" });
    return null;
  }

  return token;
};

export { handleError, validateToken };
