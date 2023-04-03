const cron = require('node-cron');
const Program = require('../../models/Program');
const User = require('../../models/User');
const Notification = require('../../models/Notification');

const StartUpdateUsersBalanceEveryMidnight = () => {
    console.log('Updating users balance every midnight');
    cron.schedule('21 0 * * *', async () => {
        console.log('Updating users balance...')
        const programs = await Program.find({ status: 'ongoing' });
        programs.forEach(async (program) => {
            const now = new Date();
            const programEndDate = new Date(program.endDate);
            if (now > programEndDate) {
                await User.findByIdAndUpdate(program.guide, { $inc: { remainingAmount: program.price } });
                program.status = 'complete';
                await program.save();
                const transfer_noti = new Notification({
                    user: program.guide,
                    type: 'transfer',
                    title: 'Coins Received',
                    message: `You have received ${program.price} Baht from ${program.name}`,
                    isRead: false
                });
                await transfer_noti.save();
            }
        });
    });
}

module.exports = {
    StartUpdateUsersBalanceEveryMidnight,
}