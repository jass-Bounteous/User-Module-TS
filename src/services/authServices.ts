const jwt = require("jsonwebtoken");

function generateTokens(user: Object): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken: string = generateAccessToken(user);
  const refreshToken: string = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  return { accessToken, refreshToken };
}
function generateAccessToken(user: Object): string {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20m",
  });
}

export { generateTokens, generateAccessToken };
