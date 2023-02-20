const jwt = require('jsonwebtoken');

const appToken = process.env.JWT_TOKEN

const createToken = (data, expiresIn = '1h') => {
  const options = { algorithm: 'HS256', expiresIn } ;
  return jwt.sign(data, appToken, options);
};

const verifyToken = (jwtToken) => {
  try {
    const data = jwt.verify(jwtToken, process.env.JWT_TOKEN );
    return data;
  } catch {
    return undefined;
  }
}

exports.createToken = createToken
exports.verifyToken = verifyToken