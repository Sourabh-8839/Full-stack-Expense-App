const nodemailer= require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: 'sourabhsingh8839@gmail.com',
        pass: 'xsmtpsib-ea013b516cd447385197c118557d2a329a9da2e80938b196747e920414eeaaa8-IR6GqtOcDVfTWjzb'
    }
});

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'casimir.klocko76@ethereal.email',
//         pass: 'BxfZD3QzSjhdaQGYER'
//     }
// });

exports.forgotPassword =async(req,res)=>{

    try {
        const info = await transporter.sendMail({
            from: '"Sourabh" <sourabhsingh8839@gmail.com>', // sender address
            to: "sourabhshingh44@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<h1>change password</h1>", // html body
          });
    
          console.log(info.messageId);
          res.json(info);
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }

}



