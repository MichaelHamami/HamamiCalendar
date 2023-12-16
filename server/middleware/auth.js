import jwt from "jsonwebtoken";
import {SECRETS} from '../secrets.js'


const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const decodedData = jwt.verify(token, SECRETS.secret);

      if(!decodedData?.id) return res.status(401).json({ message: "Unauthenticated" });

      req.userId = decodedData?.id;
      next();
    } else{
      return res.status(401).json({ message: "Unauthenticated" });
    }

  } catch (error) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
};

export default auth;
