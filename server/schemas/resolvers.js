import { User, Friend, Expert} from '../models';
import { errorMessages, userSchema } from '../utils/validators.js';

const resolvers = {
    Query: {
        users: async () => {
          try {
            return await User.find();
          } catch (err) {
            throw new Error(err.message);
          }
        },
        user: async (parent, { _id }) => {
          try{
            return await User.findOne({ _id }).populate('friends').populate('experts');
          } catch (err) {
            throw new Error(err.message);
          }
        },
        friends: async () => {
          try{
            return await Friend.find();
          } catch (err) {
            throw new Error(err.message);
          }
        },
        friend: async (parent, { _id }) => {
          try {
          return await Friend.findOne({ _id }).populate('user')
          } catch (err) {
            throw new Error(err.message);
          }
        },
        experts: async () => {
          try{
            return await Expert.find();
          } catch (err) {
            throw new Error(err.message);
          }
        },
        expert: async (parent, { _id }) => {
          try {
          return await Expert.findOne({ _id }).populate('user')
        } catch (err) {
          throw new Error(err.message);
        }
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const {error, value} = userSchema.validate(args);
            if (error) {
                res.status(400).json({ message: errorMessages.validationError });
                return;
            }
            const user = await User.create(value);
            return {
              message: 'User created successfully',
              user,
            };
        },

        updateUser: async (parent, args) => {
          const {error, value} = userSchema.validate(args);
          if (error) {
              res.status(400).json({ message: errorMessages.validationError });
              return;
          }
          const updatedUser = await User.findOneAndUpdate(
            { _id: args._id },
            { $set: { ...args } },
            { runValidators: true, new: true }
          );
          return updatedUser;
        },
        
        deleteUser: async (parent, { _id }) => {
           return User.findOneAndDelete({ _id });
        },
        addFriend: async (parent, args) => {
            const friend = await Friend.create(args);
            return friend;
        },
        updateFriend: async (parent, { _id, name, language, age, mood, user }) => {
            return Friend.findOneAndUpdate(
                { _id },
                { $set: { name, language, age, mood, user } },
                { runValidators: true, new: true }
            )},
          deleteFriend: async (parent, { _id }) => {
            return Friend.findOneAndDelete({ _id });
          },
          addExpert: async (parent, args) => {
            const expert = await Expert.create(args);
            return expert;
          },
          updateExpert: async (parent, { _id, name, language, expertise, user }) => {
            return Expert.findOneAndUpdate(
              { _id },
              { $set: { _id, name, language, expertise, user  } },
              { runValidators: true, new: true }
            )},
          deleteExpert: async (parent, { _id }) => {
            return Expert.findOneAndDelete({ _id });
          }
          }
        
        }