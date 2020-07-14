var AWS = require('aws-sdk');

exports.handler = async (event, context) => {

	const BUCKET_NAME = event.queryStringParameters.bucket;
	const REGION = event.queryStringParameters.region;
	// const BUCKET_NAME = event.bucket;
	// const REGION = event.region;
	const URL = 'https://s3-' + REGION + '.amazonaws.com/' + BUCKET_NAME;
	let responseImages = [];
	AWS.config.update({
		region: REGION
	});
	var s3 = new AWS.S3({
		apiVersion: '2006-03-01'
	});
	var params = {
		Bucket: BUCKET_NAME
	}
	var putObjectPromise = await s3.listObjectsV2(params).promise();
	var responseReceived = await putObjectPromise.Contents.slice(1);
	for (let i = 0; i < responseReceived.length; i++) {
		responseImages.push({
			src: `${URL}/${responseReceived[i].Key}`,
		})
	}
	const response = {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*"
		},
		body: JSON.stringify(responseImages)
	}
	return response

};