const express = require("express");
const imageServerRoute = express.Router();
const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var bodyParser = require("body-parser");
dotenv.config();

imageServerRoute.use(bodyParser.urlencoded({ extended: false }));
imageServerRoute.use(bodyParser.json());

//S3 Config
const bucketName = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_S3_REGION;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

imageServerRoute.post(
  "/uploadImage",
  upload.single("file"),
  async (req, res) => {
    try {
      if (req.file == null) {
        return res.status(400).json({ message: "Choose the file" });
      }

      var file = req.file;
      const uploadImage = async (file) => {
        const fileStream = fs.createReadStream(file.path);

        const params = {
          Bucket: bucketName,
          Key: file.originalname,
          Body: fileStream,
        };
        const respons = await s3.upload(params).promise();
        //console.log(respons);
        res.status(200).send(respons);
      };
      uploadImage(file);
    } catch (ex) {
      //console.log(ex);
      return res.status(500).send(ex.message);
    }
  }
);

module.exports = imageServerRoute;
