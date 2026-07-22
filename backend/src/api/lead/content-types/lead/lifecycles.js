const nodemailer = require('nodemailer');

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
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
