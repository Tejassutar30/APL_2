const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log decoded token to check the payload structure
    console.log("Decoded token:", decoded);

    // Attach user ID from decoded token to the request object
    req.id = decoded.id;  // Assuming the decoded token contains an `id` field

    next();
  } catch (error) {
    // Handle different errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Unauthorized: Token has expired" });
    }
    return res.status(500).json({ success: false, message: "Error decoding token", error: error.message });
  }
};
