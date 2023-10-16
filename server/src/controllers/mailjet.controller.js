const MailJet = require("node-mailjet")
const  SendForgotPassword = async (user, codeResetPassword) => {
    const mailjet = MailJet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE,
    );

    const request = await mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "nuongnunga8@gmail.com",
                        Name: "Normandy Candles Studio"
                    },
                    To: [
                        {
                            Email: `${user.dataValues.email}`,
                            Name: `${user.userName}`
                        }
                    ],
                    Subject: "reset password",
                    HTMLPart: `<h3>Dear ${user.fullName},</h3>
                    <p>Need to reset your password?</p>
                    <p>Use your secret code!</p>
                    <h4> ${codeResetPassword}</h4>
                    <p>If you did not forget your password, you can ignore this email.</p>`
                }
            ]
        })
    return request;
}
module.exports =SendForgotPassword

