import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";
import { transporter, sendSMSVerifyLink } from "../Utils/utils.js";
import { json } from "express";
import dotenv from "dotenv";

dotenv.config();
const secret = "test";

export const addPhone = async (req, res) => {
  console.log("addPhone called in controllers");

  const { email, phone } = req.body;

  try {
    const token = jwt.sign({ email, phone }, secret, {
      expiresIn: "5m",
    });
    const url = `http://localhost:5000/user/verify_phone/${token}/`;
    // const url = "http://localhost:3000/";

    sendSMSVerifyLink(phone, url);
    return res.json({
      message:
        "Link has been sent to your whatsapp please click on it to activate your phone",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong before  the link sended to the whatsapp",
    });
    console.log(error);
  }
};

export const verifyPhone = async (req, res) => {
  console.log("verifyPhone called in controllers");
  const { token } = req.params;
  console.log("token is:" + token);
  let email_user, phone_user;
  if (token) {
    jwt.verify(token, secret, function (err, decodedToken) {
      if (err) {
        return res.status(400).json({ error: "Incorrect  or Expired Link" });
      }
      const { email, phone } = decodedToken;
      email_user = email;
      phone_user = phone;
    });
    try {
      console.log(`email: ${email_user} phone: ${phone_user}`);
      const filter = { email: email_user };
      const update = { phoneNumber: phone_user, phoneVerified: true };
      const user = await UserModal.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log(user);
      return res.json({ message: "Succefuly" });

      // return res.redirect("http://localhost:3000");
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  } else {
    return res.json({ error: "Something went wrong on if else" });
  }
};
export const activateUser = async (req, res) => {
  console.log("activateUser called in controllers");
  const { token } = req.params;

  // const {token} = req.body;
  console.log("token is:" + token);
  let name_user, email_user, password_user;
  if (token) {
    jwt.verify(token, secret, function (err, decodedToken) {
      if (err) {
        return res.status(400).json({ error: "Incorrect  or Expired Link" });
      }
      const { name, email, password } = decodedToken;
      name_user = name;
      email_user = email;
      password_user = password;
    });
    try {
      console.log(
        `name: ${name_user} email: ${email_user} password: ${password_user}`
      );
      const hashedPassword = await bcrypt.hash(password_user, 12);
      console.log(hashedPassword);
      const result = await UserModal.create({
        email: email_user,
        password: hashedPassword,
        name: name_user,
      });

      const newToken = jwt.sign(
        { email: result.email, id: result._id },
        secret,
        { expiresIn: "1h" }
      );

      // return res.status(201).json({ result: result, token: newToken });
      // return res.redirect("http://localhost:3000");
      return res.json({
        result: result,
        token: newToken,
        message: "Email Activated Successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  } else {
    return res.json({ error: "Something went wrong on if else" });
  }
};

export const signup = async (req, res) => {
  console.log("signup called in controllers");

  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.json({ error: "User already exists" });

    // return res.status(400).json({ message: "User already exists" });
    const name = `${firstName} ${lastName}`;
    const token = jwt.sign({ name, email, password }, secret, {
      expiresIn: "1h",
    });
    const url = `http://localhost:3000/activate/${token}`;
    var mailOptions = {
      from: process.env.email_server,
      to: email,
      subject: "User Activation Link",
      html: `
          <h2> Please  click on given link to activate your account</h2>
          <a href="${url}">Click It</a>
          `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ error: "Sending mail went wrong" });
        // return res.status(400).json({error:"Something went wrong"});
      }
      console.log("Email sent: " + info.response);
      return res.status(200).json({
        message:
          "Link has been sent to your email please click on it to activate your user",
        token: token,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong before  the link sended to the email",
    });
    console.log(error);
  }
};

// Login function
export const signin = async (req, res) => {
  console.log("signin (login)called in controllers");
  console.log(req.body);
  // console.log(req);

  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    // if (!oldUser) return res.status(404).json({ error: "User doesn't exist" });
    if (!oldUser) return res.json({ error: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.json({ error: "Invalid credentials" });
    // return res.status(400).send({ error: "Invalid credentials" });

    // return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    // res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
// from: "hamami.calendar@gmail.com",
export const changePassword = async (req, res) => {
  console.log("changePassword called in controllers");
  const { email, oldPassword, newPassword } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      oldUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    console.log(hashedPassword);
    const filter = { email: email };
    const update = { password: hashedPassword };
    const user = await UserModal.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(user);

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ result: user, token, message: "password changed" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editProfile = async (req, res) => {
  console.log("editProfile called in controllers");
  const { email, firstName, lastName } = req.body;
};

export const changeEmail = async (req, res) => {
  console.log("changeEmail called in controllers");
  const { oldEmail, newEmail } = req.body;

  const oldUser = await UserModal.findOne({ newEmail });

  if (oldUser) return res.status(400).json({ message: "Email already exists" });

  const token = jwt.sign({ newEmail, oldEmail }, secret, {
    expiresIn: "5m",
  });
  // TODO
  // need to sent them link to client page and from them do axios request to server
  const url = `http://localhost:5000/user/confirmEmail/${token}`;
  var mailOptions = {
    from: process.env.email_server,
    to: newEmail,
    subject: "Email Change Confirm Link",
    html: `
        <h2> Please  click on given link to confirm your new email</h2>
        <a href="${url}">Click It</a>
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.json({ error: "Something went wrong" });
    }
    console.log("Email sent: " + info.response);
    return res.json({
      message:
        "Link has been sent to your email please click on it to confirm your new email",
      token: token,
    });
  });
};

export const confirmEmail = async (req, res) => {
  console.log("confirmEmail called in controllers");
  const { token } = req.body;

  console.log("token is:" + token);
  let new_email, old_email;
  if (token) {
    jwt.verify(token, secret, function (err, decodedToken) {
      if (err) {
        return res.status(400).json({ error: "Incorrect  or Expired Link" });
      }
      const { oldEmail, newEmail } = decodedToken;
      new_email = newEmail;
      old_email = oldEmail;
    });
    try {
      console.log(`email: ${new_email}`);
      const filter = { email: old_email };
      const update = { email: new_email };
      const user = await UserModal.findOneAndUpdate(filter, update, {
        new: true,
      });

      console.log(user);
      // return res.status(201).json({ result: result, token: newToken });
      return res.json({ message: "Email changed" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  } else {
    return res.json({ error: "Something went wrong on if else" });
  }
};
