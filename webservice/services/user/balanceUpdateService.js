const cron = require('node-cron');
const Program = require('../../models/Program');
const User = require('../../models/User');
const Notification = require('../../models/Notification');
const Booking = require('../../models/Booking');
const { getTodayDateYYYY_MM_DD, getSecsDiff, getDateYYYY_MM_DD, getYesterDayDateYYYY_MM_DD, addHoursToDate } = require('../../utils/utils');

const StartUpdateUsersBalanceEveryMidnight = () => {
    console.log('Updating users balance every midnight');
    
    cron.schedule('01 00 * * *', async () => {
        console.log('Updating balance...')
        const yesterDate = getYesterDayDateYYYY_MM_DD(getTodayDateYYYY_MM_DD());
        const todayDate = (new Date(getTodayDateYYYY_MM_DD())).toISOString();
        const programs = await Program.find({ endDate: { $lte: todayDate } });
        programs.forEach(async program => {
            //console.log(getSecsDiff(new Date(program.endDate), new Date(todayDate)))
            const end_date =  new Date(getDateYYYY_MM_DD(new Date(program.endDate)))
            const yester_date = addHoursToDate(new Date(yesterDate), 7)
            const secsDiff = getSecsDiff(end_date , yester_date);
            if(secsDiff == 0) {
                console.log("finished program",program)
                const bookings = await Booking.find({ programId: program._id});
                // console.log("booking",bookings)
                const totalIncome = program.price * program.num_participant;
                await User.findByIdAndUpdate(program.guide, { $inc: { remainingAmount: totalIncome } });

                const noti = new Notification({
                    user: program.guide,
                    type: "paymentguide",
                    title: "Trip Has Ended",
                    message: `You have earned ${totalIncome} baht from your program ${program.name}`,
                    isRead: false,
                });
                await noti.save();
                console.log(`transfered money to guide ${program.guide} from trip ${program.name}`)
            }
        });
        console.log('Updated balance complete')
    })
}

module.exports = {
    StartUpdateUsersBalanceEveryMidnight,
}