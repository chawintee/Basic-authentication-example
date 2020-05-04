const express = require('express')
const app = express();
const db = require('./models')
const cors = require('cors')

const studentRoute = require('./routes/student')
const userRoutes = require('./routes/user')


app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/hello',(req,res)=>{
    res.send("Hello world");
})


app.post('/hello',(req,res)=>{
    res.send("Hello post");
})

app.post('/add',(req,res)=>{
    const a = Number(req.body.a);
    const b = Number(req.body.b);
    const c = a+b;
    // console.log(a)

    // res.send({result : c})
    res.send({result : a+b});
})

app.post('/addJson',(req,res)=>{
    const a = Number(req.body.a);
    const b = Number(req.body.b);
    res.send({resultJson: a+b})
})

app.use('/student',studentRoute);



db.sequelize.sync().then(()=>{

    app.listen(8000,()=>{
        console.log("Server running in port 8000")
    })
    
})


app.use('/users',userRoutes);


require('./config/passport/passport')