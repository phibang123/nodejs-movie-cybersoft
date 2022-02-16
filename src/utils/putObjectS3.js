const { s3_bucket_name,s3,s3_domain_name } = require("../config");





const putImag = async (data, tenPhim) => {
	// setup aws s3
	const { buffer, originalname, mimetype } = data;
	

	if (req.file.size >= 3000000)
	{
	  return res.status(400).json(400, "Ảnh phải nhỏ hơn 3mb");
	}
 

  
  const dst = `${tenPhim}/${Date.now()}_${originalname}`;
  


	const params = {
		Bucket: s3_bucket_name,
		Key: dst,
		Body: buffer,
		ContentType: mimetype,
  };

  try {
		// await s3.putObject(params, (err, data) => {
		// 	if (err)
		// 	{
		// 		console.log (err,"123")
		// 		return res.status(400).json(400, err);
		// 	} else
		// 	{
			
		// 	}
		// });
	  await s3.putObject(params).promise()
		const url = `${ s3_domain_name }/${ dst }`;
		console.log(url)
		
		return url;
	} catch (error) {
		throw error
	}
};


module.exports = putImag
