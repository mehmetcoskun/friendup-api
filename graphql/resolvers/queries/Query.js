const Query = {
  user: (parent, args, { User }) => {
    const user = User.findOne({ where: { id: args.id } })

    if (!user) throw new Error('Kullanıcı bulunamadı')

    return user
  },
}

module.exports = Query
