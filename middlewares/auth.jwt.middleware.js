import jwt from "jsonwebtoken";
import "dotenv/config";
export async function authenticateToken(req, res, next) {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const userid = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userid = userid;
    next();
  } catch (error) {
    console.log("Error caught");
    res.send("Verification error");
  }
}
