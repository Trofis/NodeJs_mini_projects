const check = function (){
    console.log("Doing some work")
}

const yargsFunction = function(){
    const yargs = require('yargs')
    yargs.version('1.1.0')
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        handler: function () {
            console.log('Yargs : Adding a new note!')
        }
    })
    yargs.command({
        command: 'remove',
        describe: 'remove a note',
        handler: function () {
            console.log('Yargs : Removing a new note!')
        }
    })
    console.log(yargs.argv)

}

const yargs2Function = function(){
    const yargs = require('yargs')
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
            console.log('Title: ' + argv.title)
            console.log('Body: ' + argv.body)
        }
    })
    console.log(yargs.argv)
}

const catchParametersFunction = function(){
    const command = process.argv[2]
    console.log("argv : ")

    if (command === 'add') {
        console.log('Adding note!')
    } 
    else if (command === 'remove') {
        console.log('Removing note!')
    }
}

const jsonTest = function(){
    const book = {
        title: 'Ego is the Enemy',
        author: 'Ryan Holiday'
        }
    // Covert JavaScript object into JSON string
    const bookJSON = JSON.stringify(book)
    // Covert JSON string into object
    const bookObject = JSON.parse(bookJSON)
    console.log(bookObject.title) // Print: Ego is the Enemy
}

module.exports = {
    check : check, 
    yargsFunction : yargsFunction,
    catchParametersFunction : catchParametersFunction,
    yargs2Function : yargs2Function,
    jsonTest : jsonTest
}