import jwt from "jsonwebtoken";

export default function generateToken(user: { fname: string; lname: string; email: string }): string {
  const payload = {
    fname: user.fname,
    lname: user.lname,
    email: user.email,
  };

  const secretKey = "bazinga";
  const options = { expiresIn: "30m" };

  return jwt.sign(payload, secretKey, options);
}
