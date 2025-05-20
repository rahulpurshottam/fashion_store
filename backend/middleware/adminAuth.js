import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not Authorized, Login Again" });
    }

    const token = jwt.sign(
  { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD },
  process.env.JWT_SECRET
);

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

if(token_decode.email !== process.env.ADMIN_EMAIL ||
  token_decode.password !== process.env.ADMIN_PASSWORD){
      return res.json({ success: false, message: "Not Authorizeddd" });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.json({ success: false, message: "Not Authorized" });
  }
};

export default adminAuth;
