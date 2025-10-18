import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid initialized successfully');
} else {
  console.warn('⚠️ SENDGRID_API_KEY not found. Email functionality will be limited.');
}

// Generate 6-digit verification code
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email
export const sendVerificationEmail = async (email, code) => {
  try {
    console.log('📧 Preparing to send verification email to:', email);
    console.log('🔐 Verification code:', code);

    // Check if SendGrid is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('⚠️ SendGrid not configured. Email not sent.');
      console.log('🔐 VERIFICATION CODE (for testing):', code);
      return false;
    }

    if (!process.env.SENDGRID_FROM_EMAIL) {
      console.error('❌ SENDGRID_FROM_EMAIL not configured');
      console.log('🔐 VERIFICATION CODE (for testing):', code);
      return false;
    }

    const msg = {
      to: email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: 'CruzeIt Car Rental'
      },
      subject: 'Email Verification Code - CruzeIt',
      text: `
        CruzeIt - Email Verification
        
        Welcome to CruzeIt Car Rental!
        
        Your verification code is: ${code}
        
        This code will expire in 15 minutes.
        
        If you didn't request this verification code, please ignore this email.
        
        © ${new Date().getFullYear()} CruzeIt. All rights reserved.
      `,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6; 
                color: #333; 
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .email-wrapper {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
              }
              .container { 
                max-width: 600px; 
                margin: 20px auto; 
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              }
              .header { 
                background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
                color: white; 
                padding: 40px 30px; 
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 32px;
                font-weight: 600;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
              }
              .content { 
                background: #ffffff; 
                padding: 40px 30px;
              }
              .content h2 {
                color: #1f2937;
                margin-top: 0;
                font-size: 24px;
              }
              .content p {
                color: #4b5563;
                font-size: 16px;
                line-height: 1.8;
                margin: 15px 0;
              }
              .code-container {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                margin: 30px 0;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
              }
              .code-label {
                color: #ffffff;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 15px;
              }
              .code-box { 
                background: #ffffff; 
                padding: 20px; 
                text-align: center; 
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .code { 
                font-size: 42px; 
                font-weight: bold; 
                letter-spacing: 10px; 
                color: #10b981;
                font-family: 'Courier New', monospace;
                display: inline-block;
              }
              .expiry-notice {
                background-color: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px 20px;
                margin: 25px 0;
                border-radius: 4px;
              }
              .expiry-notice p {
                margin: 5px 0;
                color: #92400e;
                font-size: 14px;
              }
              .expiry-notice strong {
                color: #92400e;
              }
              .security-notice {
                background-color: #f9fafb;
                border-left: 4px solid #6b7280;
                padding: 15px 20px;
                margin: 25px 0;
                border-radius: 4px;
              }
              .security-notice p {
                margin: 5px 0;
                color: #4b5563;
                font-size: 14px;
              }
              .footer { 
                background: #f9fafb;
                text-align: center; 
                padding: 25px 20px;
                color: #6b7280; 
                font-size: 13px;
                border-top: 1px solid #e5e7eb;
              }
              .footer p {
                margin: 5px 0;
              }
              .divider {
                height: 1px;
                background-color: #e5e7eb;
                margin: 25px 0;
              }
              @media only screen and (max-width: 600px) {
                .container {
                  margin: 10px;
                }
                .content {
                  padding: 30px 20px;
                }
                .code {
                  font-size: 32px;
                  letter-spacing: 5px;
                }
              }
            </style>
          </head>
          <body>
            <div class="email-wrapper">
              <div class="container">
                <div class="header">
                  <h1>Email Verification</h1>
                </div>
                <div class="content">
                  <h2>Welcome to CruzeIt!</h2>
                  <p>Thank you for signing up for CruzeIt Car Rental. We're excited to have you on board!</p>
                  
                  <p>Please use the verification code below to complete your registration:</p>
                  
                  <div class="code-container">
                    <div class="code-label">Your Verification Code</div>
                    <div class="code-box">
                      <div class="code">${code}</div>
                    </div>
                  </div>
                  
                  <div class="expiry-notice">
                    <p><strong>⏰ Important:</strong> This verification code will expire in <strong>15 minutes</strong>.</p>
                    <p>Please complete your verification soon!</p>
                  </div>
                  
                  <div class="divider"></div>
                  
                  <div class="security-notice">
                    <p><strong>🔒 Security Notice:</strong></p>
                    <p>If you didn't create an account with CruzIt, please ignore this email. Someone may have entered your email address by mistake.</p>
                  </div>
                  
                  <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                    Need help? Contact our support team at <a href="mailto:support@cruzit.com" style="color: #10b981; text-decoration: none;">support@cruzeit.com</a>
                  </p>
                </div>
                <div class="footer">
                  <p>This is an automated message, please do not reply to this email.</p>
                  <p>© ${new Date().getFullYear()} CruzeIt Car Rental. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send email via SendGrid
    const response = await sgMail.send(msg);
    
    console.log('✅ Verification email sent successfully via SendGrid');
    console.log('📧 Email sent to:', email);
    console.log('📊 Response status:', response[0].statusCode);
    
    return true;
  } catch (error) {
    console.error('❌ SendGrid email error:', error);
    
    // Log detailed error information
    if (error.response) {
      console.error('SendGrid Error Details:', error.response.body);
    }
    
    // Don't throw error - let registration continue
    console.log('⚠️ Email failed but continuing with registration');
    console.log('🔐 VERIFICATION CODE (for testing):', code);
    
    return false;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    console.log('📧 Sending password reset email to:', email);
    
    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
      console.warn('⚠️ SendGrid not configured. Email not sent.');
      return false;
    }

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const msg = {
      to: email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: 'CruzIt Car Rental'
      },
      subject: 'Password Reset Request - CruzIt',
      text: `
        CruzIt - Password Reset Request
        
        You requested to reset your password for your CruzIt account.
        
        Click the link below or copy and paste it into your browser to reset your password:
        ${resetUrl}
        
        This link will expire in 1 hour.
        
        If you didn't request a password reset, please ignore this email and your password will remain unchanged.
        
        © ${new Date().getFullYear()} CruzIt. All rights reserved.
      `,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .email-wrapper {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              }
              .header {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 32px;
                font-weight: 600;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
              }
              .content {
                padding: 40px 30px;
              }
              .content p {
                color: #4b5563;
                font-size: 16px;
                line-height: 1.8;
                margin: 15px 0;
              }
              .button-container {
                text-align: center;
                margin: 35px 0;
              }
              .reset-button {
                display: inline-block;
                padding: 16px 40px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                font-size: 16px;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
              }
              .link-container {
                background-color: #f9fafb;
                padding: 15px;
                border-radius: 6px;
                margin: 20px 0;
                word-break: break-all;
              }
              .link-text {
                font-size: 13px;
                color: #6b7280;
                margin-bottom: 8px;
              }
              .link-url {
                color: #10b981;
                font-size: 14px;
              }
              .warning-notice {
                background-color: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px 20px;
                margin: 25px 0;
                border-radius: 4px;
              }
              .warning-notice p {
                margin: 5px 0;
                color: #92400e;
                font-size: 14px;
              }
              .footer {
                background: #f9fafb;
                text-align: center;
                padding: 25px 20px;
                color: #6b7280;
                font-size: 13px;
                border-top: 1px solid #e5e7eb;
              }
              .footer p {
                margin: 5px 0;
              }
            </style>
          </head>
          <body>
            <div class="email-wrapper">
              <div class="container">
                <div class="header">
                  <h1>Password Reset</h1>
                </div>
                <div class="content">
                  <p>You requested to reset your password for your CruzIt account.</p>
                  <p>Click the button below to reset your password:</p>
                  
                  <div class="button-container">
                    <a href="${resetUrl}" class="reset-button">Reset Your Password</a>
                  </div>
                  
                  <div class="link-container">
                    <div class="link-text">Or copy and paste this link into your browser:</div>
                    <div class="link-url">${resetUrl}</div>
                  </div>
                  
                  <div class="warning-notice">
                    <p><strong>Important:</strong> This password reset link will expire in <strong>1 hour</strong>.</p>
                  </div>
                  
                  <p style="color: #6b7280; font-size: 14px;">
                    If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                  </p>
                </div>
                <div class="footer">
                  <p>This is an automated message, please do not reply to this email.</p>
                  <p>© ${new Date().getFullYear()} CruzIt Car Rental. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const response = await sgMail.send(msg);
    console.log('✅ Password reset email sent successfully via SendGrid');
    
    return true;
  } catch (error) {
    console.error('❌ SendGrid password reset email error:', error);
    
    if (error.response) {
      console.error('SendGrid Error Body:', error.response.body);
    }
    
    return false;
  }
};

// Send welcome email (optional - after verification)
export const sendWelcomeEmail = async (email, fullName) => {
  try {
    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
      console.warn('⚠️ SendGrid not configured. Welcome email not sent.');
      return false;
    }

    const msg = {
      to: email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: 'CruzIt Car Rental'
      },
      subject: 'Welcome to CruzeIt!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              }
              .header {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
              }
              .content {
                padding: 40px 30px;
              }
              .button {
                display: inline-block;
                padding: 14px 32px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white !important;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                margin: 20px 0;
              }
              .footer {
                background: #f9fafb;
                text-align: center;
                padding: 20px;
                color: #6b7280;
                font-size: 13px;
                border-top: 1px solid #e5e7eb;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to CruzeIt!</h1>
              </div>
              <div class="content">
                <h2>Hi ${fullName}! 👋</h2>
                <p>Welcome to CruzeIt Car Rental! Your email has been successfully verified.</p>
                <p>You're now ready to start exploring our fleet of vehicles and book your first ride!</p>
                <div style="text-align: center;">
                  <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Go to Dashboard</a>
                </div>
                <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                  If you have any questions, feel free to reach out to our support team.
                </p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} CruzIt Car Rental. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await sgMail.send(msg);
    console.log('✅ Welcome email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Welcome email error:', error);
    // Don't throw error for welcome email - it's not critical
    return false;
  }
};

