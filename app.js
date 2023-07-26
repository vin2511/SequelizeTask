const express = require('express');
const userRouter = require('./routers/userRouter');
const app = express();
app.use(express.json());

app.use('/',userRouter);

const port = 4000;
app.listen(port,()=>{
    console.log(`App is listening at localhost://localhost:${port}`);
});    