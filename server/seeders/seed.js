const db = require('../config/connection');
const { User, Friend, Expert } = require('../models')
const userSeeds = require('./userSeeds.json');
const friendSeeds = require('./friendSeeds.json');
const expertSeeds = require('./expertSeeds.json');

async function insertExpertSeeds() {
    try{
        const users = await User.find({});

        const usersById = users.reduce((obj, user) => {
            obj[user._id] = user;
            return obj;
        }, {});

        const experts = expertSeeds.map(expert => {
            const user = usersById[expert.user];
            return { ...expert, user: user._id };
        });

        await Expert.insertMany(experts);

        console.log('Done!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding experts!!', err);
        process.exit(1);
    }
}

async function insertFriendSeeds() {
    try{
        const users = await User.find({});

        const usersById = users.reduce((obj, user) => {
            obj[user._id] = user;
            return obj;
        }, {});

        const friends = friendSeeds.map(friend => {
            const user = usersById[friend.user];
            return { ...friend, user: user._id };
        });

        await Friend.insertMany(friends);

        console.log('Done!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding friends!!', err);
        process.exit(1);
    }
}

db.once('open', async () => {
    try{
        await User.deleteMany({});
        await Friend.deleteMany({});
        await Expert.deleteMany({});

        const users = await User.create(userSeeds);
        insertExpertSeeds();
        insertFriendSeeds();

        console.log('Everything is seeded!!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding!!', err);
        process.exit(1);
    }
})