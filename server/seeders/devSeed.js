const db = require('../config/connection');
const { User, Expert } = require('../models');

db.once('open', async () => {
  try {
    const experts = await Expert.find({});
    const friends = await User.find({});

    // map through them, extract their ids

    const expertIds = experts.map((expert) => expert._id);
    const friendIds = friends.map((friend) => friend._id);

    // update 644317cf3817e6d4904af4c7 expert array with list of expert ids

    await User.updateOne(
      { username: 'doctorinsane' },
      { $set: { experts: expertIds } }
    );

    await User.updateOne(
      { username: 'doctorinsane' },
      { $set: { friends: friendIds } }
    );
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding experts!!', err);
    process.exit(1);
  }
});
