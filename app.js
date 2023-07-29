const express = require('express')
const userRouter = require('./routes/userRoutes')
const taskRouter = require('./routes/taskRoutes');
const app = express()
require('./models')
app.use(express.json());    


// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.use('/',userRouter)
app.use('/',taskRouter)

  
const port = 8989;
app.listen(port,() =>{
console.log(`app is running ${port}`);
})