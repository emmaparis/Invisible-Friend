const db = require('../config/connection');
const { User, Expert } = require('../models');

db.once('open', async () => {
  try {
    const experts = await Expert.find({});

    // map through them, extract their ids

    const expertIds = experts.map((expert) => expert._id);

    // update 644317cf3817e6d4904af4c7 expert array with list of expert ids

    await User.updateOne(
      { username: 'doctorinsane' },
      { $set: { experts: expertIds } }
    );
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding experts!!', err);
    process.exit(1);
  }
});
