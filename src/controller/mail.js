const nodemailer = require('nodemailer');

const sendBookingMail = async(req, res) => {
    console.log('it hit');
    try{
    const {fullname, email,body,subject} = req.body.data;
    console.log(req.body.data)
    const transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:465,
        secure:true,
        auth:{
            user:process.env.SMTP_USER,
            pass:'Acktec@123#'
        }
    })

    const mailOptions = {
        from:process.env.SENDER_MAIL,
        to:`${fullname} <${email}>`,
        replyTo:process.env.SENDER_MAIL,
        subject:subject,
        html:body
    }

    const info =  await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({
        status: "success",
        data: "Email successfully sent",
      });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Unable to retrieve users.",
            error: error.message,
          });
    }
}

module.exports={
    sendBookingMail
}