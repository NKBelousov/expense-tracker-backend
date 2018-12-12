const isValid = token => token === "secret";

module.exports = function (req, res, next) {
  const token = req.get("Authorization");
  if (isValid(token)) {
    next();
  } else {
    res.status(401).json({
      error: "invalid_access_token",
    });
  }
}