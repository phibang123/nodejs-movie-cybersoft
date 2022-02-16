const { s3_bucket_name,s3,s3_domain_name } = require("../config");





const deleteImag = async (data) =>
{
  let cutLeght = s3_domain_name.length + 1;
  let urlCut =  data.slice(Number(cutLeght))
  //let urlCut =  data + "/"
  console.log(urlCut)

	const params = {
		Bucket: s3_bucket_name,
		Key: urlCut,
  };

  try {
	  await s3.deleteObject(params).promise()
  } catch (error)
  {
    console.log(error)
		throw error
	}
};


module.exports = deleteImag
