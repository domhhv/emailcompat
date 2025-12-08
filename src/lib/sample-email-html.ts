export const sampleEmailHtml = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Your Weekly Digest</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
    <style>
      /* Reset styles */
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
      body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
  
      /* Client-specific resets */
      .ReadMsgBody { width: 100%; }
      .ExternalClass { width: 100%; }
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
  
      /* Button hover state */
      .button-td:hover, .button-a:hover {
        background: #4338CA !important;
        border-color: #4338CA !important;
      }
  
      /* Dark mode styles */
      @media (prefers-color-scheme: dark) {
        .email-bg { background-color: #1a1a1a !important; }
        .body-text { color: #e5e5e5 !important; }
        .card-bg { background-color: #262626 !important; }
      }
  
      /* Mobile styles */
      @media only screen and (max-width: 600px) {
        .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; }
        .stack-column-center { text-align: center !important; }
        .mobile-padding { padding-left: 24px !important; padding-right: 24px !important; }
        .mobile-full-width { width: 100% !important; height: auto !important; }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f5;">
    <!-- Preheader text (hidden but shows in inbox preview) -->
    <div style="display: none; max-height: 0; overflow: hidden;">
      Your weekly summary is here – 3 new features, 2 blog posts, and an exclusive offer inside.
      &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
    </div>
  
    <!-- Email wrapper table -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f5;" class="email-bg">
      <tr>
        <td align="center" style="padding: 40px 0;">
  
          <!-- Main container (600px max) -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%;">
  
            <!-- Header with logo -->
            <tr>
              <td style="padding: 0 24px 24px; text-align: center;">
                <img src="https://placehold.co/150x40/4F46E5/white?text=ACME" alt="Acme Inc" width="150" height="40" style="display: block; margin: 0 auto;">
              </td>
            </tr>
  
            <!-- Hero section -->
            <tr>
              <td style="background-color: #ffffff; border-radius: 12px 12px 0 0; overflow: hidden;" class="card-bg">
                <img src="https://placehold.co/600x250/4F46E5/white?text=Weekly+Digest" alt="Weekly Digest" width="600" style="display: block; width: 100%; max-width: 600px; height: auto;" class="mobile-full-width">
              </td>
            </tr>
  
            <!-- Main content -->
            <tr>
              <td style="background-color: #ffffff; padding: 32px 40px;" class="card-bg mobile-padding">
                <h1 style="margin: 0 0 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 700; color: #18181b; line-height: 1.3;" class="body-text">
                  Your Week in Review
                </h1>
                <p style="margin: 0 0 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; color: #52525b; line-height: 1.6;" class="body-text">
                  Hi Dominik, here's what happened this week at Acme. We shipped some exciting updates and have a special offer just for you.
                </p>
  
                <!-- CTA Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                  <tr>
                    <td class="button-td" style="border-radius: 8px; background: #4F46E5;">
                      <a class="button-a" href="https://example.com/dashboard" style="display: inline-block; padding: 14px 28px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px;">
                        View Dashboard →
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
  
            <!-- Feature cards (2 columns) -->
            <tr>
              <td style="background-color: #ffffff; padding: 0 40px 32px;" class="card-bg mobile-padding">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <!-- Card 1 -->
                    <td width="48%" valign="top" class="stack-column">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="background-color: #f4f4f5; border-radius: 8px; padding: 20px;">
                            <p style="margin: 0 0 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px;">🚀</p>
                            <h3 style="margin: 0 0 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; color: #18181b;">New: Dark Mode</h3>
                            <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #52525b; line-height: 1.5;">
                              Easy on the eyes, day or night. Enable it in settings.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <!-- Gutter -->
                    <td width="4%" class="stack-column">&nbsp;</td>
                    <!-- Card 2 -->
                    <td width="48%" valign="top" class="stack-column">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="background-color: #f4f4f5; border-radius: 8px; padding: 20px;">
                            <p style="margin: 0 0 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px;">📊</p>
                            <h3 style="margin: 0 0 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; color: #18181b;">Analytics v2</h3>
                            <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #52525b; line-height: 1.5;">
                              Redesigned charts with real-time data updates.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
  
            <!-- Divider -->
            <tr>
              <td style="background-color: #ffffff; padding: 0 40px;" class="card-bg mobile-padding">
                <hr style="margin: 0; border: none; border-top: 1px solid #e4e4e7;">
              </td>
            </tr>
  
            <!-- Secondary content -->
            <tr>
              <td style="background-color: #ffffff; padding: 32px 40px; border-radius: 0 0 12px 12px;" class="card-bg mobile-padding">
                <h2 style="margin: 0 0 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 600; color: #18181b;" class="body-text">
                  From the Blog
                </h2>
                
                <!-- Blog post item -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                      <a href="https://example.com/blog/1" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 500; color: #4F46E5; text-decoration: none;">
                        How We Reduced Load Times by 60%
                      </a>
                      <p style="margin: 4px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #71717a;">
                        A deep dive into our performance optimizations.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <a href="https://example.com/blog/2" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 500; color: #4F46E5; text-decoration: none;">
                        Building Accessible Email Templates
                      </a>
                      <p style="margin: 4px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #71717a;">
                        Best practices for inclusive email design.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
  
            <!-- Footer -->
            <tr>
              <td style="padding: 32px 24px; text-align: center;">
                <!-- Social icons -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto 16px;">
                  <tr>
                    <td style="padding: 0 8px;">
                      <a href="https://twitter.com/example">
                        <img src="https://placehold.co/32x32/71717a/ffffff?text=X" alt="Twitter" width="32" height="32" style="display: block; border-radius: 4px;">
                      </a>
                    </td>
                    <td style="padding: 0 8px;">
                      <a href="https://linkedin.com/company/example">
                        <img src="https://placehold.co/32x32/71717a/ffffff?text=in" alt="LinkedIn" width="32" height="32" style="display: block; border-radius: 4px;">
                      </a>
                    </td>
                    <td style="padding: 0 8px;">
                      <a href="https://github.com/example">
                        <img src="https://placehold.co/32x32/71717a/ffffff?text=GH" alt="GitHub" width="32" height="32" style="display: block; border-radius: 4px;">
                      </a>
                    </td>
                  </tr>
                </table>
                
                <p style="margin: 0 0 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #71717a;">
                  Acme Inc · 123 Main Street · San Francisco, CA 94102
                </p>
                <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #71717a;">
                  <a href="https://example.com/preferences" style="color: #71717a; text-decoration: underline;">Email preferences</a>
                  &nbsp;·&nbsp;
                  <a href="https://example.com/unsubscribe" style="color: #71717a; text-decoration: underline;">Unsubscribe</a>
                </p>
              </td>
            </tr>
  
          </table>
          <!-- End main container -->
  
        </td>
      </tr>
    </table>
  </body>
</html>`;
