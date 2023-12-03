const mongoose = require('mongoose')

const DB = "mongodb+srv://thegame270899:thegame270899@task-manager.qdprrjk.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DB).then(()=>{
    console.log("Connection Suucessfull");
}).catch((e)=>{
    console.log(e);
})