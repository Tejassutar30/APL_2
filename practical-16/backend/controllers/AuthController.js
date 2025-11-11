const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");  // Use crypto for generating more secure OTP
const User = require("../models/user");

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Please login! You already have an account",
      });
    }

    const securePassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: securePassword,
    });
    await user.save();
    return res.status(201).json({ success: true, message: "Signup successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      console.log("User not found, returning message: Please signup"); // Debug log
      return res.status(400).json({ success: false, message: "Please signup" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .status(200)
      .json({ success: true, message: "Login successful", cookie: token });

  } catch (error) {
    console.log("Error:", error); // Debug log for errors
    return res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({ success: true, message: "Logged out" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  const reqId = req.id;
  try {
    let user = await User.findById(reqId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User found", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Reset password route
const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Generating OTP using crypto for better security
    const otp = crypto.randomBytes(3).toString("hex");  // 6-character hex OTP
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Please signup" });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a60b01ed6bf50d",
        pass: "34e1ac82c175ab",
      },
    });

    const info = await transport.sendMail({
      from: "savantaditya176@gmail.com",
      to: email,
      subject: "New OTP has been generated",
      html: `<h3>Your generated OTP is: <i>${otp}</i></h3>`,
    });

    if (info.message) {
      // Update OTP and set expiry (e.g., 10 minutes)
      await User.findOneAndUpdate(
        { email },
        { $set: { otp, otpExpiry: Date.now() + 10 * 60 * 1000 } } // OTP expiry time
      );
      return res.status(200).json({ success: true, message: "OTP has been sent to your email" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  const { otp, newPassword } = req.body;
  try {
    let user = await User.findOne({ otp });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Check OTP expiry
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    const securePassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { otp },
      { $set: { password: securePassword, otp: 0, otpExpiry: null } }
    );

    return res.status(200).json({ success: true, message: "Password updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signup, logout, login, getUser, resetPassword, verifyOtp };
