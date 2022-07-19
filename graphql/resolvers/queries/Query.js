const Query = {
  getUser: async (parent, args, { User }) => {
    if (args.id) {
      return await User.findByPk(args.id);
    } else {
      return await User.findOne({ where: { uid: args.uid } });
    }
  },
};

module.exports = Query;
