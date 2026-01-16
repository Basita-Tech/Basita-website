import { Types } from "mongoose";
import {
  IUserFamily,
  UserFamily,
  IUserEducation,
  UserEducation,
  UserPersonal,
  User,
  IUserExpectations,
  UserExpectations,
  Profile,
  UserProfession,
  UserHealth
} from "../../models";
import { CreateUserPersonalInput } from "../../types";
import { calculateAge } from "../../utils/utils";

const validateUserId = (userId: string) => {
  if (!userId) throw new Error("userId is required");
  if (!Types.ObjectId.isValid(userId)) throw new Error("Invalid userId");
  return new Types.ObjectId(userId);
};

export const createUserPersonalService = async (
  data: CreateUserPersonalInput,
  userId: string
) => {
  const userObjectId = validateUserId(userId);
  const userPersonal = await UserPersonal.create({
    ...data,
    userId: userObjectId
  });
  return { success: true, document: userPersonal };
};

export const getUserPersonalByUserIdService = async (userId: string) => {
  const userObjectId = validateUserId(userId);

  const [user, userPersonal] = await Promise.all([
    User.findById(userObjectId)
      .select("firstName middleName lastName dateOfBirth")
      .lean(),
    UserPersonal.findOne({ userId: userObjectId })
      .select("-userId -createdAt -updatedAt -_id -__v")
      .lean()
  ]);

  return { ...(user || {}), ...(userPersonal || {}) };
};

export const updateUserPersonalService = async (
  userId: string,
  data: Partial<CreateUserPersonalInput>
) => {
  const userObjectId = validateUserId(userId);
  const updated = await UserPersonal.findOneAndUpdate(
    { userId: userObjectId },
    data,
    {
      new: true,
      runValidators: true,
      upsert: false
    }
  ).select("-userId -createdAt -updatedAt -_id -__v");

  if (!updated) throw new Error("Personal details not found for this user");
  return updated;
};

export const getUserFamilyDetailsService = async (userId: string) => {
  const userObjectId = validateUserId(userId);
  const re = await UserFamily.findOne({ userId: userObjectId })
    .select("-_id -__v -userId -createdAt -updatedAt")
    .lean();
  return re;
};

export const addUserFamilyDetailsService = async (data: IUserFamily) => {
  const userId = validateUserId(String(data.userId));
  const existing = await UserFamily.findOne({ userId });
  if (existing) throw new Error("Family details already exist for this user");

  const familyDetails = new UserFamily({ ...data, userId });
  await familyDetails.save();
  return familyDetails;
};

export const updateUserFamilyDetailsService = async (
  userId: string,
  data: Partial<IUserFamily>
) => {
  const userObjectId = validateUserId(userId);
  delete (data as any).userId;

  const updated = await UserFamily.findOneAndUpdate(
    { userId: userObjectId },
    data,
    {
      new: true,
      runValidators: true
    }
  ).select("-_id -__v -userId -createdAt -updatedAt");

  if (!updated) throw new Error("Family details not found for this user");
  return updated;
};

export const getUserEducationDetailsService = async (userId: string) => {
  const userObjectId = validateUserId(userId);
  return UserEducation.findOne({ userId: userObjectId })
    .select("-_id -__v -userId -createdAt -updatedAt")
    .lean();
};

export const addUserEducationDetailsService = async (
  data: Partial<IUserEducation>
) => {
  const userId = validateUserId(String(data.userId));
  const existing = await UserEducation.findOne({ userId });
  if (existing)
    throw new Error("Education details already exist for this user");

  const education = new UserEducation({ ...data, userId });
  await education.save();
  return education;
};

export const updateUserEducationDetailsService = async (
  userId: string,
  data: Partial<IUserEducation>
) => {
  const userObjectId = validateUserId(userId);
  delete (data as any).userId;

  const updated = await UserEducation.findOneAndUpdate(
    { userId: userObjectId },
    data,
    {
      new: true,
      runValidators: true
    }
  ).select("-userId -createdAt -updatedAt -_id -__v");

  if (!updated) throw new Error("Education details not found for this user");
  return updated;
};

export const getUserExpectationDetailsService = async (userId: string) => {
  const userObjectId = validateUserId(userId);
  return UserExpectations.findOne({ userId: userObjectId })
    .select("-_id -__v -userId -createdAt -updatedAt")
    .lean();
};

export const addUserExpectationDetailsService = async (
  data: Partial<IUserExpectations>
) => {
  const userId = validateUserId(String(data.userId));
  const existing = await UserExpectations.findOne({ userId });
  if (existing)
    throw new Error("Expectation details already exist for this user");

  const expectation = new UserExpectations({ ...data, userId });
  await expectation.save();
  return expectation;
};

export const updateUserExpectationDetailsService = async (
  userId: string,
  data: Partial<IUserExpectations>
) => {
  const userObjectId = validateUserId(userId);
  delete (data as any).userId;

  const updated = await UserExpectations.findOneAndUpdate(
    { userId: userObjectId },
    data,
    {
      new: true,
      runValidators: true
    }
  ).select("-_id -__v -userId -createdAt -updatedAt");

  if (!updated) throw new Error("Expectation details not found for this user");
  return updated;
};

export const getUserOnboardingStatusService = async (userId: string) => {
  const userObjectId = validateUserId(userId);

  const user = await User.findById(userObjectId)
    .select("isOnboardingCompleted completedSteps profileReviewStatus")
    .lean();
  return { user };
};

export const updateUserBoardingStatusService = async (
  userId: string,
  isOnboardingCompleted: boolean,
  completedSteps: string[]
) => {
  const userObjectId = validateUserId(userId);

  const updated = await User.findByIdAndUpdate(
    userObjectId,
    { isOnboardingCompleted, completedSteps },
    { new: true, runValidators: true }
  ).select("isOnboardingCompleted completedSteps");

  if (!updated) throw new Error("User not found");
  return updated;
};

export * from "./userSettingService";

const escapeRegex = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export async function searchServiceCommon(
  filters: {
    ageFrom?: number;
    ageTo?: number;
    religion?: string;
    gender?: string;
    sortBy?: "age" | "newest";
  } = {},
  page = 1,
  limit = 6
) {
  const { ageFrom, ageTo, religion, gender, sortBy } = filters;

  const now = new Date();

  const match: Record<string, any> = {
    isActive: true,
    isDeleted: false,
    isVisible: true,
    isProfileApproved: true,
    profileReviewStatus: "approved"
  };

  if (gender) {
    match.gender = String(gender);
  }

  if (typeof ageFrom === "number" || typeof ageTo === "number") {
    const fromAge = typeof ageFrom === "number" ? ageFrom : 0;
    const toAge = typeof ageTo === "number" ? ageTo : 120;

    match.dateOfBirth = {
      $gte: new Date(now.getFullYear() - toAge, now.getMonth(), now.getDate()),
      $lte: new Date(now.getFullYear() - fromAge, now.getMonth(), now.getDate())
    };
  }

  const pipeline: any[] = [{ $match: match }];

  const lookups = [
    { from: UserPersonal.collection.name, as: "personal" },
    { from: UserProfession.collection.name, as: "profession" },
    { from: Profile.collection.name, as: "profile" },
    { from: UserEducation.collection.name, as: "education" },
    { from: UserHealth.collection.name, as: "health" }
  ];

  for (const l of lookups) {
    pipeline.push(
      {
        $lookup: {
          from: l.from,
          localField: "_id",
          foreignField: "userId",
          as: l.as
        }
      },
      { $unwind: { path: `$${l.as}`, preserveNullAndEmptyArrays: true } }
    );
  }

  if (religion) {
    pipeline.push({
      $match: {
        "personal.religion": {
          $regex: new RegExp(escapeRegex(religion), "i")
        }
      }
    });
  }

  pipeline.push({
    $project: {
      firstName: 1,
      lastName: 1,
      dateOfBirth: 1,
      gender: 1,
      createdAt: 1,
      "profession.Occupation": 1,
      "personal.full_address.city": 1,
      photoUrl: { $ifNull: ["$profile.photos.closerPhoto.url", null] }
    }
  });

  pipeline.push({
    $sort: sortBy === "age" ? { dateOfBirth: -1 } : { createdAt: -1 }
  });

  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const skip = (safePage - 1) * safeLimit;

  pipeline.push({
    $facet: {
      results: [{ $skip: skip }, { $limit: safeLimit }],
      totalCount: [{ $count: "count" }]
    }
  });

  const [res] = await User.aggregate(pipeline).exec();
  const results = res?.results ?? [];

  const listings = results.map((r: any) => ({
    firstName: r.firstName,
    lastName: r.lastName,
    age: calculateAge(r.dateOfBirth),
    gender: r.gender,
    profession: r.profession?.Occupation ?? null,
    city: r.personal?.full_address?.city ?? null,
    url: r.photoUrl
  }));

  return { data: listings };
}
