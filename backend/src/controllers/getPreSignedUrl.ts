import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/awsClient";

export async function getPreSignedUrl(req, res) {
  try {
    const { photoType, userId } = req.query;

    if (!photoType || !userId) {
      return res.status(400).json({
        success: false,
        message: "photoType and userId are required"
      });
    }

    const now = Date.now();

    const key = `${userId}-${photoType}-${now}`;

    const BUCKET_NAME = process.env.PHOTO_BUCKET_NAME!;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 600
    });

    return res.status(200).json({
      success: true,
      data: { url, key }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to generate presigned URL"
    });
  }
}
