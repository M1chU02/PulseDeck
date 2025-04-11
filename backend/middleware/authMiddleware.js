import jwt from "jsonwebtoken";
const { verify } = jwt;
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Nieautoryzowany dostęp" });
    }
  }

  return res.status(401).json({ message: "Brak tokenu autoryzacyjnego" });
};
