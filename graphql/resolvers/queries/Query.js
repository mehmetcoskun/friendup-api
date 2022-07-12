const Query = {
  user: (parent, args, { User }) => {
    const user = User.findOne({ where: { uid: args.uid } })

    if (!user) throw new Error('Kullanıcı bulunamadı')

    return user
  },
}

module.exports = Query
