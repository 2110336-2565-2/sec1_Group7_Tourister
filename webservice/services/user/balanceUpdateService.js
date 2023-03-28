const cron = require('node-cron');
const Program = require('../../models/Program');
const User = require('../../models/User');

const StartUpdateUsersBalanceEveryMidnight = () => {
    console.log('Updating users balance every midnight');
    cron.schedule('0 0 * * *', async () => {
        console.log('Updating users balance...')
        const programs = await Program.find({ status: 'ongoing' });
        programs.forEach(async (program) => {
            const now = new Date();
            const programEndDate = new Date(program.endDate);
            if (now > programEndDate) {
                const users = await User.find({ program: program._id });
                users.forEach(async (user) => {
                    user.balance += program.price;
                    await user.save();
                });
                program.status = 'complete';
                await program.save();
            }
        });
    });
}

module.exports = {
    StartUpdateUsersBalanceEveryMidnight,
}