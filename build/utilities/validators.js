"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLoginDetails = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.GMAIL_USER}`,
        pass: `${process.env.GMAIL_PASSWORD}`,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendLoginDetails = async (params) => {
    try {
        const info = await transport.sendMail({
            from: `${process.env.GMAIL_USER}`,
            to: params.email,
            subject: "CAMOUFLAGE UNIVERSITY LOGIN DETAILS",
            html: `
          <html>
          <head>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      margin: 0;
                      padding: 0;
                  }
          
                  .container {
                      max-width: 90%;
                      margin: auto;
                      padding: 20px;
                      border: 1px solid #e0e0e0;
                      border-radius: 10px;
                      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                  }
          
                  h2 {
                      color: #1A512E;;
                      text-align: center;
                      font-weight: 800;
                  }
          
                  p {
                      color: #777777;
                      text-align: center;
                  }
          
                  .otp {
                      font-size: 20px;
                      letter-spacing: 2px;
                      text-align: center;
                      color: #ff9900;
                      display: block;
                      margin-top: 5px;
                  }

                  .surname{
                    font-size: 20px;
                      letter-spacing: 2px;
                      color: #ff9900;
                      margin-top: 5px;
                  }
                  .team {
                      color: #1A512E;
                      font-weight: 800
                  }
          
                  .signature {
                      color: #444444;
                      text-align: center;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h2>Welcome to Camouflage University</h2>
                  <p>Below are your login details into the student/staff portal of the school</p>
                  <span class="otp">Email: ${params.email}</span>
                  <span class="otp">Registration Number: ${params.registration_number}</span>
                  <p class="surname">Please use your surname (in lower case) as your login password.</p>
                  <p class="signature">Thank You<br><span class="team">Admissions</span></p>
              </div>
          </body>
          </html>`
        });
        return info;
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendLoginDetails = sendLoginDetails;
