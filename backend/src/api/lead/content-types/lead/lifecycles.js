const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await resend.emails.send({
        from: 'Trade 360 <onboarding@resend.dev>',
        to: process.env.LEAD_NOTIFICATION_EMAIL,
        subject: 'New Lead - Trade 360 Website',
        text: `
New lead received:
Name: ${result.fullname}
Mobile: ${result.mobile}
Email: ${result.email}
City: ${result.city}
Interested Service: ${result.interestedService}
Message: ${result.message}
Source Page: ${result.sourcepage}
        `,
      });
      console.log('Lead notification email sent successfully');
    } catch (error) {
      console.error('Error sending lead email:', error);
    }
  },
};
