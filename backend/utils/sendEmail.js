import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';

dotenv.config();

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

export const sendOTPEmail = async (email, otp) => {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'snsknarayana@gmail.com',
          Name: 'Sanjeewa Narayana',
        },
        To: [
          {
            Email: email,
            Name: 'Recipient Name',
          },
        ],
        Subject: 'Your OTP Code',
        HTMLPart: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
      },
    ],
  });

  await request;
};

export const sendConfirmationEmail = async (email) => {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'snsknarayana@gmail.com',
          Name: 'Sanjeewa Narayana',
        },
        To: [
          {
            Email: email,
            Name: 'Recipient Name',
          },
        ],
        Subject: 'Email Verified',
        HTMLPart: `<p>Your email has been successfully verified!</p>`,
      },
    ],
  });

  await request;
};
