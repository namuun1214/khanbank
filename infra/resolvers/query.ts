import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  signatureVersion: "v4",
  // accessKeyId, secretAccessKey ogno
});

const s3 = new AWS.S3();

const HelloWorld = async (_: any) => {
  console.log("Hello World");
  return "Hello World";
};

const GetPresignedUrl = async (_: any, { key }: any) => {
  const bucketName = "textfromjvkandanand";

  const signedUrlExpireSeconds = 60 * 5; // default

  const url = s3.getSignedUrl("putObject", {
    Bucket: bucketName,
    Key: key,
    Expires: signedUrlExpireSeconds,
    ContentType: "binary/octet-stream",
  });

  return url;
};

export { HelloWorld, GetPresignedUrl };
