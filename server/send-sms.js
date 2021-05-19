import whatsAppClient from "@green-api/whatsapp-api-client";

const restAPI = whatsAppClient.restAPI({
  idInstance: "8522",
  apiTokenInstance: "2b0ffa0592eaa1f37ea22b409859b0e0ab4c61aa8e4eeae66f",
});

restAPI.message.sendMessage(null, 972506919091, "hayimik").then((data) => {
  console.log(data);
});

// import unirest from "unirest";
// // var unirest = require("unirest");

// var req = unirest(
//   "POST",
//   "https://maytapi-whatsapp.p.rapidapi.com/+972508320025/sendMessage"
// );

// req.headers({
//   "content-type": "application/json",
//   "x-rapidapi-key": "eb6ed890c3msh9e214dfbf3f328cp1713e1jsn60be319d2359",
//   "x-rapidapi-host": "maytapi-whatsapp.p.rapidapi.com",
//   useQueryString: true,
// });

// req.type("json");
// req.send({
//   to_number: "+972506919091",
//   type: "text",
//   message: "Hello",
// });

// req.end(function (res) {
//   if (res.error) throw new Error(res.error);

//   console.log(res.body);
// });

// import client from "twilio";
// client();
// // const client = require("twilio")();

// client.messages
//   .create({
//     from: "whatsapp:+972508320025",
//     to: "whatsapp:+972506919091",
//     body: "Hello from hamami",
//   })
//   .then((message) => console.log(message.sid));
