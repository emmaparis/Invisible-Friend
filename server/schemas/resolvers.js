const { Configuration, OpenAIApi } = require('openai');
const { generatePrompt } = require('../utils/chatgpt');
const { signToken } = require('../utils/auth');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const { User, Friend, Expert } = require('../models');
const {
  userErrorMessages,
  userSchema,
  friendSchema,
  friendErrorMessages,
  expertSchema,
  expertErrorMessages,
} = require('../utils/validators.js');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError('You need to be logged in!');
        }
        return await User.findOne({ _id: context.user._id })
          .populate('friends')
          .populate('experts');
      } catch (err) {
        throw new Error(err.message);
      }
    },

    users: async () => {
      try {
        return await User.find().populate('friends').populate('experts');
      } catch (err) {
        throw new Error(err.message);
      }
    },

    user: async (parent, { _id }) => {
      try {
        return await User.findOne({ _id })
          .populate('friends')
          .populate('experts');
      } catch (err) {
        throw new Error(err.message);
      }
    },

    friends: async () => {
      try {
        return await Friend.find().populate('user');
      } catch (err) {
        throw new Error(err.message);
      }
    },

    friend: async (parent, { _id }) => {
      try {
        return await Friend.findOne({ _id }).populate('user');
      } catch (err) {
        throw new Error(err.message);
      }
    },

    experts: async () => {
      try {
        return await Expert.find().populate('user');
      } catch (err) {
        throw new Error(err.message);
      }
    },

    expert: async (parent, { _id }) => {
      try {
        return await Expert.findOne({ _id }).populate('user');
      } catch (err) {
        throw new Error(err.message);
      }
    },

    prompt: async (parent, { input }) => {
      try {
        console.log('userInput', input);
        const completion = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: generatePrompt(input),
          temperature: 0.6,
        });

        return completion.data.choices[0].text;
      } catch (error) {
        // Consider implementing your own error handling logic here
        console.error(error);
      }
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token };
    },

    addUser: async (parent, args) => {
      try {
        console.log(args);
        const { error, value } = userSchema.validate(args);
        if (error) {
          throw new Error(userErrorMessages.validationError);
        }
        const user = await User.create(args);
        console.log('user', user);
        const token = signToken(user);

        return {
          message: 'User created successfully',
          token,
        };
      } catch (err) {
        throw new Error(`${userErrorMessages.validationError}, ${err}`);
      }
    },

    updateUser: async (parent, args) => {
      try {
        const { error, value } = userSchema.validate(args);
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
        throw new Error(userErrorMessages.noUserError);
      }
    },

    addFriend: async (parent, args) => {
      try {
        const { error, value } = friendSchema.validate(args);
        if (error) {
          throw new Error(friendErrorMessages.validationError);
        }
        const friend = await Friend.create(value);
        return friend;
      } catch (err) {
        throw new Error(friendErrorMessages.validationError);
      }
    },

    updateFriend: async (
      parent,
      { _id, name, language, age, mood, user, history }
    ) => {
      try {
        const { error, value } = friendSchema.validate({
          name,
          language,
          age,
          mood,
          user,
          history,
        });
        if (error) {
          throw new Error(friendErrorMessages.validationError);
        }
        const updatedFriend = await Friend.findOneAndUpdate(
          { _id },
          { $set: { ...value } },
          { runValidators: true, new: true }
        );
        return updatedFriend;
      } catch (err) {
        throw new Error(friendErrorMessages.validationError);
      }
    },

    updateFriendHistory: async (parent, { _id, message }) => {
      try {
        // Find the friend by its _id
        const friend = await Friend.findById(_id);
        if (!friend) {
          throw new Error('Friend not found.');
        }

        // Add the message to the history
        friend.history.push(message);

        // If the history array size is over 11, remove elements in positions 1 and 2
        if (friend.history.length > 11) {
          friend.history.splice(1, 2);
        }

        // Save the updated friend and return it
        const updatedFriend = await friend.save();
        return updatedFriend;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    updateExpertHistory: async (parent, { _id, message }) => {
      try {
        // Find the expert by its _id
        const expert = await Expert.findById(_id);
        if (!expert) {
          throw new Error('Expert not found.');
        }

        // Add the message to the history
        expert.history.push(message);

        // If the history array size is over 11, remove elements in positions 1 and 2
        if (expert.history.length > 11) {
          expert.history.splice(1, 2);
        }

        // Save the updated expert and return it
        const updatedExpert = await expert.save();
        return updatedExpert;
      } catch (err) {
        throw new Error(err.message);
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
        const { error, value } = expertSchema.validate(args);
        if (error) {
          throw new Error(expertErrorMessages.validationError);
        }
        const expert = await Expert.create(value);
        return expert;
      } catch (err) {
        throw new Error(expertErrorMessages.validationError);
      }
    },

    updateExpert: async (
      parent,
      { _id, name, language, expertise, user, history }
    ) => {
      try {
        const { error, value } = expertSchema.validate({
          name,
          language,
          expertise,
          user,
          history,
        });
        if (error) {
          throw new Error(expertErrorMessages.validationError);
        }
        const updatedExpert = await Expert.findOneAndUpdate(
          { _id },
          { $set: { ...value } },
          { runValidators: true, new: true }
        );
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
    },
  },
};

module.exports = resolvers;
