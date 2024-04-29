// Import the necessary modules here
import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (user) => {
    console.log("this is user", user);

    
    // Create a Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.STORFLEET_SMPT_MAIL,
        pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.STORFLEET_MAIL,
      to: user.email,
      subject: "Welcome mail",
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                  /* Add your custom CSS styles here */
                  body {
                      font-family: Arial, sans-serif;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                  }
                  .header {
                      text-align: center;
                  }
                  .logo {
                      max-width: 150px;
                  }
                  .content {
                      margin-top: 20px;
                  }
                  .button {
                      display: inline-block;
                      padding: 10px 20px;
                      background-color: #20d49a;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 5px;
                  }
                  /* Mobile Responsive Styles */
                  @media only screen and (max-width: 600px) {
                      .container {
                          padding: 10px;
                      }
                      .logo {
                          max-width: 100px;
                      }
                      .button {
                          display: block;
                          margin-top: 10px;
                      }
                  }
                 .token{
                    text-align:center
                 }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <img class="logo" src="https://files.codingninjas.in/logo1-32230.png" alt="Storefleet Logo">
                      <h1 style="color:blue">Welcome to Storefleet</h1>
                  </div>
                  <div class="content">
                      <h2 style="text-align:center;color:green">Hello, ${user.name}</h2>
                    <p class="token">We warmly welcome you to the store fleet.</p>
                      <p class="token">Thanks for registering with us!!!!</p>
                  </div>
              </div>
          </body>
          </html>
      `,
    };
  
    await transporter.sendMail(mailOptions);
};
