const app = require('./app')

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.listen(3000, ()=>{
    console.log("Server Started");
});


/*
steps:-
npm init
npm i express
npm i nodemon -D
npm i mongoose and connect with mongoose with a config

*/