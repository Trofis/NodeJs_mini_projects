const fs = require('fs')

const square1 = (x) =>{
    return x*x
}

const square2 = (x) => x*x 

const event = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guest list for ' + this.name)
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

const check = () => console.log("Doing some work")

const readFile = (title) => {
    const bookJSON = fs.readFileSync("notes/"+title)
    const book = JSON.parse(bookJSON)
    console.log("titre : "+book.title)
    console.log("body : "+book.body)
}


module.exports = {
    square1 : square1,
    square2 : square2,
    event : event,
    check : check,
    readFile : readFile
}