import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});


export const sendOTP = (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}. It is valid for 2 minutes.`,
  };

  return transporter.sendMail(mailOptions).then(() => {
    return { success: true, message: "OTP sent successfully" };
  });
};
