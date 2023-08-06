const nodemailer= require('nodemailer');
const uuid = require('uuid');
const User = require('../models/userData');
const ForgotPassword = require('../models/ForgotPasswordRequest');
const bcrypt= require('bcrypt');




const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: 'sourabhsingh8839@gmail.com',
        pass: 'xsmtpsib-ea013b516cd447385197c118557d2a329a9da2e80938b196747e920414eeaaa8-ZzfCV80Ywp5jIgdr'
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
        console.log(req.body);

        const {email} = req.body;

        const user = await User.findOne({where:
        {
            email:email
        }
    });

   


    if(user){
        const id = uuid.v4();

        await ForgotPassword.create({
            id:id,
            userId:user.id,
            isActive:true,
        });

         const info = await transporter.sendMail({
            from: '"Sourabh" <sourabhsingh8839@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Reset Password", // Subject line
            text: "Dont Worry you can click below link", // plain text body
            html: `<h1>Click below link to change Password</h1>
            <a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>`, // html body
          });

          console.log(info.messageId);
          res.json(info);

    }
    else{
        res.json('User not found ');
    }
        
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }

}

exports.resetpassword = async(req,res)=>{

    try {

    
        const id = req.params.id;
        console.log(id);

        ForgotPassword.findOne({ where : { id:id}}).then(forgotpasswordrequest => {

            console.log(forgotpasswordrequest);
            if(forgotpasswordrequest.isActive){
                forgotpasswordrequest.update({ isActive: false});

                res.status(200).send(`<html>
                                        <script>
                                            function formsubmitted(e){
                                                e.preventDefault();
                                                console.log('called')
                                            }
                                        </script>
    
                                        <form action="/password/updatepassword/${id}" method="get">
                                            <label for="newpassword">Enter New password</label>
                                            <input name="newpassword" type="password" required></input>
                                            <button>reset password</button>
                                        </form>
                                    </html>`
                                    )
                res.end()
    

        }
        else{
            res.send('This link is expire plz. try again');
        }
    }
        )
        
    } catch (error) {
        res.json({message:error.message});
        console.log(error);
    }
   


}


exports.updatepassword =async(req,res)=>{


    try {
        const { newpassword } = req.query;
        const { resetId } = req.params;

        const resetPassword = await ForgotPassword.findOne({ where : { id: resetId }});
        
           const user = await  User.findOne({where: { id : resetPassword.userId}});
          
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    
                    bcrypt.hash(newpassword, saltRounds, async function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            await user.update({ password :hash});
                        
                            res.status(201).json({message: 'Successfuly update the new password'})
                        });  
                        
                
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            
        
    } catch(error){
        return res.status(403).json({ error:error.message, success: false } )
    }



}

