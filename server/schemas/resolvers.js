const resolvers = {
  Query: {
    users: async () => {
      return [
        {
          _id: 'asdioufo9a8rtjaod8iosmf',
          username: 'Mork',
          email: 'mork@nanoo.org',
          password: 'youllneverguess',
        },
      ];
    },
  },
};

module.exports = resolvers;
