import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  // res.setHeader("Access-Control-Allow-Credentials", true);
  // var origin = req.get('origin');

  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Origin', origin);

  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  // res.header("Access-Control-Allow-Credentials", true);

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const decodedData = jwt.verify(token, secret);

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
