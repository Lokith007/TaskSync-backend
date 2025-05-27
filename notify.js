const webpush =require('webpush');
const cron = require('cron');
const Remainder=require('/model/remainder');
const Task=require('./models/task');
const  User  = require('./models/user');

cron.schedule('* * * * * ',async()=>{
    const now=new Date();
    // const current_date= now.toISOString().split('T')[0];
    // const current_time=`${now.getHours()}:${now.getMinutes()}`;

    const remainders=await Remainder.find({ dueTime:now});
   
    for(const rem of remainders){
         const task=await Task.findOne({TaskId:rem.TaskId});
          const payload = JSON.stringify({
            title: "Remainder Alert",
            body: task.header,
         });

         try {
            await webpush.sendNotification(rem.subscription,payload);
         }catch (err) {
        console.error("Failed to send push:", err);
      }
    }
});

module.exports= notify;