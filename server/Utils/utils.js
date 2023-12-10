import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import Task from "../models/task.js";
import Agenda from "agenda";
import dotenv from "dotenv";

dotenv.config();


// var mailOptions = {
//     // from: process.env.email_server_user,
//     to: email,
//     subject: "User Activation Link",
//     html: `
//         <h2> Please  click on given link to activate your account</h2>
//         <a href="${url}">Click It</a>
//         `,
//   };

export const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.email_server_user,
      pass: process.env.email_password,
    },
  })
);

export const sendEmailRemainder = async (task, email_to) => {
  console.log(
    `sendEmailRemainder called with email: ${email_to} and task: ${task}`
  );

  var mailOptions = {
    from: process.env.email_server_from,
    to: email_to,
    subject: "Task Remainder",
    html: `
        <h2> Task Remainder </h2>
        <p>Remainder for Task name: ${task.name} </p> <br>
        <p>Remainder for Task Description: ${task.description} </p> <br>
        <p>Remainder for Task Hour: ${task.startTime} </p><br>
        `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Email sent: " + info.response);
  });
};
