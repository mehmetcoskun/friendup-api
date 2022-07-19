module.exports = {
  register: async (parent, { data }, { User }) => {
    const existingUser = await User.findOne({ where: { uid: data.uid } });

    if (existingUser !== null) throw new Error({ code: 'user_exists', message: 'Kullanıcı zaten mevcut.' });

    await User.create(data);

    const user = await User.findOne({ where: { uid: data.uid } });

    return user;
  },
  updateUser: async (parent, { data }, { User }) => {
    const user = await User.findOne({ where: { id: data.id } });

    if (user === null) throw new Error({ code: 'user_not_found', message: 'Kullanıcı bulunamadı.' });

    await user.update(data);

    return user;
  },
  deleteUser: async (parent, { id }, { User }) => {
    const user = await User.findOne({ where: { id } });

    if (user === null) throw new Error({ code: 'user_not_found', message: 'Kullanıcı bulunamadı.' });

    return !!(await user.destroy());
  },
};
