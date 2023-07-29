const express = require('express')
const userRouter = require('./routes/userRoutes')
const app = express()
require('./models')
app.use(express.json());    
var userCtrl = require('./controllers/userController') 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.use('/',userRouter)


const port = 8989;
app.listen(port,() =>{
console.log(`app is running ${port}`);
})