

const multer = require("multer");
const aws = require("aws-sdk");
require("dotenv").config();


const storage = multer.memoryStorage();
const upload = multer({ storage });

// setup aws s3
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESSS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
});



module.exports = {
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_ROOT_USER,
  db_password: process.env.DB_ROOT_PASSWORD,
  db_dialect: process.env.DB_DIALECT,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,

  secrect_bcrypt: process.env.SECRECT_BCRYPT,
  secret_key: process.env.SECRET_KEY,


  s3_bucket_name: process.env.S3_BUCKET_NAME,
  s3_domain_name: process.env.S3_DOMAIN_NAME,
  s3_access_key: process.env.S3_ACCESSS_KEY,
  s3_secret_key: process.env.S3_SECRET_KEY,

  s3,
  upload
};
