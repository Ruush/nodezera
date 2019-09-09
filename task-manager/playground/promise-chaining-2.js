require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete("5d6694d7f1303227e4745e50", { age: 99 }).then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((tasks) => {
//     console.log(tasks)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount("5d6682bdb4a3d02c18e27ca0").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})