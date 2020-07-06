const _ = require("lodash")

const user_1 = {
    name: "Bui Van A",
    age: 30,
    education: {
        university: "FPT Polytechnic"
    },
    jobs: [
        {
            title: "Teacher",
            type: "fulltime"
        },
        {
            title: "Developer",
            type: "partime"
        }
    ]
}

const user_2 = {
    name: "Phan Van B",
    age: 20,
    education: {
        university: "FPT Polytechnic"
    },
}

const users = [user_1, user_2]

// users.forEach(user => {
//     // user.jobs && user.jobs.length > 0 ? console.log(user.jobs[0].title) : console.log(null)
//     console.log(_.get(user, "jobs[0].title", "Thất nghiệp"))
// });

// _.set

// _.chain
const url = "https://login.cybersoft.edu.vn/courses/1/chapters/2/videos/5"

// const parseUrl = url.split("/")
// const courseIndex = parseUrl.indexOf("courses")
// const courseIdIndex = courseIndex + 1
// console.log("Course ID: ", parseUrl[courseIdIndex])

// console.log(url.split("/")[url.split("/").indexOf("courses") + 1])

const getObjectId = (type) => {
    return _.chain(url)
    .split("/")
    .indexOf(type)
    .thru(value => value + 1)
    .thru(value => {
        return _.chain(url)
        .split("/")
        .get(value)
        .value()
    })
    .value()
}

console.log(getObjectId("courses"))
console.log(getObjectId("chapters"))
console.log(getObjectId("videos"))
