const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gabrielalves5582@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gabrielalves5582@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}
// sgMail.send({
//     to: 'gabriel@acosvic.com.br;pedrohenriquegmf@gmail.com',
//     from: 'gayuganda@whyareugae.com',
//     subject: 'Why are u gae?',
//     html: `<h1>you are gue</h1><br><img src="https://images-cdn.9gag.com/photo/aqKE98Z_700b.jpg"><br><p>NO U GAE</p><br><img src="https://media.tenor.com/images/f5bc5a1ecb54a9eb1366805748a8e705/tenor.gif" alt="this slowpoke moves">`
// })

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}