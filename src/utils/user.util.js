import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure:true, 
    auth: {
    user: "fundoo.notes.demo@gmail.com",
    pass: "ssoq nmbw jpaw vqkf", 
  },
});

export const sendResetMail = async (email, token) => {
  try {
    const mailOptions = {
      from: 'FunDooNotes <fundoo.notes.demo@gmail.com>', 
      to: email,
      subject: 'Reset Password',
      text: `Hello!.... \nYour reset token:\n${token}`,
    };
    
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};