import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.awsBucketRegion,
  credentials: {
    accessKeyId: process.env.awsAccessKeyId,
    secretAccessKey: process.env.awsSecretAccessKey,
  },
});

export { s3 };
