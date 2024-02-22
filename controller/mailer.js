const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'prajapathideepak4980@gmail.com',
    pass: 'lydd rblq fskg voxe'
  }
});

const newregistration= async (email,Name,password)=>{
    const mailOptions = {
        from: 'Smart Policy<prajapathideepak4980@gmail.com>',
        to: email,
        subject: `Welcome to Smart Pvt Limited, ${Name}!`,
        html: `
        <html>
        <head>
            <style>
                p {
                    margin: 0px;
                    margin-bottom:10px;
                }
            </style>
        </head>
        <body>
            <h3>Dear ${Name},</h3>
            <p>Welcome to the Smart Pvt Limited family! We're thrilled to have you join us and excited for the incredible things you can achieve with your new account.</p>
        
            <p>Your username is: ${email}</p>
            and Password is : ${password}</p>
        
            <p>To get started, simply head over to [Login Page Link] and enter your username to set up your secure password. We recommend choosing a strong and unique password for optimal security.</p>
        
            <p>Once you're logged in, you'll have access to [list key features and benefits of their account]. Whether you're looking to [mention specific use cases], or simply explore the possibilities, we're confident you'll find [Your Company Name] a valuable resource.</p>
        
            <p>If you have any questions or need assistance, please don't hesitate to reach out to our friendly customer support team at [Support Email Address] or [Support Phone Number]. We're always happy to help!</p>
        
            <p>Welcome aboard, and again, thank you for choosing Smart Pvt Limited!</p>
        
            <p>Best regards,</p>
        
            <p>The Data Privacy Team</p><br>
            <p>Smart Policy</p>
        </body>
        </html>
        
        `
      };

      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
}

const newClaims= async (Name,email,Amount,ClaimType)=>{
  const mailOptions = {
    from: 'Smart Policy<prajapathideepak4980@gmail.com>',
    to: email,
    subject: `Welcome to Smart Pvt Limited, ${Name}!`,
    html : `
    <html>
<head>
    <style>
        p {
            margin: 0px;
            margin-bottom:10px;
        }
    </style>
</head>
<body>
    <h3>Dear ${Name},</h3>
    <p>We hope this message finds you well. This is to inform you that we have received a new claim request, and its current status is <strong>pending</strong>.</p>

    <p>Claim Details:</p>
    <ul>
        <li><strong>Claimant Type:</strong> ${ClaimType}</li>
        <li><strong>Claim Amount:</strong> ${Amount}</li>
    </ul>

    <p>To view and manage this claim, please log in to your account at offical Website. You can check the status and take any necessary actions related to the claim from your dashboard.</p>

    <p>If you have any questions or need assistance regarding this claim or any other matter, please don't hesitate to contact our customer support team at support@smart.org or 4868468546854. We're here to assist you!</p>

    <p>Thank you for choosing Smart Pvt Limited. We appreciate your trust in us.</p>

    <p>Best regards,</p>

    <p>The Claims Management Team</p><br>
    <p>Smart Policy</p>
</body>
</html>

    `
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

const login= async (Name,email)=>{
  const mailOptions = {
    from: 'Smart Policy<prajapathideepak4980@gmail.com>',
    to: email,
    subject: `New Login Alert`,
    html : `
    <html>
<head>
    <style>
        p {
            margin: 0px;
            margin-bottom:10px;
        }
    </style>
</head>
<body>
    <h3>Hi ${Name},</h3>
    <p>Just a quick heads-up! We noticed a new login to your account. If this was you, awesome! No worries. 😊</p>

    <p>If you didn't log in at that time, please secure your account ASAP. Here's what you can do:</p>
    <ol>
        <li>Change your password.</li>
        <li>Review recent activity.</li>
        <li>Consider enabling two-factor authentication for extra security.</li>
        <li>Reach out to us if you need any help or have questions.</li>
    </ol>

    <p>Your security is super important to us, so we're always here to help out.</p>

    <p>Thanks,</p>
    <p>Support Team<br>
    <p>Smart Policy</p>
</body>
</html>

    `
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

const withdraw = async (customer, email) => {
  const mailOptions = {
    from: 'Smart Policy <prajapathideepak4980@gmail.com>',
    to: email,
    subject: `Confirmation of Claim Withdrawal`,
    html: `
      <p>Dear ${customer},</p>
      <p>We have received your request to withdraw your recent claim. We want to confirm that your request has been processed accordingly.</p>

      <p>As per your request, the claim process has been halted, and no further action will be taken regarding this claim. If you have any questions or require any additional assistance, please feel free to reach out to our customer support team at [provide contact details].</p>

      <p>Thank you for notifying us of your decision. We appreciate your understanding and cooperation.</p>

      <p>Best regards,</p>

      <p>The Claims Management Team</p><br>
      <p>Smart Policy</p>
    `
  };
  
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};


const statusupdate = async (status, customer, email) => {
  let subject = '';
  let htmlTemplate = '';

  switch (status) {
    case 'APPROVED':
      subject = "Congratulations! Your Claim Has Been Approved";
      htmlTemplate = `
        <p>Dear ${customer},</p>
        <p>We are delighted to inform you that your recent claim has been approved. After careful consideration and evaluation, we have determined that your claim meets all the necessary criteria for approval.</p>
        <p>You can expect to receive [details of settlement or next steps, such as reimbursement, replacement, etc.]. Please review the attached documentation for further information regarding the approved claim.</p>
        <p>We appreciate your patience and cooperation throughout this process. Should you have any questions or require additional assistance, please don't hesitate to contact our customer support team at [provide contact details].</p>
        <p>Thank you for choosing [Your Company Name]. We look forward to continuing to serve you.</p>
        <p>Warm regards,</p>
        <p>[Your Name]</p>
        <p>[Your Position/Title]</p>
        <p>[Your Company Name]</p>
        <p>[Contact Information]</p>
      `;
      break;
    case 'SETTLED':
      subject = "Important Update: Your Claim Has Been Settled";
      htmlTemplate = `
        <p>Dear ${customer},</p>
        <p>We are writing to inform you that your claim has been successfully settled. Our team has completed the necessary procedures, and the settlement amount has been [details of payment method or reimbursement].</p>
        <p>Please review the attached documentation for confirmation of the settlement details. If you have any questions or need further assistance, please feel free to reach out to our customer support team at [provide contact details].</p>
        <p>Thank you for your patience and understanding throughout this process. We appreciate the opportunity to assist you and remain at your service for any future needs.</p>
        <p>Best regards,</p>
        <p>[Your Name]</p>
        <p>[Your Position/Title]</p>
        <p>[Your Company Name]</p>
        <p>[Contact Information]</p>
      `;
      break;
    case 'REJECTED':
      subject = "Important Update Regarding Your Claim";
      htmlTemplate = `
        <p>Dear ${customer},</p>
        <p>We regret to inform you that your recent claim has been rejected. After thorough review and assessment, we determined that your claim did not meet the necessary criteria for approval.</p>
        <p>Please refer to the attached documentation for specific details regarding the rejection of your claim. If you believe there has been an error or if you have any questions about the decision, please don't hesitate to contact our customer support team at [provide contact details].</p>
        <p>We understand this may be disappointing news, and we sincerely apologize for any inconvenience this may have caused. Thank you for your understanding.</p>
        <p>Best regards,</p>
        <p>[Your Name]</p>
        <p>[Your Position/Title]</p>
        <p>[Your Company Name]</p>
        <p>[Contact Information]</p>
      `;
      break;
    default:
      console.error('Invalid status provided.');
      return;
  }

  const mailOptions = {
    from: 'Smart Policy <prajapathideepak4980@gmail.com>',
    to: email,
    subject: subject,
    html: htmlTemplate
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};





module.exports ={
  newregistration,
  newClaims,
  login,
  withdraw,
  statusupdate
}

