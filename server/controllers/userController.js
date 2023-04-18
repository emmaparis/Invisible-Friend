import User from '../models/userModel.js';
import userSchema from '../utils/validators.js';


module.exports = {

    // get all users
async getUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
},

    // get one user by id

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

  // create a new user

  async createUser(req, res) {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},

    // update a user by id

async updateUser(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},

    // delete a user by id

async deleteUser(req, res) {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.json({ message: 'User successfully deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
},
};