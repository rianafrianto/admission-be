require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const userRoutes = require('./routes/users')
const areaRoutes = require('./routes/areas')
const schoolsRoutes =  require('./routes/schools')
const subjectRoutes = require('./routes/subject')
const uploadRoutes = require('./routes/upload')
const autoRoutes = require('./routes/auto')
const meetingRoutes = require('./routes/meeting')
const paymentRoutes = require('./routes/payment')
const mailRoutes = require('./routes/mail')
const bookingConsultation = require('./routes/booking_consultation');
const tuitionRoutes = require('./routes/tuition')
const settingsRoutes = require('./routes/settings')

app.use(cors());
app.use(express.json());
app.use('/test',(req,res) => {
    res.status(200).json({
        status: "success",
        data:"Api is healthy",
     });
})
// app.use(bodyParser.json());
app.use('/api/v1/users',userRoutes )
app.use('/api/v1/areas',areaRoutes )
app.use('/api/v1/schools', schoolsRoutes )
app.use('/api/v1/subject', subjectRoutes)
app.use('/api/v1/upload', uploadRoutes)
app.use('/api/v1/auto', autoRoutes)
app.use('/api/v1/meeting', meetingRoutes)
app.use('/api/v1/payment', paymentRoutes)
app.use('/api/v1/mail', mailRoutes)
app.use('/api/v1/booking-consultation', bookingConsultation)
app.use('/api/v1/tuition', tuitionRoutes)
app.use('/api/v1/settings', settingsRoutes)


app.listen(5770, ()=> {
    console.log("Srver is Running in port 5770");
})