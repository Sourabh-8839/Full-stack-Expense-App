
const {Upload} = require('@aws-sdk/lib-storage');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const expense = require('../models/Expense');
const User = require('../models/userData');

const {getSignedUrl} =require('@aws-sdk/s3-request-presigner');



const sequelize = require('../utils/dataStore');

const IAM_USER_KEY = 'AKIAZZ2B3CY5VEDKOFGT';
const IAM_USER_SECRETKEY = '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';



const S3 = new S3Client({
    region:'eu-north-1',
    credentials:{
    accessKeyId:IAM_USER_KEY,
    secretAccessKey:IAM_USER_SECRETKEY,
    }
})

const uploadToS3=async(data,fileName)=>{

    const Bucket_Name = 'expenselist';
  
    try {
        const parallelUploads3 = new Upload({
          client:S3,
          params: { 
            Bucket:Bucket_Name,
            Key:fileName,
            Body:data,
            ACL:'public-read'
         },
        })
    
        parallelUploads3.on("httpUploadProgress",(progress)=>{
            console.log(progress);
        });
      
        const url=await parallelUploads3.done();
        
        return url.Location;
        

      } catch (e) {
        console.log(e);
      };
 };



const download = async(req,res)=>{
    try {
        const expense = await req.user.getExpenses();

        const userId = req.user.id;
    
        
        const strigifyData = JSON.stringify(expense);
        const fileName = `Expense${userId}/${new Date()}.txt`;
        const fileURL = await uploadToS3(strigifyData,fileName);
    
        console.log(fileURL);
    
        res.status(200).json({fileURL,success:true});
    } catch (error) {
        console.log(error);

        res.status(500).json({fileURL:'',success:false,err:error});
    }

   
    
}


const getDetails =async(req,res)=>{

    try {

        const userId= req.user.id;

        const user=await expense.findAll({where:{
            userId:userId
        }});


    res.send(user);

    } catch (error) {
        
        console.log(error);
        res.send(error);
    }
    

}

const sentDetails =async(req,res)=>{

    const t = await sequelize.transaction();

    try {
        const {amount,description,category,userId} = req.body;

        
            const p= await expense.create({
                amount:amount,
                description:description,
                category:category,
                userId:userId
            },{transaction:t});
    
             await User.update(
                {TotalExpense:+amount},
                {where:{
                    id:userId},
                transaction:t });

      
                await t.commit();
                res.status(200).json(p);

            }

     catch  (error){

        await t.rollback();
        res.status(500).json(error);
    }
}

    

const deleteDetails =async(req,res)=>{
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const {userId} = req.body;

        

    const amount=await expense.destroy({where:{
        id:id
    }},{transaction:t});

    console.log(amount);
     
    await User.update(
        {TotalExpense:-amount},
        {whre:{
            id:userId} });

    await t.commit();
    res.send(amount)
    } catch (error) {
        
        await t.rollback();
        res.send(error);
    }
    

}

module.exports={
    getDetails,
    sentDetails,
    deleteDetails,
    download 

}