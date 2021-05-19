import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import Task from "../models/task.js";
import Agenda from "agenda";
import dotenv from "dotenv";
import whatsAppClient from "@green-api/whatsapp-api-client";

dotenv.config();

const restAPI = whatsAppClient.restAPI({
  idInstance: process.env.SMS_ID_INSTANCE,
  apiTokenInstance: process.env.SMS_API_TOKEN_INSTANCE,
});

// var mailOptions = {
//     // from: process.env.email_server,
//     from: "hamami.calendar@gmail.com",
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
    from: process.env.email_server,
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

export const sendSMSRemainder = async (phoneNumber, message) => {
  console.log(
    `sendSMSRemainder called with phone: ${phoneNumber} message: ${message}`
  );
  // restAPI.message.sendMessage(null, 972506919091, "hayimik").then((data) => {
  restAPI.message.sendMessage(null, phoneNumber, message).then((data) => {
    console.log(data);
  });
};

export const sendSMSVerifyLink = async (phoneNumber, link) => {
  console.log(
    `sendSMSVerifyLink called with phone: ${phoneNumber} link: ${link}`
  );
  restAPI.message.sendLink(null, phoneNumber, link).then((data) => {
    console.log(data);
  });
};
