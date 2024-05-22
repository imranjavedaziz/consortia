import S3FileUpload from "react-s3";

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY_SECRET,
};

export const uploadToS3 = (file) => {
  S3FileUpload.uploadFile(file, config)
    .then((data) => console.log())
    .catch((err) => console.error(err));
};
