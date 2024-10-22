require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
      res.json("masukkan token dlu");
      return;
    }

    const token = header.split(" ")[1];
    if (!token) {
      res.json("invalid token");
      return;
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);

      req.payload = payload;
      next();
    } catch {
      res.json("invalid token");
      return;
    }
  },
  checkRole: (req, res, next) => {
    if (req.payload.role !== "admin") {
      return res.status(403).send("Forbidden");
    }

    next();
  },
};
