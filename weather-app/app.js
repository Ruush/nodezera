const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const words = process.argv
if (words[2]) {

    const address = words[3] ?
        `${words[2]} ${words[3]}` : words[3] ?
            `${words[2]} ${words[3]} ${words[4]}` : words[2]

    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log("error", error)
        }

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return console.log("error", error)
            }
            console.log(location)
            console.log(data)
        })
    })

} else {
    console.log("Provide some location")
}
