// // Let and Const

// // ES5
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller';

// console.log(name5);

// //ES6

// const name6 = 'Jane Smith';
// let age6 = 23;
// // name6 = 'Jane Miller'
// console.log(name6);

// //ES5
// function driversLicense5(passedTest) {
//     if (passedTest) {
//         var firstName = 'John';
//         var yearOfBirth = 1990;
//     }
//     console.log(firstName, 'born in', yearOfBirth, 'is now officially able to drive a car.'); //this console log still works because the vars were created inside the function, so the whole function has access to them
// }

// driversLicense5(true);

// //ES6 variables are block-scoped, not function-scoped
// function driversLicense6(passedTest) {
//     //let firstName; would have to be declared here in order to have access to it throughout the function
//     if (passedTest) {
//         let firstName = 'John';
//         const yearOfBirth = 1990;
//     }
//     //console.log(firstName, 'born in', yearOfBirth, 'is now officially able to drive a car.'); //this console log does not work because the let and const were created inside a block, between curly braces, so the only that block has access to them
// }

// driversLicense6(true);


// let i = 23

// for (let i = 0; i < 5; i++) {
//     console.log(i)
// }
// console.log(i)

// /*Lecture: Blocks and IIFES */

// {
//     const a = 1
//     let b = 2
//     var c = 3
// }
// // console.log(a + b)
// console.log(c)

/*Lecture: Strings */

// let firstName = 'Daniel';
// let lastName = 'Ridley';
// const yearOfBirth = 1981
// function calcAge(year) {
//     return 2020 - year
// }

// console.log('This is' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.')
// console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`)

// const n = `${firstName} ${lastName}`
// console.log(n.startsWith('D'))
// console.log(n.endsWith('y'))
// console.log(n.includes('ani'))
// console.log(firstName.repeat(58))
// console.log(`${firstName} did a thing `.repeat(8))
// console.log(' string theory '.repeat(300))

/*Lecture: Arrow Functions */
// const years = [1945, 1949, 1974, 1976, 1980]

// //es5
// var ages5 = years.map(function (el) {
//     return 2020 - el
// })
// console.log(ages5)

// //es6

// const ages6 = years.map((el) => { //this was my take, the better one is below
//     return 2020 - el
// })
// //changed this from a const to a let, so I'm mutating it below
// let agesES6 = years.map(el => 2020 - el) //An arrow function will automatically return if it is on the same line


// agesES6 = years.map((el, index) => `Age element at index ${index + 1}: ${2020 - el}`)


// agesES6 = years.map((el, index) => {
//     const now = new Date().getFullYear()
//     const age = now - el
//     return `Age of volunteer at index ${index + 1}: ${age}`
// })
// console.log('ES6', agesES6)

// const guitars = ['Les Paul', 'Telecaster', 'Martin', 'Washburn']

// let getGuitars = guitars.map(git => git) //if you only have one argument, you don't need parenthesis, automatically returns on one line
// console.log(getGuitars)
// getGuitars = guitars.map((git, index) => `My favorite guitars, in order of preference, are ${index + 1}: ${git}.`) //two or more args requires 
//                                                                                                                    //parenthesis, automatically returns on one line
// console.log(getGuitars)
// getGuitars = guitars.map((git, index) => { //if writing on more than one line, does not automatically return, 
//                                            //so you must write a block with curly braces `{}` and you must write `return` so it will return something...
//                                            //because functions HAVE to return something. Say it again. Functions must return something.
//     const currentYear = new Date().getFullYear()
//     const month = new Date().getMonth()
//     const date = new Date().getDate()
//     return `To date, ${month}/${date}/${currentYear}, these are my favorite guitars in order of preference ${index + 1}: ${git}.`
// })
// console.log(getGuitars)

/*Lecture: Arrow Functions 2 */
//arrow functions do not get a `this` keyword, they use the `this` keyword of the function they're written in

//es5
// var box5 = {
//     color: 'green',
//     position: 1,
//     clickMe: function () {
//         var self = this;
//         document.querySelector('.green').addEventListener('click', function () {
//             var str = 'This is box number ' + self.position + ' and it is ' + self.color
//             alert(str)
//         })
//     }
// }
// // box5.clickMe()

// //es6
// const box6 = {
//     color: 'green',
//     position: 1,
//     clickMe: function () {
//         document.querySelector('.green').addEventListener('click', () => {
//             var str = 'This is box number ' + this.position + ' and it is ' + this.color
//             alert(str)
//         })
//     }
// }
// box6.clickMe()

// const box2 = {
//     color: 'blue',
//     position: 2,
//     clickMe: function () {
//         document.querySelector('.blue').addEventListener('click', () => {
//             let string = `This is box number ${this.position}, and it is ${this.color}.`
//             alert(string)
//         })
//     }
// }
// box2.clickMe()

// const box3 = {
//     color: 'orange',
//     position: 3,
//     clickMe: function () {
//         document.querySelector('.orange').addEventListener('click', () => {
//             let string = `Dang 'ol ${this.color} box is number ${this.position}, man.`
//             let strPrompt = prompt(string, 'orange')
//         })
//     }
// }
// box3.clickMe()
/*
const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color
            alert(str)
        })
    }
}
box66.clickMe()
*/

//es5
// function Person(name) {
//     this.name = name
// }
// Person.prototype.myFriends5 = function (friends) {
//     var arr = friends.map(function (el) {
//         return this.name + ' is friends with ' + el
//     }.bind(this))
//     console.log(arr)
// }
// var friends = ['Matt', 'Jack', 'Nathan']
// new Person('Daniel').myFriends5(friends)

// //es6
// Person.prototype.myFriends6 = function (friends) {
//     let arr = friends.map(el => `${this.name} is friends with ${el}.`)
//     console.log(arr)
// }
// new Person('Daniel').myFriends6(friends)


/*Lecture: Destructuring */

//es5

// var john = ['John', 26]
// var name = john[0]
// var age = john[1]

//es6
// const [name, age] = ['Amy', 26]
// console.log(name, age)


// const objection = {
//     firstName: 'Daniel',
//     lastName: 'Ridley',
//     politicalAffiliation: 'democrat'
// }
// const { firstName, lastName, politicalAffiliation: polffil } = objection
// console.log(firstName, lastName, polffil)

// const { firstName: a, lastName: b } = objection
// console.log(a, b)

// function calcAgeRetirment(year) {
//     const age = new Date().getFullYear() - year
//     return [age, 65 - age]
// }
// const [age2, retirement] = calcAgeRetirment(1980)

// console.log(age2, retirement)



/*Lecture: Arrays */

// const boxes = document.querySelectorAll('.box')

// //es5

// // var boxesArr5 = Array.prototype.slice.call(boxes)
// // boxesArr5.forEach(function (cur) {
// //     cur.style.backgroundColor = 'dodgerblue'
// // })


// //es6

// const boxesArr6 = Array.from(boxes)
// boxesArr6.forEach(element => element.style.backgroundColor = 'dodgerBlue')

// //es5

// // for (let i = 0; i < boxesArr5.length; i++) {
// //     if (boxesArr5[i].className === 'box blue') {
// //         continue;
// //     }
// //     boxesArr5[i].textContent = 'I changed to blue!'
// // }

// //es6 forOf
// for (const cur of boxesArr6) {
//     if (cur.className.includes('blue')) {
//         continue;
//     }
//     cur.textContent = 'I have changed!'
// }

// //es5

// var ages = [12, 17, 8, 21, 14, 11]
// var full = ages.map(function (cur) {
//     return cur >= 18
// })
// console.log(full.indexOf(true))
// full.indexOf(true)
// console.log(ages[full.indexOf(true)])

// //es6

// console.log(ages.findIndex(cur => cur >= 18))
// console.log(ages.find(cur => cur >= 18))


/*Lecture: Spread Operator */
// function addFourAges(a, b, c, d) {
//     return a + b + c + d
// }

// var sum1 = addFourAges(18, 30, 12, 21)
// console.log(sum1)

// //es5
// var ages = [18, 30, 12, 21]
// var sum2 = addFourAges.apply(null, ages)
// console.log(sum2)

// //es6
// const sum3 = addFourAges(...ages)
// console.log(sum3)

// const familySmith = ['John', 'Jane', 'Mark']
// const familyMiller = ['Mary', 'Bob', 'Ann']
// const bigFamily = [...familySmith, 'Lily', ...familyMiller]
// console.log(bigFamily)

// const h = document.querySelector('h1')
// const boxes = document.querySelectorAll('.box')
// const all = [h, ...boxes]

// Array.from(all).forEach(cur => cur.style.color = 'purple')


// const beefPrices = [10.01, 10.05, 10.09, 10.10]

// const subsTotal = addFourAges(...beefPrices)
// console.log(subsTotal)

//bad example, but I must move on:
// const ageCalc = (birthYear) => {
//     const currentYear = new Date().getFullYear()
//     return currentYear - birthYear
// }
// const test1 = ageCalc(1945)
// console.log(test1)

// const ridleyBirthYears = [1945, 1949, 1974, 1976, 1980, 1981, 2014, 2017]
// const test2 = ageCalc(...ridleyBirthYears)
// console.log(test2)







/*Lecture: Rest Parameters */

// //es5
// function isFullAge5() {
//     console.log(arguments)
//     var argsArray = Array.prototype.slice.call(arguments)
//     argsArray.forEach(function (cur) {
//         console.log(2016 - cur >= 18)
//     })
// }
// // isFullAge5(1990, 1999, 1965)
// // isFullAge5(1990, 1999, 1965, 2016, 1987)

// //es6
// function isFullAge6(...years) {
//     years.forEach(cur => console.log((2019 - cur) >= 18))
// }
// isFullAge6(1981, 2014, 1988)

//es5
// function isFullAge5(limit) {
//     console.log(arguments)
//     var argsArray = Array.prototype.slice.call(arguments, 1)
//     argsArray.forEach(function (cur) {
//         console.log(2011 - cur >= limit)
//     })
// }
// isFullAge5(26, 1990, 1999, 1965)
// isFullAge5(1990, 1999, 1965, 2016, 1987)

// //es6
// function isFullAge6(limit, ...years) {
//     const thisYear = new Date().getFullYear()
//     years.forEach(cur => console.log((thisYear - cur) >= limit))
// }
// isFullAge6(16, 1981, 2014, 1988, 1965, 2017)

/*Lecture: Default Parameters */

//es5
// function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
//     lastName === undefined ? lastName = 'Smith' : lastName = lastName
//     nationality === undefined ? nationality = 'American' : nationality = nationality
//     this.firstName = firstName
//     this.lastName = lastName
//     this.yearOfBirth = yearOfBirth
//     this.nationality = nationality
// }

// var john = new SmithPerson('John', 1990)
// console.log(john)
// var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish')
// console.log(emily)

// function RidleyPerson(firstName, yearOfBirth, lastName = 'Ridley', nationality = 'American') {
//     this.firstName = firstName
//     this.yearOfBirth = yearOfBirth
//     this.lastName = lastName
//     this.yearOfBirth = yearOfBirth
//     this.nationality = nationality
// }

// let dan = new RidleyPerson('Daniel', 1980)
// console.log(dan, 'that is me!')


/*Lecture: Maps */

const question = new Map()

question.set('question', 'What is the official name latest JavaScript version?')
question.set(1, 'ES5')
question.set(2, 'ES6')
question.set(3, 'ES2015')
question.set(4, 'ES7')
question.set('correct', 3)
question.set(true, 'Correct answer.')
question.set(false, 'Wrong, please try again')

console.log(question.get('question'))
// console.log(question.size)

if (question.has(4)) {
    // question.delete(4)
    // console.log('Answer #4')
}
// question.clear()

// question.forEach((val, key) => console.log(`This is the ${key} key, and it is set to ${val}.`))

for (let [key, value] of question.entries()) {
    if (typeof (key) === 'number') {
        console.log(`Answer ${key}: ${value}.`)
    }
}

// const ans = parseInt(prompt('Seal your doom.'))
// console.log(question.get(ans === question.get('correct')))



const car = new Map()
car.set('question 1', 'What is your favorite car that you have owned?')
car.set('question 2', 'What is your dreamcar?')
car.set(1, 'Honda Oddysey')
car.set(2, 'Toyota Corrola')
car.set(3, 'Nissan Pathfinder')
car.set(4, 'Honda Ridgeline')
car.set(5, 'Corvette')
car.set(6, 'Mazda 323')
car.set('correct', 4)
car.set(true, 'Correct answer.')
car.set(false, 'Wrong, please try again')


const answer = parseInt(prompt(car.get('question 1')))
console.log(car.get(answer === car.get('correct')))










/*Lecture: Strings */
/*Lecture: Strings */
/*Lecture: Strings */
/*Lecture: Strings */
/*Lecture: Strings */
/*Lecture: Strings */


