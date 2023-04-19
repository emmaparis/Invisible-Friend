import { User, Friend, Expert} from '../models';
import { userErrorMessages, userSchema, friendSchema, friendErrorMessages, expertSchema, expertErrorMessages } from '../utils/validators.js';

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          try {
            const { value, error } = userSchema.validate(context.user);
            if (error) {
              throw new Error(userErrorMessages.validationError);
            }
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('friends')
                .populate('experts');
              return userData;
          }
            catch (err) {
            throw new Error(err.message);
          }
      },

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
          try {
            const {error, value} = userSchema.validate(args);
            if (error) {
                throw new Error(userErrorMessages.validationError);
            }
            const user = await User.create(value);
            return {
              message: 'User created successfully',
              user,
            };
          } catch (err) {
            throw new Error(userErrorMessages.validationError);
          }
        },

        updateUser: async (parent, args) => {
          try {
          const {error, value} = userSchema.validate(args);
          if (error) {
              throw new Error(userErrorMessages.validationError);
          }
          const updatedUser = await User.findOneAndUpdate(
            { _id: args._id },
            { $set: { ...value } },
            { runValidators: true, new: true }
          );
          return updatedUser;
        } catch (err) {
          throw new Error(userErrorMessages.validationError);
        }
        },
        
        deleteUser: async (parent, { _id }) => {
          try {
           const user = await User.findOneAndDelete({ _id });
           return user;
          } catch (err) {
            throw new Error(userErrorMessages.noUserError)
          }
        },

        addFriend: async (parent, args) => {
          try {
            const {error, value} = friendSchema.validate(args);
            if (error) {
                throw new Error(friendErrorMessages.validationError);
            }
            const friend = await Friend.create(value);
            return friend;
          } catch (err) {
            throw new Error(friendErrorMessages.validationError);
          }
        },

        updateFriend: async (parent, { _id, name, language, age, mood, user }) => {
          try {
            const {error, value} = friendSchema.validate({ name, language, age, mood, user });
            if (error) {
                throw new Error(friendErrorMessages.validationError);
            }
            const updatedFriend = await Friend.findOneAndUpdate(
                { _id },
                { $set: { ...value } },
                { runValidators: true, new: true }
            )
            return updatedFriend;
          } catch (err) {
              throw new Error(friendErrorMessages.validationError);
            }
          },

          deleteFriend: async (parent, { _id }) => {
            try {
              const friend = await Friend.findOneAndDelete({ _id });
            return friend;
            } catch (err) {
              throw new Error(friendErrorMessages.noFriendError);
            }
          },

          addExpert: async (parent, args) => {
            try {
              const {error, value} = expertSchema.validate(args);
              if (error) {
                  throw new Error(expertErrorMessages.validationError);
              }
            const expert = await Expert.create(value);
            return expert;
            } catch (err) {
              throw new Error(expertErrorMessages.validationError);
            }
          },

          updateExpert: async (parent, { _id, name, language, expertise, user }) => {
            try {
              const {error, value} = expertSchema.validate({name, language, expertise, user});
              if (error) {
                  throw new Error(expertErrorMessages.validationError);
              }
              const updatedExpert = await Expert.findOneAndUpdate(
              { _id },
              { $set: { ...value  } },
              { runValidators: true, new: true }
            )
            return updatedExpert;
          } catch (err) {
            throw new Error(expertErrorMessages.validationError);      
          }
        },

          deleteExpert: async (parent, { _id }) => {
            try {
              const expert = await Expert.findOneAndDelete({ _id });
            return expert;
            } catch (err) {
              throw new Error(expertErrorMessages.noExpertError);
            }
          }
          }
     }