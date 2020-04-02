const {MongoClient, ObjectID} = require('mongodb')

const id = new ObjectID()
console.log(id) // Print new id to the console

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dataBaseName = 'task-manager' 

MongoClient.connect(connectionUrl, {useNewUrlParser:true}, (error, client) =>{
    if (error){
        return console.log('error : '+error)
    }
    const db = client.db(dataBaseName)
    //-----------------------------------------------------------------------------------//
    //   Insert data

    /*
    db.collection('users').insertOne({
        name: 'Andrew',
        age: 27
    })*/

    /*
    db.collection('tasks').insertMany([
        {
        description: 'Clean the house',
        completed: true
        },{
        description: 'Renew inspection',
        completed: false
        }
        ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks!')
        }
        console.log(result.ops)
    })*/

    //-----------------------------------------------------------------------------------//
    //      Queries

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    })

    db.collection('tasks').findOne({ _id: new
        ObjectID("5df78c8899e31c196d7aa9b1") }, (error, task) => {
        console.log(task)
        })

    //-----------------------------------------------------------------------------------//
    //      Promise vs Callback

    //Wait result
    const doWorkPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve([7, 4, 1])
        // reject('Things went wrong!')
        }, 2000)
    })
    
    doWorkPromise.then((result) => {
        console.log('Success!', result)
    }).catch((error) => {
        console.log('Error!', error)
    })

    //Don't wait result
    const doWorkCallBack = (callback) =>{
        setTimeout(() => {
            callback(undefined,[1,4,7])
        }, 2000)
    }
    doWorkCallBack((error, result) => {
        if (error){
            return console.log('Error ', error)
        }
        console.log("Result : ",result)
    })

    //-----------------------------------------------------------------------------------//
    //   Update data

    db.collection('users').updateOne({
        _id: new ObjectID("5df78b77916e6618cb04eabc")
    }, {
        $inc: {
        age: 1
        }
        }).then((result) => {
        console.log(result)
        }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').updateMany({
        completed: false
        }, {
        $set: {
        completed: true
        }
        }).then((result) => {
        console.log(result.modifiedCount)
        }).catch((error) => {
        console.log(error)
        })

    db.collection('users').deleteMany({
        age: 34
        }).then((result) => {
        console.log(result)
        }).catch((error) => {
        console.log(error)
        })


    db.collection('tasks').deleteOne({
        description: "Clean the house"
        }).then((result) => {
        console.log(result)
        }).catch((error) => {
        console.log(error)
        })
});
