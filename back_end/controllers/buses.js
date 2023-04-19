const {PrismaClient}= require ('@prisma/client')
const prisma=new PrismaClient()
const getbuses= async (req, res)=>{
	const Buses= await prisma.buses.findMany();
	res.json(Buses)
}
