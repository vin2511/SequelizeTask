const express = require('express');
const app = express();

const {userRouter} = require('./routers/userRoute');
app.use(express.json());
require('./models');

app.use('/',userRouter);
  
const port = 4001;
app.listen(port,()=>{
    console.log(`App is listening at localhost:${port}`);
});        