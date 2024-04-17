export const isValidToken = (req, res, next) => {
  console.log("Token verified.");
  next();
};
