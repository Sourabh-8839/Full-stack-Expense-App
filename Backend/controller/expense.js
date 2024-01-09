const { Upload } = require('@aws-sdk/lib-storage');
const { S3Client } = require('@aws-sdk/client-s3');
const expense = require('../models/Expense');
const User = require('../models/userData');

const sequelize = require('../utils/dataStore');

const S3 = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRETKEY,
  },
});

const uploadToS3 = async (data, fileName) => {
  const Bucket_Name = 'expenselist';

  try {
    const parallelUploads3 = new Upload({
      client: S3,
      params: {
        Bucket: Bucket_Name,
        Key: fileName,
        Body: data,
        ACL: 'public-read',
      },
    });

    parallelUploads3.on('httpUploadProgress', (progress) => {
      console.log(progress);
    });

    const url = await parallelUploads3.done();

    return url.Location;
  } catch (e) {
    console.log(e);
  }
};

const download = async (req, res) => {
  try {
    const expense = await req.user.getExpenses();

    const userId = req.user.id;

    const strigifyData = JSON.stringify(expense);
    const fileName = `Expense${userId}/${new Date()}.txt`;
    const fileURL = await uploadToS3(strigifyData, fileName);

    console.log(fileURL);

    res.status(200).json({ fileURL, success: true });
  } catch (error) {
    console.log(error);

    res.status(500).json({ fileURL: '', success: false, err: error });
  }
};

const getDetails = async (req, res) => {
  try {
    const page = Number(req.query.page);

    const Item_Per_Page = Number(req.params.Item_Per_Page);

    const userId = req.user.id;

    const totalItems = await expense.countDocuments({
      userId: userId,
    });

    // console.log(totalItems);

    const expenses = await expense
      .find({
        userId: userId,
      })
      .skip((page - 1) * Item_Per_Page)
      .limit(Item_Per_Page);

    res.json({
      expenses: expenses,
      hasPreviousPage: page > 1,
      currentPage: page,
      hasNextPage: Item_Per_Page * page < totalItems,
      previousPage: page - 1,
      nextPage: page + 1,
      lastPage: Math.ceil(totalItems / Item_Per_Page),
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const sentDetails = async (req, res) => {
  try {
    const { amount, description, category, userId } = req.body;

    const p = await expense.create({
      amount: amount,
      description: description,
      category: category,
      userId: userId,
    });

    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      { $inc: { TotalExpense: amount } }
    );

    res.status(200).json(p);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const deleteDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const deletevalue = await expense.findOneAndDelete({
      _id: id,
    });

    const amount = deletevalue.amount;

    const userId = deletevalue.userId;

    const updatevalue = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $inc: {
          TotalExpense: -amount,
        },
      }
    );

    updatevalue.save();

    res.status(200).json({ msg: 'Delete Succesdfully' });
  } catch (error) {
    res.status(403).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getDetails,
  sentDetails,
  deleteDetails,
  download,
};
