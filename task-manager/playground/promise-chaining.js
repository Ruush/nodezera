require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5d669484e2f02007d43a99a5', { age: 99 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 99 })
// }).then((users) => {
//     console.log(users)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

updateAgeAndCount('5d669484e2f02007d43a99a5', 1).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})