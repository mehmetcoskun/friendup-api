module.exports = {
  login: async (parent, { data }, { User }) => {
    const existingUser = await User.findOne({ where: { uid: data.uid } })

    if (existingUser) return existingUser

    await User.create(data)

    const user = await User.findOne({ where: { uid: data.uid } })

    return user
  },
  updateUser: async (parent, { data }, { User }) => {
    const user = await User.findOne({ where: { id: data.id } })

    if (!user) throw new Error('Kullanıcı bulunamadı')

    await user.update(data)

    return user
  },
  deleteUser: async (parent, { id }, { User }) => {
    const user = await User.findOne({ where: { id } })

    if (!user) throw new Error('Kullanıcı bulunamadı')

    return !!(await user.destroy())
  },
}
