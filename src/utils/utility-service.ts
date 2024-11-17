import { transporter } from './nodemailer-config';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

class UtilityService {
  sendPasswordMail = async (email: string) => {
    try {
      const response = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Thank You For Wishing Daddy a Happy Birthday',
        html: `<div width="50%" style="text-align: center; padding: 10px; border-radius: 5px; border: 2px solid gold;">
                  <h1>Welcome to Torre<h1>
                  <h3 style="font-size: 20px">We appreciate you for taking out time to wish our father a happy birthday. May God bless you.</h3>
                  <p style="font-size: 20px">Thank You <img src='../images/thumbs up.gif' alt='thumbs up' /></p>
                  <p style="font-size: 20px">The Ndaobong Family</p>
                  </div>`,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  getUUID() {
    return uuidv4();
  }
}

export const UtilService = new UtilityService();
