import { User, Friend, Expert} from '../models';
import { userErrorMessages, userSchema, friendSchema, friendErrorMessages, expertSchema, expertErrorMessages } from '../utils/validators.js';

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
                throw new Error({ message: userErrorMessages.validationError });
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
              throw new Error({ message: userErrorMessages.validationError });
          }
          const updatedUser = await User.findOneAndUpdate(
            { _id: args._id },
            { $set: { ...value } },
            { runValidators: true, new: true }
          );
          return updatedUser;
        },
        
        deleteUser: async (parent, { _id }) => {
          try {
           const user = await User.findOneAndDelete({ _id });
           return user;
          } catch (err) {
            throw new Error({ message: userErrorMessages.noUserError })
          }
        },

        addFriend: async (parent, args) => {
          try {
            const {error, value} = friendSchema.validate(args);
            if (error) {
                throw new Error({ message: friendErrorMessages.validationError });
            }
            const friend = await Friend.create(value);
            return friend;
          } catch (err) {
            throw new Error({ message: friendErrorMessages.validationError });
          }
        },

        updateFriend: async (parent, { _id, name, language, age, mood, user }) => {
          try {
            const {error, value} = friendSchema.validate({ name, language, age, mood, user });
            if (error) {
                throw new Error({ message: friendErrorMessages.validationError });
            }
            const updatedFriend = await Friend.findOneAndUpdate(
                { _id },
                { $set: { ...value } },
                { runValidators: true, new: true }
            )
            return updatedFriend;
          } catch (err) {
              throw new Error({ message: friendErrorMessages.validationError });
            }
          },

          deleteFriend: async (parent, { _id }) => {
            try {
              const friend = await Friend.findOneAndDelete({ _id });
            return friend;
            } catch (err) {
              throw new Error({ message: friendErrorMessages.noFriendError });
            }
          },

          addExpert: async (parent, args) => {
            try {
              const {error, value} = expertSchema.validate(args);
              if (error) {
                  throw new Error({ message: expertErrorMessages.validationError });
              }
            const expert = await Expert.create(value);
            return expert;
            } catch (err) {
              throw new Error({ message: expertErrorMessages.validationError });
            }
          },

          updateExpert: async (parent, { _id, name, language, expertise, user }) => {
            try {
              const {error, value} = expertSchema.validate({name, language, expertise, user});
              if (error) {
                  throw new Error({ message: expertErrorMessages.validationError });
              }
              const updatedExpert = await Expert.findOneAndUpdate(
              { _id },
              { $set: { ...value  } },
              { runValidators: true, new: true }
            )
            return updatedExpert;
          } catch (err) {
            throw new Error({ message: expertErrorMessages.validationError });      
          }
        },

          deleteExpert: async (parent, { _id }) => {
            try {
              const expert = await Expert.findOneAndDelete({ _id });
            return expert;
            } catch (err) {
              throw new Error({ message: expertErrorMessages.noExpertError });
            }
          }
          }
     }