// Load the AWS SDK for Node.js

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;

var AWS = require('aws-sdk');

AWS.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  

module.exports = async (message) => {
        // Create sendEmail params 
        var params = {
        Destination: { /* required */
            CcAddresses: [
                EMAIL_ADDRESS,
            /* more items */
            ],
            ToAddresses: [
                EMAIL_ADDRESS,
            /* more items */
            ]
        },
        Message: { /* required */
            Body: { /* required */
            Html: {
            Charset: "UTF-8",
            Data: message
            },
            Text: {
            Charset: "UTF-8",
            Data: message
            }
            },
            Subject: {
            Charset: 'UTF-8',
            Data: 'message from contact form'
            }
            },
        Source: EMAIL_ADDRESS, /* required */
        ReplyToAddresses: [
            EMAIL_ADDRESS,
            /* more items */
        ],
        };

        // Create the promise and SES service object
        var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

        // Handle promise's fulfilled/rejected states
        try {
            let data = await sendPromise;
            return data;
        } catch (e) {
            return e;
        }
       
     

}