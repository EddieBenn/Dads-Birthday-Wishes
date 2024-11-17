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
        html: `
        <div style="width: 60%; margin: 0 auto; text-align: center; padding: 20px; border-radius: 10px; border: 2px solid gold; background-color: #fffaf0; font-family: Arial, sans-serif;">
          <h3 style="font-size: 24px; color: #d2691e; margin-bottom: 10px;">We Appreciate You!</h3>
          <p style="font-size: 18px; color: #8b4513; margin: 10px 0;">
            Thank you for taking the time to wish our father a happy birthday. Your thoughtful message means so much to us.
          </p>
          <img 
            src="https://res.cloudinary.com/dixoaggbe/image/upload/v1731841849/thumbs_up_gif.gif" 
            alt="Thumbs up" 
            style="width: 100px; height: auto; margin: 20px 0;" />
          <p style="font-size: 18px; color: #2e8b57; margin: 10px 0;">
            With gratitude,<br />
            <strong style="color: #ff4500;">The Ndaobong Family</strong>
          </p>
        </div>
        `,
      });
      return response;
    } catch (err) {
      console.error('Error sending email:', err);
    }
  };

  getUUID() {
    return uuidv4();
  }
}

export const UtilService = new UtilityService();
