import mongoose from "mongoose";
import { env } from "../config";
import {
  EmailTemplate,
  EmailTemplateType,
  EMAIL_TEMPLATE_VARIABLES
} from "../models/EmailTemplate";

/**
 * Template definitions matching the existing email-templates.ts structure
 * These will be migrated to the database
 */
const EMAIL_TEMPLATES_DATA = [
  {
    type: EmailTemplateType.Signup,
    subject: "Welcome to {{brandName}}!",
    body: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Welcome to {{brandName}}!</title>
    <style>
      body { background: #f4f6fb; margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #333; }
      .container { max-width: 620px; margin: 28px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 18px rgba(20, 30, 60, 0.08); }
      .header { padding: 22px; text-align: center; border-bottom: 1px solid #eef2f7; }
      .content { padding: 28px; }
      .title { font-size: 20px; font-weight: 600; margin: 0 0 8px; }
      .subtitle { margin: 0 0 18px; color: #556077; font-size: 14px; }
      .otp { display: inline-block; padding: 14px 22px; font-size: 22px; letter-spacing: 4px; border-radius: 8px; background: #0b63ff; color: #ffffff; font-weight: 700; margin: 14px 0; }
      .note { font-size: 13px; color: #7a8598; margin-top: 14px; }
      .footer { padding: 18px; text-align: center; font-size: 12px; color: #9aa3b2; border-top: 1px solid #f0f4fb; }
      a { color: #0b63ff; text-decoration: none; }
      @media (max-width: 420px) {
        .otp { font-size: 20px; padding: 12px 16px; }
        .content { padding: 18px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div style="font-weight:700;color:#0b63ff;font-size:18px">{{brandName}}</div>
      </div>
      <div class="content">
        <h1 class="title">Welcome to {{brandName}}!</h1>
        <p class="subtitle">Use the OTP below to complete your signup.</p>
        <div style="text-align:center;">
          <div class="otp">{{otp}}</div>
        </div>
        <p class="note">This OTP expires in <strong>5 minutes</strong>. Do not share it with anyone. If you didn't request this, please ignore this email or contact our support.</p>
        <p style="margin-top:18px;">Thanks,<br><strong>{{brandName}} Team</strong></p>
      </div>
      <div class="footer">
        {{brandName}} • If you need help, reply to this email or visit our support center.
      </div>
    </div>
  </body>
</html>`,
    isActive: true
  },
  {
    type: EmailTemplateType.ForgotPassword,
    subject: "Password Reset OTP - {{brandName}}",
    body: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Password reset requested</title>
    <style>
      body { background: #f4f6fb; margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #333; }
      .container { max-width: 620px; margin: 28px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 18px rgba(20, 30, 60, 0.08); }
      .header { padding: 22px; text-align: center; border-bottom: 1px solid #eef2f7; }
      .content { padding: 28px; }
      .title { font-size: 20px; font-weight: 600; margin: 0 0 8px; }
      .subtitle { margin: 0 0 18px; color: #556077; font-size: 14px; }
      .otp { display: inline-block; padding: 14px 22px; font-size: 22px; letter-spacing: 4px; border-radius: 8px; background: #0b63ff; color: #ffffff; font-weight: 700; margin: 14px 0; }
      .note { font-size: 13px; color: #7a8598; margin-top: 14px; }
      .footer { padding: 18px; text-align: center; font-size: 12px; color: #9aa3b2; border-top: 1px solid #f0f4fb; }
      @media (max-width: 420px) {
        .otp { font-size: 20px; padding: 12px 16px; }
        .content { padding: 18px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div style="font-weight:700;color:#0b63ff;font-size:18px">{{brandName}}</div>
      </div>
      <div class="content">
        <h1 class="title">Password reset requested</h1>
        <p class="subtitle">Use the OTP below to reset your password.</p>
        <div style="text-align:center;">
          <div class="otp">{{otp}}</div>
        </div>
        <p class="note">This OTP expires in <strong>5 minutes</strong>. Do not share it with anyone. If you didn't request this, please ignore this email or contact our support.</p>
        <p style="margin-top:18px;">Thanks,<br><strong>{{brandName}} Team</strong></p>
      </div>
      <div class="footer">
        {{brandName}} • If you need help, reply to this email or visit our support center.
      </div>
    </div>
  </body>
</html>`,
    isActive: true
  },
  {
    type: EmailTemplateType.ResetPassword,
    subject: "Reset Your {{brandName}} Password",
    body: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Reset your password</title>
    <style>
      body { background: #f4f6fb; margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #333; }
      .container { max-width: 620px; margin: 28px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 18px rgba(20, 30, 60, 0.08); }
      .header { padding: 22px; text-align: center; border-bottom: 1px solid #eef2f7; }
      .content { padding: 28px; }
      .title { font-size: 20px; font-weight: 600; margin: 0 0 8px; }
      .subtitle { margin: 0 0 18px; color: #556077; font-size: 14px; }
      .btn { display: inline-block; padding: 12px 20px; border-radius: 8px; background: #0b63ff; color: #fff; font-weight: 600; text-decoration: none; font-size: 15px; }
      .link { word-break: break-all; font-size: 13px; color: #0b63ff; }
      .note { font-size: 13px; color: #7a8598; margin-top: 14px; }
      .footer { padding: 18px; text-align: center; font-size: 12px; color: #9aa3b2; border-top: 1px solid #f0f4fb; }
      @media (max-width: 420px) {
        .content { padding: 18px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div style="font-weight:700;color:#0b63ff;font-size:18px">{{brandName}}</div>
      </div>
      <div class="content">
        <h1 class="title">Reset your password</h1>
        <p class="subtitle">We received a request to reset your password. Click the button below to proceed.</p>
        <div style="text-align:center; margin: 18px 0;">
          <a class="btn" href="{{resetLink}}" target="_blank" rel="noopener noreferrer">Reset password</a>
        </div>
        <p style="font-size:13px;color:#7a8598">If the button doesn't work, copy and paste this link into your browser:</p>
        <p class="link">{{resetLink}}</p>
        <p class="note">The link is valid for <strong>5 minutes</strong>. If you didn't request a password reset, safely ignore this email or contact support.</p>
        <p style="margin-top:18px;">Thanks,<br><strong>{{brandName}} Team</strong></p>
      </div>
      <div class="footer">
        {{brandName}} • If you need help, reply to this email or visit our support center.
      </div>
    </div>
  </body>
</html>`,
    isActive: true
  },
  {
    type: EmailTemplateType.WelcomeEmail,
    subject: "Welcome to {{brandName}} – Your Matrimony Journey Begins",
    body: `Dear {{userName}},

Thank you for registering with {{brandName}} Matrimony. We are delighted to have you with us.

Here are your login details:
• Username: {{username}}
• Login Link: {{loginLink}}

To help you get started, please follow these steps to complete your profile:

1. Login to your {{brandName}} account using the above details.
2. Upload your ID proof (Aadhar Card / Driving Licence / Passport / or any other valid photo ID) for verification.
3. Upload your photographs – clear face photo and a full-length photo are required.
4. Complete your personal details – education, profession, family background, lifestyle, and preferences.
5. Save & Submit your profile for review.

👉 A verified and complete profile increases your chances of getting better matches.

{{supportContact}}

Best Regards,
Team {{brandName}}
Your Trusted Matchmaking Partner`,
    isActive: true
  },
  {
    type: EmailTemplateType.ProfileReview,
    subject: "Your Profile Submitted for Review - {{brandName}}",
    body: `Dear {{userName}},

Thank you for submitting your profile to {{brandName}}. We've received your details successfully, and they are currently under review.

Current Status: Under Review

Our team will verify your documents and profile information within 24-48 hours.

During the review process, our team will:
• Verify your government ID and submitted documents
• Review your profile photos and personal information
• Ensure compliance with our community guidelines
• Validate all submitted details

What's next?
Once the review is complete, we'll send you an approval email with further instructions. You can then access your profile and start connecting with other members on {{brandName}}.

If there are any issues with your profile, we'll reach out to you with details and next steps.

Best regards,
Team {{brandName}}
Your Trusted Matrimony Partner`,
    isActive: true
  },
  {
    type: EmailTemplateType.ProfileApproved,
    subject: "🎉 Your Profile is Approved! - {{brandName}}",
    body: `Dear {{userName}},

Great news! Your profile has been approved and is now live on {{brandName}}. You're all set to start connecting with other members and explore potential matches.

Your Profile Status: APPROVED
Your profile is now visible to other users on the platform.

Here's what you can do now:
✓ View and browse other member profiles
✓ Send connection requests and show interest
✓ Receive and respond to connection requests
✓ Complete your profile with more details and preferences
✓ Update your photos and information anytime

Go to your dashboard: {{loginLink}}

Need help? If you have any questions about your profile or how to use {{brandName}}, feel free to reach out to our support team.

Best regards,
Team {{brandName}}
Your Trusted Matrimony Partner`,
    isActive: true
  },
  {
    type: EmailTemplateType.ProfileRejected,
    subject: "Action Required – Profile Rejected - {{brandName}}",
    body: `Dear {{userName}},

Your profile submitted on {{brandName}} Matrimony has been reviewed and rejected by the admin team due to incomplete, inaccurate, or non-compliant information.

Reason: {{reason}}

You may update your details and resubmit your profile for review to proceed further on the platform.

For any assistance, please reach out to our support team.

Regards,
{{brandName}} Matrimony Support`,
    isActive: true
  },
  {
    type: EmailTemplateType.ProfileRectification,
    subject: "Profile Review Status - Information Needed - {{brandName}}",
    body: `Dear {{userName}},

We've reviewed your profile submission for {{brandName}}. To proceed, we need some additional information or corrections.

Reason for Review: {{reason}}

What you need to do:
1. Review the information mentioned above
2. Update or correct your profile information
3. Resubmit your profile for review

Note: We're here to help! If you're unsure about any of the feedback, please reach out to our support team for clarification.

Best regards,
Team {{brandName}}
Your Trusted Matrimony Partner`,
    isActive: true
  },
  {
    type: EmailTemplateType.AccountDeactivation,
    subject: "Account Deactivated - {{brandName}}",
    body: `Dear {{userName}},

Your {{brandName}} account has been deactivated as per your request.

Reactivation Period: You can reactivate your account after 24 hours from now.

What this means:
• Your profile is hidden from other members
• You won't receive connection requests or notifications
• Your data is safely stored and will be restored when you reactivate
• You can reactivate anytime after 24 hours

Need to reactivate? Simply log in after 24 hours and click on "Activate Account" from your account settings.

If you didn't request this deactivation or have any concerns, please contact our support team immediately.

Best regards,
Team {{brandName}}
Your Trusted Matrimony Partner`,
    isActive: true
  },
  {
    type: EmailTemplateType.AccountDeletion,
    subject: "Account Deleted - {{brandName}}",
    body: `Dear {{userName}},

We're sorry to see you go. Your {{brandName}} account has been deleted as per your request.

Deletion Confirmed: Your profile has been removed successfully.

What happens next:
• You can create a new account anytime using the same email or phone number

Changed your mind? You're always welcome back! You can create a new account anytime by signing up again with your email or phone number.

We'd love to hear your feedback on how we can improve {{brandName}}. If you have a moment, please let us know why you decided to leave.

Thank you for being part of {{brandName}}. We wish you all the best in your journey.

Team {{brandName}}
Your Trusted Matrimony Partner`,
    isActive: true
  },
  {
    type: EmailTemplateType.AccountActivation,
    subject: "Account Activated - {{brandName}}",
    body: `Dear {{userName}},

Welcome back to {{brandName}}! Your account has been successfully activated.

Activation Confirmed: Your profile is now visible to other members and you can resume your matrimony journey.

What's enabled:
• Your profile is visible to other members
• You can browse and connect with potential matches
• You'll receive connection requests and notifications
• All features are now accessible

You can now log in and continue exploring profiles to find your perfect match!

We're glad to have you back!

Team {{brandName}}
Your Trusted Matrimony Partner`,
    isActive: true
  },
  {
    type: EmailTemplateType.NewConnectionRequest,
    subject: "New connection request from {{requesterName}} on {{brandName}}",
    body: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>New connection request</title>
    <style>
      body { background: #f4f6fb; margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #333; }
      .container { max-width: 620px; margin: 28px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 18px rgba(20, 30, 60, 0.08); }
      .header { padding: 22px; text-align: center; border-bottom: 1px solid #eef2f7; }
      .content { padding: 28px; }
      .title { font-size: 20px; font-weight: 600; margin: 0 0 8px; }
      .subtitle { margin: 0 0 18px; color: #556077; font-size: 14px; }
      .btn { display: inline-block; padding: 12px 20px; border-radius: 8px; background: #0b63ff; color: #fff; font-weight: 600; text-decoration: none; font-size: 15px; }
      .muted { color: #7a8598; font-size: 13px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div style="font-weight:700;color:#0b63ff;font-size:18px">{{brandName}}</div>
      </div>
      <div class="content">
        <h1 class="title">New connection request</h1>
        <p class="subtitle">Hello {{userName}},</p>
        <p>{{requesterName}} ({{requesterProfileName}}) has sent you a connection request on {{brandName}} on {{requestDate}}.</p>
        <p><a class="btn" href="{{profileUrl}}">View profile</a></p>
        <p style="margin-top:12px;"><img src="{{photoUrl}}" alt="Profile photo" style="max-width:120px;border-radius:8px;"/></p>
        <p class="muted">Match score: {{matchScore}}</p>
        <p style="margin-top:18px;"><a class="btn" href="{{acceptUrl}}">Accept</a>&nbsp;&nbsp;<a class="btn" href="{{rejectUrl}}" style="background:#e74c3c">Reject</a></p>
        <p class="muted">If you need help, contact {{supportContact}}</p>
        <p style="margin-top:18px;">Best,<br><strong>{{brandName}} Team</strong></p>
      </div>
      <div style="padding:18px;text-align:center;font-size:12px;color:#9aa3b2;border-top:1px solid #f0f4fb;">{{brandName}} • <a href="{{dashboardLink}}">Dashboard</a></div>
    </div>
  </body>
</html>`,
    isActive: true
  }
];

function isHtml(content: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

/**
 * Helper: wrap plain-text email into safe HTML layout
 * (HTML templates remain untouched)
 */
function wrapPlainTextEmail(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Email</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;color:#333;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;">
      <tr>
        <td align="center" style="padding:20px;">
          <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;">
            <tr>
              <td style="padding:24px;font-size:14px;line-height:1.6;">
                ${escaped}
              </td>
            </tr>
            <tr>
              <td style="padding:16px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee;">
                {{brandName}}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Seed function
 */
async function seedEmailTemplate() {
  try {
    console.log("🔌 Connecting to database...");
    await mongoose.connect(env.MONGO_URI);
    console.log("✅ Database connected successfully.");

    console.log("\n📧 Starting email template migration...\n");

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const templateData of EMAIL_TEMPLATES_DATA) {
      try {
        const availableVariables =
          EMAIL_TEMPLATE_VARIABLES[templateData.type] || [];

        const finalBody = isHtml(templateData.body)
          ? templateData.body
          : wrapPlainTextEmail(templateData.body);

        const existingTemplate = await EmailTemplate.findOne({
          type: templateData.type
        });

        if (existingTemplate) {
          existingTemplate.subject = templateData.subject;
          existingTemplate.body = finalBody;
          existingTemplate.availableVariables = availableVariables;
          existingTemplate.isActive = templateData.isActive;

          await existingTemplate.save();
          updated++;
          console.log(
            `✏️ Updated: ${templateData.type} (Variables: ${availableVariables.join(", ")})`
          );
        } else {
          await EmailTemplate.create({
            ...templateData,
            body: finalBody,
            availableVariables
          });
          created++;
          console.log(
            `✅ Created: ${templateData.type} (Variables: ${availableVariables.join(", ")})`
          );
        }
      } catch (error: any) {
        skipped++;
        console.error(
          `❌ Error processing ${templateData.type}:`,
          error.message
        );
      }
    }

    console.log("\n📊 Migration Summary:");
    console.log(`   Created: ${created} templates`);
    console.log(`   Updated: ${updated} templates`);
    console.log(`   Skipped: ${skipped} templates`);
    console.log(`   Total: ${EMAIL_TEMPLATES_DATA.length} templates processed`);

    console.log("\n✨ Email template seeding completed successfully!");

    await mongoose.disconnect();
    console.log("🔌 Database disconnected.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding email template:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedEmailTemplate();
