const db = require('../config/connection');
const { User, Friend, Expert } = require('../models');
const userSeeds = require('./userSeeds.json');
const friendSeeds = require('./friendSeeds.json');
const expertSeeds = require('./expertSeeds.json');

async function insertFriendsAndExpertSeeds() {
  try {
    const users = await User.find({});
    const experts = [];
    const friends = [];

    for (let i = 0; i < expertSeeds.length; i++) {
      const expert = expertSeeds[i];
      const user = users[i];
      experts.push({ ...expert, user: user._id });
    }
    for (let i = 0; i < friendSeeds.length; i++) {
      const friend = friendSeeds[i];
      const user = users[i];
      friends.push({ ...friend, user: user._id });
    }

    await Expert.insertMany(experts);
    await Friend.insertMany(friends);

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const friendsnew = await Friend.find({ user: user._id });
      const friendIds = friendsnew.map((friend) => friend._id);
      await User.updateOne({ _id: user._id }, { $set: { friends: friendIds } });

      const expertsnew = await Expert.find({ user: user._id });
      const expertIds = expertsnew.map((expert) => expert._id);
      await User.updateOne({ _id: user._id }, { $set: { experts: expertIds } });
    }

    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding experts!!', err);
    process.exit(1);
  }
}

async function updateUsers() {
  try {
    const users = await User.find({});
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const friends = await Friend.find({ user: user._id });
      const friendIds = friends.map((friend) => friend._id);
      await User.updateOne({ _id: user._id }, { $set: { friends: friendIds } });

      const experts = await Expert.find({ user: user._id });
      const expertIds = experts.map((expert) => expert._id);
      await User.updateOne({ _id: user._id }, { $set: { experts: expertIds } });
    }
    console.log('Users updated!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating users!!', err);
    process.exit(1);
  }
}

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Friend.deleteMany({});
    await Expert.deleteMany({});

    await User.create(userSeeds);
    await insertFriendsAndExpertSeeds();
    await updateUsers();

    console.log('Everything is seeded!!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding!!', err);
    process.exit(1);
  }
});
