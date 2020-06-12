const aws = require("aws-sdk");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const debug = require("debug")("index.js");

const uploadFile = async ({ fileName, filePath, fileType }) => {
  return new Promise((resolve, reject) => {
    aws.config.update({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      region: "ap-southeast-2",
    });

    const s3 = new aws.S3();

    const stream = fs.createReadStream(filePath);
    stream.on("error", (error) => {
      debug("stream: ", error);
      reject(error);
    });

    const extension = fileType.split("/")[1];

    s3.upload(
      {
        ACL: "public-read",
        Bucket: "agilo-assets-bucket",
        Body: stream,
        Key: `${uuidv4()}.${extension}`,
        ContentType: fileType,
      },
      (error, data) => {
        if (error) {
          debug(`s3: `, error);
          reject(error);
        } else if (data) {
          resolve({ key: data.Key, url: data.Location, bucket: data.Bucket });
        }
      }
    );
  });
};

module.exports = uploadFile;
