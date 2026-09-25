import nodemailer from 'nodemailer';

export interface EmailDispatchResult {
  sent: boolean;
  method: 'smtp' | 'gmail_web_compose';
  recipient: string;
  subject: string;
  error?: string;
  gmailComposeUrl: string;
}

// Runtime credentials storage (permanently configured for automated dispatch)
let runtimeAppPassword = process.env.GMAIL_APP_PASSWORD || 'uwruhfqdiqymvuxp';
let runtimeGmailUser = process.env.GMAIL_USER || 'moyemoye.00143@gmail.com';

export function setGmailCredentials(user: string, appPassword: string) {
  runtimeGmailUser = user || 'moyemoye.00143@gmail.com';
  runtimeAppPassword = appPassword;
}

export function getGmailCredentials() {
  return {
    user: runtimeGmailUser,
    hasPassword: Boolean(runtimeAppPassword),
  };
}

/**
 * Generates direct Gmail Web Compose URL.
 * When clicked, opens Gmail in any browser with recipient, optional CC, subject, and pre-filled body.
 */
export function generateGmailWebComposeUrl(
  to: string,
  subject: string,
  body: string,
  cc?: string
): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to,
    su: subject,
    body,
  });
  if (cc) {
    params.set('cc', cc);
  }
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/**
 * Creates Nodemailer Gmail SMTP transporter
 */
function getTransporter() {
  const user = runtimeGmailUser || process.env.GMAIL_USER || 'moyemoye.00143@gmail.com';
  const pass = runtimeAppPassword || process.env.GMAIL_APP_PASSWORD;

  if (!pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass: pass.replace(/\s+/g, ''), // Strip spaces in case 16-char app password has spaces
    },
  });
}

/**
 * Builds HTML template for Codeyoung emails
 */
export function buildEmailHtml(options: {
  recipientType: 'parent' | 'mentor';
  recipientName: string;
  course: string;
  grade: string;
  scheduledTime: string;
  timeZoneLabel: string;
  liveClassLink: string;
  otherPartyName: string;
  otherPartyEmail: string;
  notes?: string;
}): string {
  const isParent = options.recipientType === 'parent';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #FFFDF7; color: #0F172A; }
    .container { max-width: 600px; margin: 24px auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: #FFB800; padding: 24px 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; color: #0F172A; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 4px 0 0 0; font-size: 13px; color: #475569; font-weight: 600; }
    .content { padding: 32px; }
    .badge { display: inline-block; background: #FEF3C7; color: #92400E; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
    .title { font-size: 20px; font-weight: 800; margin: 0 0 12px 0; color: #0F172A; }
    .card { background: #FFFDF7; border: 1px solid #FDE68A; border-radius: 16px; padding: 20px; margin: 20px 0; }
    .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
    .row:last-child { margin-bottom: 0; }
    .label { color: #64748B; font-weight: 500; }
    .value { font-weight: 700; color: #0F172A; text-align: right; }
    .btn-container { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background: #FFB800; color: #0F172A; text-decoration: none; padding: 16px 36px; border-radius: 9999px; font-weight: 800; font-size: 15px; box-shadow: 0 4px 12px rgba(255, 184, 0, 0.4); }
    .instructions { background: #F8FAFC; border-radius: 12px; padding: 16px; font-size: 12px; color: #475569; line-height: 1.6; margin-top: 24px; }
    .footer { text-align: center; padding: 20px; font-size: 11px; color: #94A3B8; border-top: 1px solid #F1F5F9; background: #FAFAFA; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Codeyoung</h1>
      <p>1:1 Live Online STEM Learning</p>
    </div>
    <div class="content">
      <div class="badge">${isParent ? 'Parent Confirmation' : 'Mentor Class Assignment'}</div>
      <h2 class="title">
        ${isParent ? `Hello ${options.recipientName}, your trial class is confirmed!` : `Hi ${options.recipientName}, you have a new demo class scheduled!`}
      </h2>
      <p style="font-size: 14px; color: #475569; line-height: 1.5;">
        ${
          isParent
            ? `We are delighted to confirm the 1:1 live trial session for ${options.grade}. Your certified mentor is ready to guide your child through an engaging, personalized hands-on session.`
            : `You have been allocated a new 1:1 trial session. Please review the student details and be ready in the classroom 5 minutes prior to start time.`
        }
      </p>

      <div class="card">
        <div class="row">
          <span class="label">Course Track:</span>
          <span class="value">${options.course}</span>
        </div>
        <div class="row">
          <span class="label">Student Grade:</span>
          <span class="value">${options.grade}</span>
        </div>
        <div class="row">
          <span class="label">${isParent ? 'Your Local Time:' : 'Scheduled Time (IST):'}</span>
          <span class="value" style="color: #B45309;">${options.scheduledTime} (${options.timeZoneLabel})</span>
        </div>
        <div class="row">
          <span class="label">${isParent ? 'Assigned Mentor:' : 'Parent / Client:'}</span>
          <span class="value">${options.otherPartyName}</span>
        </div>
        <div class="row">
          <span class="label">${isParent ? 'Mentor Contact:' : 'Client Email:'}</span>
          <span class="value">${options.otherPartyEmail}</span>
        </div>
        ${
          options.notes
            ? `<div class="row" style="margin-top: 8px; border-top: 1px dashed #E2E8F0; padding-top: 8px;">
                 <span class="label">Quota Status:</span>
                 <span class="value" style="color: #047857;">${options.notes}</span>
               </div>`
            : ''
        }
      </div>

      <div class="btn-container">
        <a href="${options.liveClassLink}" class="btn" target="_blank">
          ${isParent ? '🚀 JOIN LIVE DEMO CLASSROOM' : '👨‍🏫 ENTER DEMO CLASSROOM (MENTOR)'}
        </a>
      </div>

      <p style="text-align: center; font-size: 12px; color: #64748B;">
        Classroom Link: <br />
        <a href="${options.liveClassLink}" style="color: #B45309; word-break: break-all;">${options.liveClassLink}</a>
      </p>

      <div class="instructions">
        <strong>Session Checklist:</strong>
        <ul style="margin: 6px 0 0 0; padding-left: 20px;">
          <li>Please join on a Laptop or Desktop running Google Chrome.</li>
          <li>Ensure stable internet, camera, and microphone permissions.</li>
          <li>Join 5 minutes before scheduled start time.</li>
        </ul>
      </div>
    </div>
    <div class="footer">
      Codeyoung • Smart Owl Education Pvt Ltd • 24x7 Support: support@codeyoung.com
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends real email via Gmail SMTP (if credentials available)
 * or provides fallback Gmail Web Compose URL.
 */
export async function dispatchEmail(options: {
  to: string;
  subject: string;
  body: string;
  html: string;
}): Promise<EmailDispatchResult> {
  const gmailComposeUrl = generateGmailWebComposeUrl(options.to, options.subject, options.body);
  const transporter = getTransporter();

  if (!transporter) {
    return {
      sent: false,
      method: 'gmail_web_compose',
      recipient: options.to,
      subject: options.subject,
      error: 'Gmail App Password not yet configured. Use 1-click Gmail Web compose.',
      gmailComposeUrl,
    };
  }

  try {
    const fromUser = runtimeGmailUser || process.env.GMAIL_USER || 'moyemoye.00143@gmail.com';
    await transporter.sendMail({
      from: `"Codeyoung Live Learning" <${fromUser}>`,
      to: options.to,
      subject: options.subject,
      text: options.body,
      html: options.html,
    });

    return {
      sent: true,
      method: 'smtp',
      recipient: options.to,
      subject: options.subject,
      gmailComposeUrl,
    };
  } catch (error: any) {
    console.error(`[Mailer] Error sending to ${options.to}:`, error.message);
    return {
      sent: false,
      method: 'gmail_web_compose',
      recipient: options.to,
      subject: options.subject,
      error: error.message || 'SMTP authentication failed',
      gmailComposeUrl,
    };
  }
}
