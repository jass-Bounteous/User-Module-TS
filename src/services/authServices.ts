const jwt = require("jsonwebtoken");

function generateTokens(user: Object) {
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  return { accessToken, refreshToken };
}
function generateAccessToken(user: Object) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20m",
  });
}

export { generateTokens, generateAccessToken };
