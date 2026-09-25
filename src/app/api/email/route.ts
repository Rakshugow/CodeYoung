import { NextRequest, NextResponse } from 'next/server';
import {
  setGmailCredentials,
  getGmailCredentials,
  dispatchEmail,
  buildEmailHtml,
} from '@/lib/mailer';

export async function GET() {
  const info = getGmailCredentials();
  return NextResponse.json({
    success: true,
    user: info.user,
    hasPassword: info.hasPassword,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, appPassword, user, testRecipient } = body;

    if (action === 'save_credentials') {
      const targetUser = user || 'moyemoye.00143@gmail.com';
      const targetPass = appPassword || '';
      setGmailCredentials(targetUser, targetPass);

      // Persist to .env.local
      try {
        const fs = await import('fs');
        const path = await import('path');
        const envPath = path.join(process.cwd(), '.env.local');
        const envContent = `# Gmail SMTP Configuration for Codeyoung Live Trial Class Dispatch
GMAIL_USER=${targetUser}
GMAIL_APP_PASSWORD=${targetPass}
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;
        fs.writeFileSync(envPath, envContent, 'utf-8');
      } catch (err) {
        console.error('Failed to write .env.local:', err);
      }

      return NextResponse.json({
        success: true,
        message: 'Gmail credentials updated successfully and saved to .env.local.',
        hasPassword: Boolean(targetPass),
      });
    }

    if (action === 'send_test') {
      const target = testRecipient || user || 'moyemoye.00143@gmail.com';
      const testResult = await dispatchEmail({
        to: target,
        subject: '🧪 Codeyoung Live Trial Class: Test Email from Antigravity',
        body: `Hello!

This is a test notification from the Codeyoung Trial Class Appointment Booking System.

If you received this email, your Gmail SMTP delivery is active and working perfectly!

All 10 mentors are configured to receive assignment links at: moyemoye.00143@gmail.com
Live classroom link testing: http://localhost:3000/classroom/demo-test-123`,
        html: buildEmailHtml({
          recipientType: 'mentor',
          recipientName: 'Lead Mentor',
          course: 'Coding (Ages 5-16)',
          grade: 'Grade 5',
          scheduledTime: 'Today at 7:30 PM IST',
          timeZoneLabel: 'IST (Asia/Kolkata)',
          liveClassLink: 'http://localhost:3000/classroom/demo-test-123',
          otherPartyName: 'Sample Parent',
          otherPartyEmail: 'client@example.com',
          notes: 'Test dispatch from Codeyoung booking system',
        }),
      });

      return NextResponse.json({
        success: testResult.sent,
        method: testResult.method,
        error: testResult.error,
        gmailComposeUrl: testResult.gmailComposeUrl,
      });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed processing email request' },
      { status: 500 }
    );
  }
}
