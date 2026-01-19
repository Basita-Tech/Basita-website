import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../../config/awsClient";
import { logger } from "../../../lib";
import { Profile } from "../../../models";
import { AuthenticatedRequest } from "../../../types";
import { Response } from "express";

type PhotoType =
  | "closer"
  | "personal"
  | "family"
  | "other-1"
  | "other-2"
  | "governmentid";

const BUCKET_NAME = process.env.PHOTO_BUCKET_NAME!;
const AWS_CDN_BASE_URL = process.env.AWS_CDN_BASE_URL!;

const getS3KeyFromUrl = (url?: string): string | null => {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    return decodeURIComponent(parsed.pathname.replace(/^\/+/, ""));
  } catch {
    return null;
  }
};

const deleteImageFromS3 = async (key: string) => {
  if (!key) return;

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    })
  );
};

export const updatePhotoController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const authUserId = req.user.id;
    const { key, userId, photoType } = req.body;

    if (!key || !photoType) {
      return res.status(400).json({
        success: false,
        message: "photoType and key are required"
      });
    }

    const ownerUserId = userId || authUserId;
    const now = Date.now();
    const newUrl = `${AWS_CDN_BASE_URL}/${key}`;

    const profile = await Profile.findOne({ userId: ownerUserId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    let updateQuery: any = {};
    let oldImageUrl: string | undefined;

    switch (photoType as PhotoType) {
      case "closer":
        oldImageUrl = profile.photos?.closerPhoto?.url;
        updateQuery = {
          $set: {
            "photos.closerPhoto": { url: newUrl, uploadedAt: now }
          }
        };
        break;

      case "family":
        oldImageUrl = profile.photos?.familyPhoto?.url;
        updateQuery = {
          $set: {
            "photos.familyPhoto": { url: newUrl, uploadedAt: now }
          }
        };
        break;

      case "personal":
        oldImageUrl = profile.photos?.personalPhotos?.[0]?.url;
        updateQuery = {
          $set: {
            "photos.personalPhotos": [{ url: newUrl, uploadedAt: now }]
          }
        };
        break;

      case "other-1":
        oldImageUrl = profile.photos?.otherPhotos?.[0]?.url;
        updateQuery = {
          $set: {
            "photos.otherPhotos.0": {
              url: newUrl,
              title: "Other Photo",
              uploadedAt: now
            }
          }
        };
        break;

      case "other-2":
        oldImageUrl = profile.photos?.otherPhotos?.[1]?.url;
        updateQuery = {
          $set: {
            "photos.otherPhotos.1": {
              url: newUrl,
              title: "Other Photo 2",
              uploadedAt: now
            }
          }
        };
        break;

      case "governmentid":
        oldImageUrl = profile.governmentIdImage?.url;
        updateQuery = {
          $set: {
            governmentIdImage: {
              url: newUrl,
              uploadedAt: now,
              verificationStatus: "pending"
            }
          }
        };
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid photoType"
        });
    }

    const updateResult = await Profile.updateOne(
      { userId: ownerUserId },
      updateQuery
    );

    if (!updateResult.modifiedCount) {
      return res.status(500).json({
        success: false,
        message: "Photo update failed"
      });
    }

    const oldKey = getS3KeyFromUrl(oldImageUrl);

    if (oldKey && oldKey !== key) {
      try {
        await deleteImageFromS3(oldKey);
      } catch (err) {
        logger.warn(
          `S3 delete failed | key=${oldKey} | user=${ownerUserId}`,
          err
        );
      }
    }

    logger.info(`Photo updated | type=${photoType} | user=${ownerUserId}`);

    return res.status(200).json({
      success: true,
      message: `${photoType} photo updated successfully`,
      data: { url: newUrl }
    });
  } catch (error: any) {
    logger.error("Update photo error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update photo",
      error: error.message || "Internal server error"
    });
  }
};
