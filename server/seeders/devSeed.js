const db = require('../config/connection');
const { User, Expert } = require('../models');

db.once('open', async () => {
  try {
    const users = await User.findById('644317cf3817e6d4904af4c7');
    const experts = await Expert.find({});
    const expertIds = experts.map((expert) => expert._id);
    await User.updateOne({ _id: users._id }, { $set: { experts: expertIds } });
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding experts!!', err);
    process.exit(1);
  }
});

// find user by id 644317cf3817e6d4904af4c7

// get list of all experts
// map through them, extract their ids

// update 644317cf3817e6d4904af4c7 expert array with list of expert ids
