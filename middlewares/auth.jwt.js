import jwt from "jsonwebtoken";
import "dotenv/config";
function authenticatetoken(req, res, next) {
try{
  console.log(req.headers); 
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userid) => {
    req.userid = userid;
    next();
  });
}
catch(error){
    res.send(error)
}
}

export { authenticatetoken };
