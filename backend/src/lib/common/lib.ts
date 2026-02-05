export function parseDDMMYYYYToDate(value?: string): Date | undefined {
  if (!value || typeof value !== "string") return undefined;
  const parts = value.split("-");
  if (parts.length !== 3) return undefined;
  const partDay = parts[0] ?? "";
  const partMonth = parts[1] ?? "";
  const partYear = parts[2] ?? "";
  const day = parseInt(partDay, 10);
  const month = parseInt(partMonth, 10);
  const year = parseInt(partYear, 10);
  if (
    Number.isNaN(day) ||
    Number.isNaN(month) ||
    Number.isNaN(year) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  )
    return undefined;
  const iso = `${year.toString().padStart(4, "0")}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return undefined;
  return d;
}

export function buildOnboardingEmail(params: {
  receiverName: string;
  brandName: string;
  onboardingLink: string;
  year: number;
  profiles: Array<{
    fullName: string;
    photo?: string;
    profession?: string;
  }>;
}) {
  const { receiverName, brandName, onboardingLink, year, profiles } = params;

  const profilesHtml = profiles
    .map(
      (p) => `
      <tr>
        <td style="padding:12px 0; border-bottom:1px solid #eee;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <!-- Profile Image -->
              <td width="80" valign="top" style="padding-right:12px;">
                <img src="${p.photo ?? 'https://your-cdn.com/default-avatar.png'}"
                    width="64" height="64"
                    style="border-radius:50%; display:block; object-fit:cover;"
                    alt="${p.fullName} Profile">
              </td>

              <!-- Profile Info -->
              <td valign="top" style="font-family:Arial,Helvetica,sans-serif; color:#333;">
                <p style="margin:0 0 4px 0; font-size:14px; font-weight:bold;">${p.fullName}</p>
                ${p.profession ? `<p style="margin:0 0 8px 0; font-size:12px; color:#555;">${p.profession}</p>` : ''}
                <a href="${onboardingLink}"
                  style="background:#e4c48a; color:#fff; text-decoration:none; padding:8px 14px; border-radius:5px; font-size:12px; display:inline-block;">
                  View Profile
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
    )
    .join("");

  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Complete Your Profile</title>
</head>

<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;color:#333;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;">
<tr>
<td align="center" style="padding:20px;">
<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;">

<tr>
<td style="padding:24px;font-size:14px;line-height:1.6;">
Dear ${receiverName},<br><br>

We’ve found profiles that match your preferences on <strong>${brandName}</strong> 🎯<br><br>

Complete your onboarding to unlock full profile details and start connecting.<br><br>

<strong>Preview of your matches:</strong>
</td>
</tr>

<tr>
<td style="padding:0 24px 24px 24px;">
<table width="100%" cellpadding="0" cellspacing="0">
${profilesHtml}
</table>
</td>
</tr>

<tr>
<td style="padding:0 24px 24px 24px;text-align:center;">
<a href="${onboardingLink}"
 style="background:#d4a052;color:#fff;
 text-decoration:none;padding:14px 24px;
 border-radius:6px;font-size:14px;display:inline-block;">
Complete Your Profile
</a>
</td>
</tr>

<tr>
<td style="padding:16px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee;">
© ${year} ${brandName}. All rights reserved.
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>
`;
}
