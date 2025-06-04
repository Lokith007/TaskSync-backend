const webpush =require('webpush');
const cron = require('cron');
const Remainder=require('/model/remainder');
const Task=require('../models/task.js');
const  User  = require('../models/user.js');
const weekly_report=require('../sendMail.js');

cron.schedule('* * * * * ',async()=>{
    const now=new Date();
    // const current_date= now.toISOString().split('T')[0];
    // const current_time=`${now.getHours()}:${now.getMinutes()}`;

    const remainders=await Remainder.find({ dueTime:{$lte:now}});
   
    for(const rem of remainders){
         const task=await Task.findOne({TaskId:rem.TaskId});
          const payload = JSON.stringify({
            title: "Remainder Alert",
            body: task.header,
         });

         try {
            await webpush.sendNotification(rem.subscription,payload);
            await Remainder.deleteOne({_id:rem._id});
         }catch (err) {
        console.error("Failed to send push:", err);
      }
    }
});

cron.schedule('* 12 * * 0',async()=>{
  weekly_report();
});
