const {PrismaClient}=require('@prisma/client')
const prisma = new PrismaClient()
const adduser = async (req, res) => {
    const { lname, fname, password } = req.body
    const User = await prisma.user.create({
      data: {
        lname,
        fname,
        password
      },
    })
    // res.json(User)
  }
  module.export = adduser;