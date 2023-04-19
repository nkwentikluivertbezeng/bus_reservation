const {PrismaClient}= require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()
const express= require('express')
const cors=require('cors')
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.listen(port, () =>
  console.log(`Listening on port ${port}`)
)




//creating routes for schedule
app.post(`/schedules`, async (req, res) => {
  
  const { bus_id, location, destination, departure_date, departure_time, bus_fare } = req.body
  const Schedule = await prisma.schedule.create({
    data: {
      bus_id,
      location,
      destination,
      departure_date,
      departure_time,
      bus_fare
    },
  })
  res.json(Schedule)
})
app.delete(`/schedules/:id`, async (req, res) => {
  const schedule = await prisma.schedule.delete({
    where: {
      schedule_id: Math.floor(parseInt(req.params.id))
    },
  })
  res.json(schedule)
})
app.get('/schedules/:id',async (req, res) => {
  const schedule = await prisma.schedule.findUnique({
    where: {
      schedule_id: Math.floor(parseInt(req.params.id))
    }
  })
  res.json(schedule)
})
app.get(`/schedules`, async (req, res) => {
  const date = new Date(req.query.departure_date);
  date.setHours(0,0,0,0)
  const schedule = await prisma.schedule.findMany({
    where:{
      location:req.query.starting_point,
      destination:req.query.destination,
    //  departure_date:date
    }
  })
  res.json(schedule)
})
app.post('/admin/add_schedule',async (req,res)=>{
  const schedules= await prisma.schedule.create({
    data:{
      bus_id:Math.floor(parseInt(req.body.bus_id)),
      location: req.body.location,
      destination: req.body.destination,
      bus_fare: Math.floor(parseInt(req.body.bus_fare)),
      departure_date:new Date(req.body.departure_date),
      departure_time:new Date(req.body.departure_time)
    }
  })
  res.json(schedules)
})
app.get('/admin/allschedules',async (req,res)=>{
  const schedules =await prisma.schedule.findMany()
  res.json(schedules)
})
app.get(`/admin/schedules/:id`, async (req, res) => {
  const schedule = await prisma.schedule.findMany({
    where:{
      bus_id:Math.floor(parseInt(req.params.id))
    }
  })
  res.json(schedule)
})
app.get('/admin/schedule/count',async (req,res)=>{
  const count =await prisma.schedule.count();
  res.json(count)
})




//creating routes for the user
app.delete(`/users/:id`, async (req, res) => {
  const id=parseInt(req.params.id)
  const user = await prisma.user.delete({
    where: {
     user_id: parseInt(id)
    },
  })
  res.json(user)
})
app.post('/users', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  });
  if (user) {
    res.json(null);
  } else {
    var hashedPassword=''
    if(req.body.password){
   hashedPassword = await bcrypt.hash(req.body.password, 10);
    }
    const newUser = await prisma.user.create({
      data: {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone_number: Math.floor(parseInt(req.body.phone_number)),
        password: hashedPassword
      }
    });
    res.json(newUser);
  }
});

app.get('/users/:id',async (req, res) => {
  const id=parseInt(req.params.id)
  const user = await prisma.user.findUnique({
    where: {
      user_id: Math.floor(id)
    }
  })
  res.json(user)
})
app.get(`/users`, async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})
app.get(`/authenticate`, async (req, res) => {
  var ispasswordvalid=false
  const email=String(req.query.email)
  const password=String(req.query.password)
  const user = await prisma.user.findUnique({
    where:{
    email:email
    }
  })
  
  if(user){
    ispasswordvalid= bcrypt.compare(password, user.password)
  }
  if(ispasswordvalid){
    res.json(user)
  }
  else{
    res.json(false)}
})
app.get('/admin/user',async (req,res)=>{
  const users = await prisma.user.findUnique({
    where:{
      user_id:Math.floor(parseInt(req.body.user_id))
    }
  })
  res.json(users)
})









//creating routes for buses
app.post('/buses',async (req, res) => {
  const seats=parseInt(req.body.seats)
  const buses = await prisma.buses.create({
 data:{
  bus_number: req.body.bus_number,
  seats:30
 }
  })
  res.json(buses)
})

app.delete(`/buses/:id`, async (req, res) => {
  const id=parseInt(req.params.id)
  const buses = await prisma.buses.delete({
    where: {
      bus_id: parseInt(id)
    },
  })
  res.json(buses)
})


app.get(`/buses/:id`, async (req, res) => {
  const id=parseInt(req.params.id)
  const buses = await prisma.buses.findUnique({
    where: {
     bus_id: parseInt(id)
    },
  })
  res.json(buses)
})
app.get(`/buses`, async (req, res) => {
  const buses = await prisma.buses.findMany()
  res.json(buses)
})









  // creating routes for bookings
  app.get('/admin/bookings/count/:id',async (req,res)=>{
    const count =await prisma.booking.count({
      where:{
        schedule_id:Math.floor(parseInt(req.params.id))
      }
    });
    res.json(count)
  })
app.get('/admin/bookings/:id', async (req, res)=>{
  const bookings= await prisma.booking.findMany({
    where:{
      schedule_id:Math.floor(parseInt(req.params.id))
    }
    
  })
  res.json(bookings)
})
app.post(`/bookings`, async (req, res) => {
  const newbooking = await prisma.booking.create({
    data: {
  schedule_id:parseInt(req.body.schedule_id),
  user_id:parseInt(req.body.user_id),
  booking_date: new Date(),
  seat_number:parseInt(req.body.seat_number)
    },
  })
  res.json(newbooking)
})
app.delete(`/bookings/:id`, async (req, res) => {
  const id=parseInt(req.params.id)
  const bookings = await prisma.booking.delete({
    where: {
      booking_id: Math.floor(id)
    },
  })
  res.json(bookings)
})
app.get(`/bookings/:id`, async (req, res) => {
  const id=parseInt(req.params.id)
  const booking = await prisma.booking.findUnique({
    where: {
      booking_id: parseInt(id)
    },
  })
  res.json(booking)
})
app.get(`/bookings`, async (req, res) => {
  const bookings = await prisma.booking.findMany()
  res.json(bookings)
})

app.get('/reservation/booking',async(req,res)=>{
  const bookings=await prisma.booking.findMany(
    {
      where:{
        user_id:Math.floor(parseInt(req.query.user_id))
      }
    }
  )
  res.json(bookings)
})





// routes for the ticket
app.get('/tickets/:id',async (req , res)=>{
  const ticket= await prisma.ticket.findMany({
    where:{
      booking_id:Math.floor(parseInt(req.params.id))
    }
  })
  res.json(ticket)
})
app.post('/tickets',async (req,res)=>{
  const tickets=await prisma.ticket.create({
    booking_id:Math.floor(parseInt(req.params.booking_id)),
    ticket_number:req.body.ticket_number
  })
  res.json(tickets)
})

app.get('/booking/seats',async (req,res)=>{
  const seats=await prisma.seat.findFirst({
    where:{
      bus_id:Math.floor(parseInt(req.query.bus_id)),
      seat_number:Math.floor(parseInt(req.query.seat_number))
    }
  })
 if(seats){
  res.json(seats)
 }
 else{
  console.log("todo")
 }
})
app.post('/seats',async (req,res)=>{
  const seats= await prisma.seat.create({
  data:{
    bus_id:parseInt(req.body.bus_id),
    seat_number:parseInt(req.body.seat_number),
    is_reserved:Boolean(req.body.is_reserved)
  }
  })
  res.json(seats)
})
app.put('/seats',async (req,res)=>{
  console.log('THIS is the put seat id ' + parseInt(req.body.seat_id))
  const seats= await prisma.seat.update({
    where:{
      seat_id:Math.floor(parseInt(req.body.seat_id)),
    },
    data:{
      is_reserved:true
    }
  })
  res.json(seats)
})
app.get('/seats/:id',async (req,res)=>{
  const seats=await prisma.seat.findMany({
    where:{
      bus_id:Math.floor(parseInt(req.params.id))
    }
  })
 if(seats){
  res.json(seats)
 }
 else{
  console.log("todo")
 }
})