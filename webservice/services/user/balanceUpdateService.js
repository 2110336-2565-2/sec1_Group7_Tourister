const cron = require('node-cron');
const Program = require('../../models/Program');
const User = require('../../models/User');
const Notification = require('../../models/Notification');
const Booking = require('../../models/Booking');
const { getTodayDateYYYY_MM_DD, getSecsDiff } = require('../../utils/utils');

const StartUpdateUsersBalanceEveryMidnight = () => {
    console.log('Updating users balance every midnight');
    
    cron.schedule('1 0 * * *', async () => {
        console.log('Updating balance...')
        const todayDate = getTodayDateYYYY_MM_DD();
        const programs = await Program.find({ endDate: { $lte: todayDate } }, );
        //console.log(programs)
        programs.forEach(async program => {
            //console.log(getSecsDiff(new Date(program.endDate), new Date(todayDate)))
            if(getSecsDiff(new Date(program.endDate), new Date(todayDate)) < 24*60*60) {
                //console.log(program)
                const bookings = await Booking.find({ programId: program._id });
                const totalIncome = program.price * bookings.length;
                await User.findByIdAndUpdate(program.guide, { $inc: { remainingAmount: totalIncome } });

                const noti = new Notification({
                    user: program.guide,
                    type: "payment",
                    title: "Trip Has Ended",
                    message: `You have earned ${totalIncome} baht from your program ${program.name}`,
                    isRead: false,
                });
                await noti.save();
                console.log(`transfered money to guide ${program.guide}`)
            }
        });
    })
}

module.exports = {
    StartUpdateUsersBalanceEveryMidnight,
}