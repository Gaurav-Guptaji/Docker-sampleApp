const express = require ('express');
const app = express();
const PORT = 3000;

app.get('/', (req,res)=>res.send('Hello! This is a sample app using docker EC2 and github pipeline'));
app.listen(PORT,()=> console.log(`server is running on ${PORT}`));
