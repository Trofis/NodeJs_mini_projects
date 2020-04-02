//Official libs
const fs = require('fs')
const validator = require("validator")
const chalk = require("chalk")

//Perso libs
const utils = require('./src/utils.js')
const arrow = require('./src/arrowfunction.js')
//------------------------------------------------------------------//
//basics tests

function test(){
    utils.check()
    console.log("--------------------------------------------")
    console.log("Validator : "+validator.isURL("http://google.fr"))
    console.log("--------------------------------------------")
    fs.writeFileSync("notes.txt", "this is a test")
    console.log(chalk.green("Chalk : test color"))
    console.log("--------------------------------------------")
    utils.yargsFunction()
    console.log("--------------------------------------------")
    utils.catchParametersFunction()
    console.log("--------------------------------------------")
    utils.yargs2Function()
    console.log("--------------------------------------------")
    utils.jsonTest()
}
//test()

//------------------------------------------------------------------//
// Manage notes

const yargs = require('yargs')
yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log("add : ")
        const book = {
            title: argv.title,
            body: argv.body
        }
        // Covert JavaScript object into JSON string
        const bookJSON = JSON.stringify(book)
        
        fs.writeFileSync("notes/"+argv.title, bookJSON)
    }
})

yargs.command({
    command: 'read',
    describe: 'read a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log("read : ")
        const bookJSON = fs.readFileSync("notes/"+argv.title)
        const book = JSON.parse(bookJSON)
        console.log(book.title)
        console.log(book.body)
    }
})

yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler:(argv) => {
        console.log("list : ")
        const folder = './notes/';
        fs.readdir(folder, (err, files) => {
            files.forEach(file => {
              arrow.readFile(file)
            });
        });
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log("remove : ")
        fs.unlinkSync("notes/"+argv.title)
    }

})

console.log(yargs.argv)



//-----------------------------------------------------------------------//
// Test arrows functions
console.log("square 1 : "+arrow.square1(2))
console.log("square 2 : "+arrow.square2(2))

console.log("Binding : ")
console.log(arrow.event.printGuestList())

arrow.check()

//-------------------------------------------------------------------//
//array
const users = [{
    name: 'Andrew Mead',
    age: 27
    },{
    name: 'George Hudson',
    age: 72
    },{
    name: 'Clay Klay',
    age: 45
}]

const user = users.find((user) => user.name === 'George Hudson')
console.log(user) 