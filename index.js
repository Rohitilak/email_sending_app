const express = require('express');
const nodemailer = require("nodemailer");
const app = express();

//1. configure the nodemailer
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user:"rohittilak086@gmail.com",
//       pass: "password",
//     },
//   });

app.use(express.urlencoded())

const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false, // Use `true` for port 465, `false` for all other ports
    // auth: {
    //   user:"rohittilak086@gmail.com",
    //   pass: "password",
    // },
  });


  app.get('/', (req, res)=>{
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Form</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      form {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        width: 400px;
      }
      label {
        font-weight: bold;
      }
      input[type="email"],
      input[type="text"],
      textarea {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }
      textarea {
        height: 100px;
      }
      button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
      }
      button:hover {
        background-color: #45a049;
      }
    </style>
    </head>
    <body>
    
    <form action="/send-email" method="post">
      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email" required><br>
      <label for="subject">Subject:</label><br>
      <input type="text" id="subject" name="subject" required><br>
      <label for="message">Message:</label><br>
      <textarea id="message" name="message" rows="4" required></textarea><br><br>
      <button type="submit">Send Email</button>
    </form>
    
    </body>
    </html>  `)
  })


app.post('/send-email', (req, res) => {
    const data = req.body
    console.log(data);
    const mailOptions = {
        from: 'do-not-reply@gmail.com', // Replace with your email address
        to: req.body.email, // Replace with the recipient's email address
        subject: req.body.subject, // Replace with your desired subject
        // text: 'This is a plain text email body.', // Plain text content
        // or
        html: req.body.message
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send("send success!");
        }
      });

})


// 2. mail detials 
//   const mailOptions = {
//     from: 'node@gmail.com', // Replace with your email address
//     to: 'recipien@example.com', // Replace with the recipient's email address
//     subject: 'Sending Email using Nodemailer', // Replace with your desired subject
//     // text: 'This is a plain text email body.', // Plain text content
//     // or
//     html: ` <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin: 0 auto; background-color: #ffffff;">
//     <tr>
//         <td style="padding: 20px; text-align: center; background-color: #4CAF50; color: white;">
//             <h2>User Information</h2>
//         </td>
//     </tr>
//     <tr>
//         <td style="padding: 20px;">
//             <table style="width: 100%; border-collapse: collapse;">
//                 <tr>
//                     <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; width: 30%;"><strong>Name</strong></td>
//                     <td style="padding: 10px; border: 1px solid #ddd;">John Doe</td>
//                 </tr>
//                 <tr>
//                     <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Email</strong></td>
//                     <td style="padding: 10px; border: 1px solid #ddd;">john.doe@example.com</td>
//                 </tr>
//                 <tr>
//                     <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Address</strong></td>
//                     <td style="padding: 10px; border: 1px solid #ddd;">1234 Elm Street, Springfield, IL 62704</td>
//                 </tr>
//                 <tr>
//                     <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Contact Number</strong></td>
//                     <td style="padding: 10px; border: 1px solid #ddd;">(555) 123-4567</td>
//                 </tr>
//                 <tr>
//                     <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Date of Birth</strong></td>
//                     <td style="padding: 10px; border: 1px solid #ddd;">January 1, 1990</td>
//                 </tr>
//                 <tr>
//                     <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Occupation</strong></td>
//                     <td style="padding: 10px; border: 1px solid #ddd;">Software Engineer</td>
//                 </tr>
//             </table>
//         </td>
//     </tr>
//     <tr>
//         <td style="padding: 20px; text-align: center; background-color: #f4f4f4;">
//             <p style="margin: 0;">For more information, please contact us at <a href="mailto:support@example.com" style="color: #4CAF50;">support@example.com</a>.</p>
//         </td>
//     </tr>
// </table>`
//   };

//   //3. send the mail
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });

app.listen(8081, ()=>{
    console.log("your server is running on port 3010");
})