const { Configuration, OpenAIApi } = require('openai');
const { generatePrompt } = require('../utils/chatgpt');
const { signToken } = require('../utils/auth');
const configuration = new Configuration({
  organization: 'org-sMYqIiwDshw3aO1opcm1AbvS',
  apiKey: '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',
});
const { AuthenticationError } = require('apollo-server-express');
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
        console.log('fetching expert', _id);
        return await Expert.findOne({ _id }).populate('user');
      } catch (err) {
        throw new Error(err.message);
      }
    },

    prompt: async (
      parent,
      { input, friendType, temperament, age, language, name }
    ) => {
      try {
        console.log(
          'userInput',
          input,
          friendType,
          temperament,
          age,
          language,
          name
        );
        const completion = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: generatePrompt(
                friendType,
                temperament,
                language,
                age,
                name
              ),
            },
            ...input,
          ],
          temperature: 0.6,
          max_tokens: 250,
        });
        console.log(completion);
        return completion.data.choices[0].message.content;
      } catch (error) {
        // Consider implementing your own error handling logic here
        console.error(error);
      }
    },

    expertPrompt: async (
      parent,
      { input, friendType, expertise, language }
    ) => {
      try {
        console.log('userInput', input, friendType, expertise, language);
        const completion = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: generatePrompt(friendType, expertise, language),
            },
            ...input,
          ],
          temperature: 0.6,
          max_tokens: 250,
        });
        console.log(completion.data.choices[0].message.content);
        return completion.data.choices[0].message.content;
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

    updateUserPassword: async (parent, { _id, oldPassword, newPassword }) => {
      try {
        console.log(_id, oldPassword, newPassword);
        const user = await User.findOne({ _id });

        if (!user) {
          throw new AuthenticationError('No user with this id found!');
        }

        const correctPw = await user.isCorrectPassword(oldPassword);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }

        const updatedUser = await User.findOneAndUpdate(
          { _id: _id },
          { $set: { password: newPassword } },
          { runValidators: true, new: true }
        );
        return updatedUser;
      } catch (err) {
        throw new Error(err, userErrorMessages.validationError);
      }
    },

    addUser: async (parent, args) => {
      try {
        const { error, value } = userSchema.validate(args);
        if (error) {
          throw new Error(userErrorMessages.validationError);
        }
        const user = await User.create(value);
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
        // const { error, value } = userSchema.validate(args);
        // if (error) {
        //   throw new Error(userErrorMessages.validationError);
        // }
        const updatedUser = await User.findOneAndUpdate(
          { _id: args._id },
          { $set: { ...args } },
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
        console.log(args);

        // Find user by id
        const user = await User.findById(args.user);
        if (!user) {
          throw new Error('User not found');
        }

        // Create a new friend
        const friend = await Friend.create(args);

        // Add the friend to the user's friend list
        user.friends.push(friend);
        await user.save();
        return friend;
      } catch (err) {
        throw new Error(friendErrorMessages.validationError);
      }
    },

    updateFriend: async (parent, args) => {
      try {
        console.log(args);
        const updatedFriend = await Friend.findOneAndUpdate(
          { _id: args._id },
          { $set: { ...args } },
          { runValidators: true, new: true }
        );
        return updatedFriend;
      } catch (err) {
        throw new Error(err, friendErrorMessages.validationError);
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
        // Find user by id
        const user = await User.findById(args.user);
        if (!user) {
          throw new Error('User not found');
        }

        // Create a new friend
        const expert = await Expert.create(args);

        // Add the friend to the user's friend list

        user.experts.push(expert);
        await user.save();
        return expert;
      } catch (err) {
        throw new Error(expertErrorMessages.validationError);
      }
    },

    updateExpert: async (parent, args) => {
      try {
        console.log(args);
        const updatedExpert = await Expert.findOneAndUpdate(
          { _id: args._id },
          { $set: args },
          { runValidators: true, new: true }
        );
        return updatedExpert;
      } catch (err) {
        throw new Error(err, expertErrorMessages.validationError);
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
