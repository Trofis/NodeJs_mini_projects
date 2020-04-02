const mongoose = require("mongoose")
const validator = require("validator")

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser:true,
    useCreateIndex:true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password : {
        type : String,
        required : true,
        minlength : 7,
        trim: true,
        validate(value){
            if (value.toLowerCase().includes('password'))
                throw new Error('Password cannot contains password')
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
        }
        }
}
    })

const Task = mongoose.model("Task", {
    description :{
        type : String,
        required : true,
        trim:true
    },
    completed : {
        type : Boolean,
        required : false,
        default: false
    }
})

const me = new User({
    name : "Thomas",
    email: "thomas.mendesm@gmail.com",
    password : "password"
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log("Error !", error)
})
/*
const me2 = new User({
    name : "Thomas",
    email: "thomas.mendesmgmail.com"
})

me2.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log("Error !", error)
})*/


const task1 = new Task({
    description: "Second task"
})

task1.save().then(() => {
    console.log(task1)
}).catch((error) => {
    console.log("Error !", error)
})