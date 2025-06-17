const express=require('express');
const cors =require('cors');
const mainRoute = require('./routers/mainRoute');
const taskRoute = require('./routers/taskRoute');
const organisationRoute = require('./routers/organisationRoute');
require('dotenv').config();

const app=express();
const origin = [ ];

app.use(express.json());
app.use(cookieParser()); 
notify.start();
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

webpush.setVapidDetails(
  'mailto:tasksync.service@gmail.com',
   process.env.publicKey,
   process.env.privatekey
  );
  
app.use('/app',mainRoute);
app.use('/task',mainRoute);
app.use('/organisation',organisationRoute)

app.listen(port,(req,res)=>{
    console.log(`server is running at http://localhost:${process.env.port}`);
});
