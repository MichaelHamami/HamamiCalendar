import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";
import { transporter,checkSendEmail } from "../Utils/utils.js";
import {SECRETS} from '../secrets.js'


const secret = SECRETS.secret;

export const activateUser = async (req, res) => {
  const { token } = req.params;

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
      const hashedPassword = await bcrypt.hash(password_user, 12);
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

      return res.json({
        result: result,
        token: newToken,
        message: "Email Activated Successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    return res.json({ error: "Something went wrong on if else" });
  }
};

export const signup = async (req, res) => {

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
      from:SECRETS.email_server_user,
      to: email,
      subject: "User Activation Link",
      html: `
          <h2> Please  click on given link to activate your account</h2>
          <a href="${url}">Click It</a>
          `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({error:"Something went wrong"});
      }
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
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.json({ error: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.json({ error: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "14h",
    });
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) return res.status(404).json({ error: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      oldUser.password
    );

    if (!isPasswordCorrect)
      return res.json({ error: "Old Password incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const filter = { email: email };
    const update = { password: hashedPassword };

    const user = await UserModal.findOneAndUpdate(filter, update, {
      new: true,
    });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

   return res.status(200).json({ result: user, token, message: "password changed" });
  } catch (err) {
   return res.status(500).json({ message: "Something went wrong" });
  }
};

export const editProfile = async (req, res) => {
  try {
    console.log("edit Profile called");
    const { email, firstName, lastName } = req.body;
    return res.status(200).json({message:"Profile Changed"});
  } catch (error) {
    console.log(error)
   return res.status(500).json({ message: "Something went wrong" });
  }
};

export const changeEmail = async (req, res) => {
  const { oldEmail, newEmail } = req.body;
  const oldUser = await UserModal.findOne({ email: newEmail });

  // if (oldUser) return res.status(400).json({ message: "Email already exists" });
  if (oldUser)
    return res.json({ message: "Email already exists", type: "Error" });

  const token = jwt.sign({ newEmail, oldEmail }, secret, {
    expiresIn: "5m",
  });

  const url = `http://localhost:3000/email_change_activate/${token}`;

  var mailOptions = {
    from:SECRETS.email_server_user,
    to: newEmail,
    subject: "Email Change Confirm Link",
    html: `
        <h2> Please  click on given link to confirm your new email</h2>
        <a href="${url}">Click It</a>
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.json({ error: "Something went wrong" });
    }
    return res.json({
      message:
        "Link has been sent to your email please click on it to confirm your new email",
      token: token,
    });
  });
};

export const confirmEmail = async (req, res) => {
  const { token } = req.params;

  let new_email, old_email;
  if (token) {
    jwt.verify(token, secret, function (err, decodedToken) {
      if (err) {
        return res.json({ error: "Incorrect  or Expired Link" });
      }

      const { oldEmail, newEmail } = decodedToken;
      new_email = newEmail;
      old_email = oldEmail;
    });

    try {
      const filter = { email: old_email };
      const update = { email: new_email };
      const user = await UserModal.findOneAndUpdate(filter, update, {
        new: true,
      });
      const newToken = jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "1h",
      });
      // return res.status(201).json({ result: result, token: newToken });
      // return res.json({ message: "Email changed" });
      return res.json({
        message: "Email changed",
        result: user,
        token: newToken,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    return res.json({ error: "Something went wrong on token" });
  }
};
