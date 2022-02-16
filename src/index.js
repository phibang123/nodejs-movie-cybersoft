const express = require("express");
const rootRouter = require("./routes");
const { reponseInterceptor } = require("./middlewares/interceptors");

const config = require("./config");

const multer = require("multer");
const aws = require("aws-sdk");





const app = express(); 
app.use(express.json());
app.use(reponseInterceptor);


// setup multer middleware, xử lý file upload tuy nhiên không lưu vào server lưu trên amason
const storage = multer.memoryStorage();
const upload = multer({ storage });

// setup aws s3
const s3 = new aws.S3({
  accessKeyId: config.s3_access_key,
  secretAccessKey: config.s3_secret_key,
});

app.get("/ping", (req, res) => {
  res.status(200).json(200, "OK");
});

app.post("/upload", upload.single("file"), (req, res) =>
{
  //console.log(req.file);
  
  // if (req.file.size >= 3000000)
  // {
  //   return res.status(400).json(400, "Ảnh phải nhỏ hơn 1mb");
  // }
  let cutLeght = config.s3_domain_name.length

  const { folder } = req.body;
  const { buffer, originalname, mimetype } = req.file;
  
  

  const dst = `${tenPhim}/${Date.now()}_${originalname}`;

  const params = {
    Bucket: config.s3_bucket_name,
    Key: dst,
    Body: buffer,
    ContentType: mimetype,
  };
  
  s3.putObject(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const url = `${config.s3_domain_name}/${dst}`;
      res.status(200).json(200, url);
    }
  });

 
  console.log(req.body.alo)
});

app.use("/api", rootRouter);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
