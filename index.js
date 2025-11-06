require("dotenv").config();
const express = require('express');
const sequelize = require('./src/lib/db');
const auth = require('./src/lib/auth');
const path = require('path');
const responseModel = require('./src/lib/response');
const http = require('http');

const loginRouter = require('./src/routes/login_router');
const userRouter = require('./src/routes/user_router');
const attendanceRouter = require('./src/routes/attendance_router');
const toolsRouter = require('./src/routes/tools_router');
const outletRouter = require('./src/routes/outlet_router');

const app = express();
const PORT = process.env.PORT || 3000;

const storageDir = path.join(__dirname, 'uploads');
app.use('/storage', express.static(storageDir, {
  index: false,           // jangan tampilkan listing directory
  dotfiles: 'ignore',     // abaikan file dot (.+)
  maxAge: '1d'            // cache client 1 hari
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(loginRouter);
app.use('/tools',toolsRouter);

app.use('/user',auth, userRouter);
app.use('/jwt-check', auth, (req, res) => {
  console.log('Token is valid for user:', req.user);
  responseModel.success(res, 'Token is valid');
})
app.use('/attendance',auth, attendanceRouter);
app.use('/outlet', outletRouter);
app.get('/nav-state', (req, res) => {
  const targetUrl = 'http://127.0.0.1:1922/check-db';
  http.get(targetUrl, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      console.log('Response from target URL:', data);
      const navResponse = JSON.parse(data);
      if(navResponse.state === true){
        responseModel.success(res, 'success');
      }else{
        responseModel.error(res, 'nav off');
      }
    });
  }).on('error', (err) => {
    responseModel.error(res, 'Error: ' + err.message, 500);
  });
});

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Endpoint not found' });
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});