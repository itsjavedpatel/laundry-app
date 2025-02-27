const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendOTP = async (email, otp) => {
  try {
    console.log(email);
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP for verification",
      text: `Your OTP is ${otp} Valid for 5 minutes`,
    };
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};
const sendPassword = async (name, email, password) => {
  console.log("Sending password to:", email);

  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password for E-DHOबी",
      text: `
      Welcome to E-DHOबी 🎉
      Dear ${name},
      Your account has been successfully registered!
      Below are your login credentials:
      ✉️ Email: ${email}
      🔑 Password: ${password}
      Please change your password after logging in for security purposes.
      Regards,  
      E-DHOबी Team`,
    };
    await transporter.sendMail(mailOptions);
    console.log("Password sent successfully");
  } catch (error) {
    console.error("Error sending password:", error);
  }
};
module.exports = { sendOTP, sendPassword };
